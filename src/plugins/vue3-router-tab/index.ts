import "@total-typescript/ts-reset";
import { Plugin, App, markRaw } from "vue";
import { RouteLocationNormalized, Router } from "vue-router";
import { createPinia } from "pinia";

import RouterTab from "./router-tab";
import { useRouterTab } from "./store";
import { RouterTabStore } from "./store/_routerTab";

/**
 * Add configuration during initialization
 * @property {Router} router
 */
interface Options {
  router: Router;
}

/**
 * Update tab on route change
 * @param {RouteLocationNormalized} guard
 * @param {RouterTabStore} store
 */
export const updateTabOnRouteChange = (
  guard: RouteLocationNormalized,
  store: RouterTabStore
) => {
  const tabId = store._getTabIdByRoute(guard);

  if (tabId && store.hasTab(tabId)) {
    store._setActiveTab(store._getTab(tabId));
  } else {
    const tab = store._createTab(guard);
    if (tab) store._addTab(tab, { setActive: true });
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
