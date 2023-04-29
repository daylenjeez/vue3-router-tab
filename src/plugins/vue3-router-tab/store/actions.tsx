import {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from "vue-router";
import { INITIAL_TAB_CONFIG } from "../constants";
import { Tab, TabConfig, TabId, TabKey } from "../types";
import { isFunction, isString, throwError } from "../utils";
import { State } from "./state";
import { CreateActions } from "./type";

interface CreateTabId {
  (tabKey: TabKey | undefined | null, router: RouteLocationNormalized): TabId;
}
interface GetTabConfigInRouterMeta {
  (router: RouteLocationNormalized): Tab;
}
interface HasTab {
  (tabId: TabId): boolean;
}
interface IndexOfTab {
  (tabId: TabId): number;
}
interface GetTab {
  (tabId: TabId): Tab | undefined;
}
interface GetTabIdByRoute {
  (router: RouteLocationNormalized): TabId;
}
interface AddTab {
  (tab: Tab, options?: { setActive?: boolean }): number;
}
interface RemoveTab {
  (tabId: TabId): Tab;
}
interface OpenTab {
  (tabId: TabId): void;
}

interface SetActiveTab {
  (tabId: TabId): number;
}

interface Push {
  (path: string): void;
}

export type Actions = CreateActions<
  string,
  State,
  {
    createTabId: CreateTabId;
    getTabConfigInRouterMeta: GetTabConfigInRouterMeta;
    hasTab: HasTab;
    indexOfTab: IndexOfTab;
    getTab: GetTab;
    getTabIdByRoute: GetTabIdByRoute;
    addTab: AddTab;
    removeTab: RemoveTab;
    setActiveTab: SetActiveTab;
    openTab: OpenTab;
    push: Push;
  }
>;

export type RouterStore = ReturnType<
  typeof import("./index")["useRouterTabStore"]
>;

/**
 * create tabId
 * @param {TabKey} tabKey
 * @param {RouteLocationNormalized} router
 * @returns {string}
 */
const createTabId = function (
  this: RouterStore,
  tabKey: TabKey | undefined | null,
  router: RouteLocationNormalized
) {
  const _tabKey = tabKey ?? INITIAL_TAB_CONFIG.key;
  const tabId = isFunction(_tabKey) ? _tabKey(router) : router[_tabKey];

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
const getTabConfigInRouterMeta = function (
  this: RouterStore,
  router: RouteLocationNormalized
) {
  const { meta } = router;

  const { key, name, keepAlive } =
    (meta.tabConfig as TabConfig) || INITIAL_TAB_CONFIG;
  const tab = {
    name: name ?? router.name ?? router.path,
    id: this.createTabId(key, router),
    keepAlive: keepAlive ?? INITIAL_TAB_CONFIG.keepAlive,
    fullPath: router.fullPath,
  };
  return tab;
};

const indexOfTab: IndexOfTab = function (this: RouterStore, tabId: TabId) {
  return this.tabs.findIndex(({ id }) => id === tabId);
};

const hasTab: HasTab = function (this: RouterStore, tabId: TabId) {
  return this.tabs.some(({ id }) => id === tabId);
};

/**
 * get tab by tabId, if tabId is undefined, return active tab
 * @param {TabId} tabId TabId
 * @returns Tab | undefined
 */
const getTab: GetTab = function (this: RouterStore, tabId?: TabId) {
  return this.tabs.find(({ id }) => id === (tabId ?? this.activeTabId));
};

/**
 * get tabId by route
 * @param {RouteLocationNormalizedLoaded} route
 * @returns TabId
 */
const getTabIdByRoute = function (
  this: RouterStore,
  route: RouteLocationNormalizedLoaded
) {
  const key =
    (route.meta?.tabConfig as TabConfig)?.key ?? INITIAL_TAB_CONFIG.key;
  const tabId = this.createTabId(key, route);
  return tabId;
};

/**
 * add tab
 * @param {TabId} tab
 * @returns Tab | undefined
 */
const addTab: AddTab = function (this: RouterStore, tab: Tab, options) {
  const { setActive } = options ?? { setActive: true };
  const index = this.tabs.push(tab);
  if (setActive) {
    this.setActiveTab(tab.id);
  }
  return index;
};

const removeTab: RemoveTab = function (this: RouterStore, tabId: TabId) {
  return this.tabs.splice(this.indexOfTab(tabId), 1)[0];
};

/**
 * set active tab
 * @param {TabId} tabId
 * @returns {number} tab index
 */
const setActiveTab: SetActiveTab = function (this: RouterStore, tabId: TabId) {
  const tabIndex = this.indexOfTab(tabId);
  const tab = this.tabs[tabIndex];
  if (!tab) {
    throwError(`Tab not found, please check the tab id: ${tabId}`);
    return -1;
  }

  this.activeTabId = tabId;

  return tabIndex;
};

/**
 * open tab by tab id
 * @param tabId
 */
const openTab: OpenTab = function (this: RouterStore, tabId: TabId) {
  const tab = this.getTab(tabId);
  if (!tab) {
    throwError(`Tab not found, please check the tab id: ${tabId}`);
    return;
  }
  this.push(tab.fullPath);
};

/**
 * @param {string} path //TODO:add other type
 */
const push = function (this: RouterStore, path: string) {
  this.$router.push(path);
};

export default {
  createTabId,
  getTabConfigInRouterMeta,
  hasTab,
  indexOfTab,
  addTab,
  getTab,
  getTabIdByRoute,
  removeTab,
  setActiveTab,
  openTab,
  push,
};
