/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [vue(), vueJsx(),dts({ rollupTypes: true })],
  css: {preprocessorOptions: {less: { additionalData: `@import "@/plugins/vue3-router-tab/style/global.less";` },},},
  resolve: { alias: { "@":"./src","@routerTab":"/src/plugins/vue3-router-tab" } },
  test: {environment: "happy-dom",},
  define:{__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'},
  build:{
    emptyOutDir: false, // 避免dist被清空
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: "vue3-router-tab",
      formats: ['es'],
      fileName:()=> `index.js`,
    },
    rollupOptions: {external: ["vue","vue-router","vitest"]},
  }
});
