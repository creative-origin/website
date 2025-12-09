import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Use the repo portion of GITHUB_REPOSITORY when building on CI
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "website";

export default defineConfig({
  plugins: [react()],
  base: repoName ? `/${repoName}/` : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
