import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/sierraLib/",

  root: "./", // your index.html is in the project root
  build: {
    outDir: "../dist", // folder for production build
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
