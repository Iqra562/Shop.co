// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// import { defineConfig } from "vite";
// import react 
// from "@vitejs/plugin-react";

// export default defineConfig({
//  plugins: [react()],
//  base: "./", 
//  build: {
//  outDir: "dist",
//  },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
  plugins: [react()],
   base: "./", 
 build: {
 outDir: "dist",
 },
   resolve: {
    alias: { 
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils":path.resolve(__dirname,"./src/utils"),
      "@context":path.resolve(__dirname,"./src/context"),
      "@hooks":path.resolve(__dirname,"./src/hooks"),
    },
  },
});


