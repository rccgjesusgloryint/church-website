import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    setupFiles: ["./__tests__/setup.ts"],
    environment: "jsdom",
    globals: true,
    server: {
      deps: {
        inline: ["next"],
      },
    },
  },
});
