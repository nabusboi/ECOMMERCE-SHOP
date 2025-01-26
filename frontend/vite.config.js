import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://ecommerce-shop-1-palu.onrender.com",
      "/uploads/": "https://ecommerce-shop-1-palu.onrender.com",
    },
  },
});
