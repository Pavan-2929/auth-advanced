// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://auth-server-jixq.onrender.com", // Use http instead of https
        secure: true, // Add this line to disable SSL verification
      },
    },
  },
  plugins: [react()],
});
