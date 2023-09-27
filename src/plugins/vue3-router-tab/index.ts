import "@total-typescript/ts-reset";
import { Plugin, App, markRaw } from "vue";
import { RouteLocationNormalized, Router } from "vue-router";
import { createPinia } from "pinia";

import RouterTab from "./router-tab";
import { RouterTabStore, useRouterTabStore } from "./store";
import { pick } from "./utils";

/**
 * Add configuration during initialization
 * @property {Router} router
 */
interface Options {
  router: Router;
}

/**
 * * Handler executed before each route change in the router's `beforeEach` hook
 * @param {RouteLocationNormalized} guard
 * @param {RouterTabStore} store
 */
const handleBeforeEachRoute = (
  guard: RouteLocationNormalized,
  store: RouterTabStore
) => {
  const tabId = store._getTabIdByRouteMeta(guard);

  if (tabId && store._hasTab(tabId)) {
    store._setActiveTab(tabId);
  } else {
    const tab = store._createTab(guard);
    if (tab) store._addTab(tab,{setActive:true});
  }
};

/**
 * Init
 * @param {App} app
 * @param {Options} options
 */
const init = (app: App, options: Options) => {
  const { router } = options;
  piniaInit(app, router);
  routerInit(router);
};

/**
 * Create RouterTab Hook
 * @param store {RouterTabStore}
 * @returns Pick<store,tabs|activeTabId|open|close|closeOthers|getTabs>
 */
const createRouterTabHook = (store: RouterTabStore) => {
  return () => pick(store, "tabs", "activeTabId", "open", "close", "closeOthers", "getTabs","getActiveTabId");
};

let useRouterTab: ReturnType<typeof createRouterTabHook>;

/**
 * Router init, add router hook
 * @param {Router} router
 */
const routerInit = (router: Router) => {
  const store = useRouterTabStore();
  router.beforeEach((guard) => handleBeforeEachRoute(guard, store));

  useRouterTab = createRouterTabHook(store);
};

/**
 * Pinia init, add router to pinia
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
