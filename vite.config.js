import { resolve } from "path";
import { defineConfig } from "vite";


export default defineConfig({
  root: "src/", // 👈 tells Vite your main HTML is in /src
  base: "/sierraLib/", // 👈 must match your GitHub repo name
  build: {
    outDir: "../dist", // 👈 build output one level up (in /dist)
    emptyOutDir: true, // clean dist folder before new build
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        exam: resolve(__dirname, "src/apps/exams.html"),
        home: resolve(__dirname, "src/navigation/home.html"),
        about: resolve(__dirname, "src/navigation/about.html"),
        contact: resolve(__dirname, "src/navigation/contact.html")
      },
    },
  },
});
