import { createApp, Plugin, App } from "vue";
import Vue3RouterTab from "./router-tab";
import { RouteLocationNormalized, Router, useRouter } from "vue-router";
import { store } from "./store";

interface Options {
  router: Router;
}

const interceptRoute = (guard: RouteLocationNormalized) => {
  console.log(guard);
};

const init = (app: App, options: Options) => {
  const { router } = options;
  routerInit(router);
};

const routerInit = (router: Router) => {
  store.router = router;

  router.beforeEach((guard) => {
    interceptRoute(guard);
  });
};

const RouterTab: Plugin = {
  install(app: App, options: Options) {
    init(app, options);
    app.component("router-tab", Vue3RouterTab);
  },
};

export default RouterTab;
