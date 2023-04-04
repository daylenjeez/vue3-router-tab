import { createApp, Plugin, App } from "vue";
import Vue3RouterTab from "./router-tab";
import { RouteLocationNormalized, Router, useRouter } from "vue-router";
import { store } from "./store";
import { INITIAL_META } from "./constants";
import { TabKey, TabMeta } from "./types";
import { isFunction } from "./utils";

interface Options {
  router: Router;
}

const getTabId = (tabKey: TabKey, router: RouteLocationNormalized) => {
  if (isFunction(tabKey)) return tabKey(router);
  return router[tabKey];
};

const routerMetaToTab = (router: RouteLocationNormalized) => {
  const meta = Object.assign(INITIAL_META, router.meta);
  const tab={
    name: meta.tabName ?? router.name,
    id: getTabId(meta.tabKey, router),
  }};

const interceptRoute = (guard: RouteLocationNormalized) => {
  const tab = routerMetaToTab(guard);
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
    app.component("RouterTab", Vue3RouterTab);
  },
};

export default RouterTab;
