// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Use http instead of https
        secure: false, // Add this line to disable SSL verification
      },
    },
  },
  plugins: [react()],
});
