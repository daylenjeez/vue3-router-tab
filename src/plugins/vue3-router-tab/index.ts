import "@total-typescript/ts-reset";
import { Plugin, App, markRaw } from "vue";
import RouterTab from "./router-tab";
import { createPinia } from "pinia";
import { RouteLocationNormalized, Router } from "vue-router";
import { RouterTabStore, useRouterTabStore } from "./store";

interface Options {
  router: Router;
}

const _useRouterTab = (store: RouterTabStore) => {
  return () => {
    return {
      tabs: store.tabs,
      open: store.open,
      close: store.close,
      closeOthers: store.closeOthers,
      getTabs: store.getTabs,
    };
  };
};

let useRouterTab: ReturnType<typeof _useRouterTab>;

/**
 * intercept route to add tab
 * @param {RouteLocationNormalized} guard
 * @param {RouterTabStore} store
 */
const interceptRoute = (
  guard: RouteLocationNormalized,
  store: RouterTabStore
) => {
  const tab = store._getTabConfigInRouterMeta(guard);

  if (!store._hasTab(tab.id)) {
    store._addTab(tab);
  } else {
    store._setActiveTab(tab.id);
  }
};

/**
 * init
 * @param {App} app
 * @param {Options} options
 */
const init = (app: App, options: Options) => {
  piniaInit(app, options.router);
  routerInit(options.router);
};

/**
 * router init, add router hook
 * @param {Router} router
 */
const routerInit = (router: Router) => {
  const store = useRouterTabStore();

  router.beforeEach((guard) => {
    console.log("router.beforeEach", guard);
    interceptRoute(guard, store);
  });
};

/**
 * pinia init, add router to pinia
 * @param app
 * @param {Router} router
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
    app.component("RouterTab", RouterTab);
  },
};

export default RouterTabPlugin;
export { RouterTab, useRouterTab };
