// Load apps
import { appslist } from "../data/apps.js";
import { loadItems, triggerSlideUpAnimation } from "./utils.mjs";

export function loadAppsPage() {
    loadItems(appslist, "#sierralib-apps", "app");

    triggerSlideUpAnimation();
}
loadAppsPage();
