import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "143.110.241.146",
    host: "0.0.0.0",
    port: 4173,
  },
});
