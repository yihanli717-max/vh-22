import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.js"],
    globals: true,
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      reporter: ["text", "html", "lcov", "json-summary"],
      all: true,
      include: ["script.js", "products.js", "orders.js", "finances.js", "help.js"],
      exclude: ["tests/**", "coverage/**", "node_modules/**"]
    }
  }
});
