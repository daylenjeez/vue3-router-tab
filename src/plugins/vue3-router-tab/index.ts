import { Plugin, App, markRaw } from "vue";
import Vue3RouterTab from "./router-tab";
import { createPinia } from "pinia";
import { RouteLocationNormalized, Router } from "vue-router";
import { useRouterTabStore } from "./store";
import { INITIAL_TAB_CONFIG } from "./constants";
import { TabConfig, TabKey } from "./types";
import { throwError, isFunction, isString } from "./utils";

interface Options {
  router: Router;
}

/**
 * get tab id
 * @param {TabKey} tabKey
 * @param {RouteLocationNormalized} router
 * @returns {string}
 */
const getTabId = (tabKey: TabKey, router: RouteLocationNormalized) => {
  const tabId = isFunction(tabKey) ? tabKey(router) : router[tabKey];

  if (!isString(tabId) || tabId === "") {
    throwError(
      "tabKey is not 'path','fullPath' or a function, or the return value of the function is not empty."
    );
  }
  return tabId;
};

/**
 * router meta to tab
 * @param {RouteLocationNormalized} router
 * @returns {Tab}
 */
const getTabConfigInRouterMeta = (router: RouteLocationNormalized) => {
  const { meta } = router;
  const { key, name, keepAlive } =
    (meta.tabConfig as TabConfig) || INITIAL_TAB_CONFIG;
  const tab = {
    name: name ?? router.name ?? router.path,
    id: getTabId(key ?? INITIAL_TAB_CONFIG.key, router),
    keepAlive: keepAlive ?? INITIAL_TAB_CONFIG.keepAlive,
  };
  return tab;
};

/**
 * intercept route to add tab
 * @param {RouteLocationNormalized} guard
 */
const interceptRoute = (guard: RouteLocationNormalized) => {
  const tab = getTabConfigInRouterMeta(guard);
  const store = useRouterTabStore();
  const hasTab = store.hasTab(tab.id);
  if (!hasTab) {
    store.addTab(tab);
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

const RouterTab: Plugin = {
  install(app: App, options: Options) {
    init(app, options);
    app.component("RouterTab", Vue3RouterTab);
  },
};

export default RouterTab;
