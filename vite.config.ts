import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    allowedHosts: true,
    cors: false,
    port: 3000,
    proxy: {
      "/api": {
        target: "https://www.flickr.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
