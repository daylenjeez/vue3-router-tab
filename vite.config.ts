/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [vue(), vueJsx(), dts({ rollupTypes: true })],
  resolve: { alias: { "@": "./src" }, },
  test: { environment: "happy-dom" },
  define: { __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true" },
  build: {
    emptyOutDir: false, // 避免dist被清空
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "vue3-router-tab",
      formats: ["es"],
    },
    rollupOptions: { external: ["vue", "vue-router", "vitest"] },
  },
});
