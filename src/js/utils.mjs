// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}


// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}


// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


//  Hamburger Menu Setup
export function setupHamburgerMenu() {
  const hamButton = qs("#ham-btn");
  const navBar = qs("#animateme");

  if (hamButton && navBar) {
    hamButton.addEventListener("click", () => {
      hamButton.classList.toggle("show");
      navBar.classList.toggle("show");
    });
  }
}


//  Create getParam function
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}


//  Load Static HTML Template
export async function loadStaticTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load template: ${path}`);
  }
  return await response.text();
}


// Load Dynamic HTML Template
export async function loadDynamicTemplate(path, replacements = {}) {
  try {
    const response = await fetch(path);
  if (!response.ok){
    throw new Error(`Failed to load template: ${path}`);
  }

  let template = await response.text();

  // Replace placeholders like {{type}} with actual values
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{{${key}}}`, "g");
    template = template.replace(regex, value);
  }

  return template;
  } catch (error) {
    console.log(error);

    return "";
  }
}


// Renders Template into DOM

/**
 * @param {string} template The HTML string template.
 * @param {HTMLElement} parentElement The element to render the template into.
 * @param {*} [data] Optional data to pass to the callback.
 * @param {Function} [callback] Optional callback function to run after rendering.
 */

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}


//  Load Header & Footer 
export async function loadHeaderFooter() {
  try {
    // Detect base path automatically
    // Works for both local & GitHub Pages
    const pathParts = window.location.pathname.split("/").filter(Boolean);
   

    // For example:
    //  - localhost: /index.html → base = "./"
    //  - localhost: /apps/exams.html → base = "../"
    //  - github.io/yourrepo/apps/exams.html → base = "../"
    const basePath =
      pathParts.length > 1 ? "../" : "./";

    
    // Fetch templates dynamically
    const headerTemplate = await loadStaticTemplate(`${basePath}partials/header.html`);
    const footerTemplate = await loadStaticTemplate(`${basePath}partials/footer.html`);

    // Get the DOM elements
    const headerElement = qs("#main-header");
    const footerElement = qs("#main-footer");

    // Render header and footer templates
    if (headerElement && footerElement) {
      renderWithTemplate(headerTemplate, headerElement);
      renderWithTemplate(footerTemplate, footerElement);
    }

    // Reload Menu's function
    setupHamburgerMenu();

  } catch (err) {
    console.error("Error loading header/footer:", err);
  }
}


// Generic Loader For Displaying
// List of Items 

/**
 * @param {Array} dataList - Array of objects containing the data
 * @param {string} containerSelector - The selector where items should be displayed
 * @param {string} type - Optional label for context ("app", "subject") — controls button link
 */

// Create the loadItems function
export async function loadItems(dataList, containerSelector, type = "app") {
  try {
    // Detect base path automatically
    // Works for both local & GitHub Pages
    const pathParts = window.location.pathname.split("/").filter(Boolean);
   

    // For example:
    //  - localhost: /index.html → base = "./"
    //  - localhost: /apps/exams.html → base = "../"
    //  - github.io/yourrepo/apps/exams.html → base = "../"
    const basePath =
      pathParts.length > 1 ? "../" : "./";


    // Find the container to render the cards
    const container = qs(containerSelector);

    // Fetch templates dynamically
    const templateHTML = await loadDynamicTemplate(`${basePath}partials/itemtemplate.html`, {type});

    if (container) {
      renderWithTemplate(templateHTML, container)
    }
    else {
        console.error(`Container ${containerSelector} not found.`);
      }
    
    // Get modal and content elements
    const dialog = qs(`#${type}-dialog`);
    const title = qs(`#${type}-title`);
    const description = qs(`#${type}-description`);
    const openLink = qs(`#${type}-link`);
    const closeBtn = qs(`#close-${type}-btn`);
    const cardsContainer = qs(`#show-${type}-cards`);

    // Close dialog
    closeBtn.addEventListener("click", () => dialog.close());

    // Generate cards dynamically
    dataList.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add(`${type}-card`);
        card.style.backgroundColor = item.cardColor;

        // Builds card's content
        const img = document.createElement("img");
        img.src = item.appImage || item.subjectImage || item.subjectImage;
        img.alt = `${item.appName || item.subjectName || item.subjectTitle} logo`;
        img.classList.add(`${type}-image`);

        const cardTitle = document.createElement("h2");
        cardTitle.textContent = item.appName || item.subjectName || item.subjectTitle;

        // Store extra data in dataset
        card.dataset.title = item.appName || item.subjectName || item.subjectTitle;
        card.dataset.description = item.appDescription || item.subjectDescription;
        card.dataset.link = item.streamLink || item.subjectLink;


        // Card click opens modal
        card.addEventListener("click", () => {
            title.textContent = card.dataset.title;
            description.textContent = card.dataset.description;
            openLink.href = card.dataset.link;
            dialog.showModal();
        });

        // Append to grid
        card.append(cardTitle, img);
        cardsContainer.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading header/footer:", err);
  } 
}


// Function to trigger slideUp animation
export function triggerSlideUpAnimation() {
  // Remove the animation class if it already exists
  document.body.classList.remove("animate-app");

  // Force browser to recalc layout so the removal takes effect
  void document.body.offsetWidth;

  // Add the class back to trigger the animation
  document.body.classList.add("animate-app");
}
