import { Plugin, App, markRaw } from "vue";
import "@total-typescript/ts-reset";
import RouterTab from "./router-tab";
import { createPinia } from "pinia";
import { RouteLocationNormalized, Router } from "vue-router";
import { useRouterTabStore } from "./store";

interface Options {
  router: Router;
}

/**
 * intercept route to add tab
 * @param {RouteLocationNormalized} guard
 */
const interceptRoute = (guard: RouteLocationNormalized) => {
  const store = useRouterTabStore();
  const tab = store.getTabConfigInRouterMeta(guard);
  const hasTab = store.hasTab(tab.id);
  if (!hasTab) {
    store.addTab(tab);
  } else {
    store.setActiveTab(tab.id);
  }
};

/**
 * init
 * @param {App} app
 * @param {Options} options
 */
const init = (app: App, options: Options) => {
  const { router } = options;
  piniaInit(app, router);
  routerInit(router);
};

/**
 * router init, add router hook
 * @param {Router} router
 */
const routerInit = (router: Router) => {
  router.beforeEach((guard) => {
    console.log("router.beforeEach", guard);
    interceptRoute(guard);
  });
};

/**
 * pinia init, add router to pinia
 * @param app
 * @param router
 */
const piniaInit = (app: App, router: Router) => {
  const pinia = createPinia();

  pinia.use(({ store }) => {
    store.$router = markRaw(router);
  });
  app.use(pinia);
};

const RouterTabPlugin: Plugin = {
  install(app: App, options: Options) {
    init(app, options);
    app.component("router-tab", RouterTab);
  },
};

export default RouterTabPlugin;
export { RouterTab };
