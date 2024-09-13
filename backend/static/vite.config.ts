import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// forward requests to port 5000
export default defineConfig({
  plugins: [react()],
});
