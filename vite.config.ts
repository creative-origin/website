import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// IMPORTANT:
// Replace this with your actual GitHub repo name
// Example: "creative-origin-site"
const repoName = "creative-origin/website";

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
