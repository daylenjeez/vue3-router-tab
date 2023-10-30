/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [vue(), vueJsx(),dts({ rollupTypes: true })],
  css: {preprocessorOptions: {less: { additionalData: `@import "@/plugins/vue3-router-tab/style/global.less";` },},},
  resolve: { alias: { "@":"./src","@routerTab":"/src/plugins/vue3-router-tab" } },
  test: {environment: "happy-dom",},
  build:{
    emptyOutDir: false, // 避免dist被清空
    lib: {
      entry: "./src/index.ts",
      name: "vue3-router-tab",
      formats: ['es'],
    },
    rollupOptions: {
      external: ["vue","vitest"],
      output: {globals: {vue: "Vue",},},
    },
  }
});
