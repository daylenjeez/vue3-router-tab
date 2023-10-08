/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {preprocessorOptions: {less: { additionalData: `@import "@/plugins/vue3-router-tab/style/global.less";` },},},
  resolve: { alias: { "@":"./src" } },
  test: {environment: "happy-dom",},
});
