import { createApp, Plugin } from "vue";
import Vue3RouterTab from "./router-tab";

const RouterTab: Plugin = {
  install(app, options) {
    app.component("router-tab", Vue3RouterTab);
  },
};

export default RouterTab;
