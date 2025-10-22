import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src", // 👈 tells Vite your main HTML is in /src
  base: "/sierraLib/", // 👈 must match your GitHub repo name
  build: {
    outDir: "../dist", // 👈 build output one level up (in /dist)
    emptyOutDir: true, // clean dist folder before new build
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
    },
  },
});
