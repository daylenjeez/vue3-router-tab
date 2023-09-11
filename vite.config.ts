/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    preprocessorOptions: {
      less: { additionalData: `@import "@/style/global.less";` },
    },
  },
  resolve: { alias: { "@": "./src/plugins/vue3-router-tab" } },
  test: {
    environment: "happy-dom",
  },
});
