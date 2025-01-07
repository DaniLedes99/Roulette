import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Asegúrate de que los archivos se generen en la carpeta 'dist'
  },
  base: "/",
});
