import {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
  Router,
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
  (tabId: TabId): Tab | undefined;
}
interface OpenTab {
  (tabId: TabId): void;
}

interface SetActiveTab {
  (tabId: TabId | null): number;
}

interface Open {
  (to: RouteLocationRaw): ReturnType<Router["push"]>;
}

interface Close {
  (key?: string): Tab | undefined;
}

interface CloseOthers {
  (): Tab | undefined;
}

interface GetTabs {
  (): Tab[];
}

export type Actions = CreateActions<
  string,
  State,
  {
    _createTabId: CreateTabId;
    _getTabConfigInRouterMeta: GetTabConfigInRouterMeta;
    _hasTab: HasTab;
    _indexOfTab: IndexOfTab;
    _getTab: GetTab;
    _getTabIdByRoute: GetTabIdByRoute;
    _addTab: AddTab;
    _removeTab: RemoveTab;
    _setActiveTab: SetActiveTab;
    _openTab: OpenTab;
    open: Open;
    close: Close;
    closeOthers: CloseOthers;
    getTabs: GetTabs;
  }
>;

export type RouterStore = ReturnType<
  typeof import("./index")["useRouterTabStore"]
>;

/**
 * create tabId
 * @param {TabKey} tabKey
 * @param {RouteLocationNormalized} router
 * @returns {TabId} tabId
 */
const _createTabId: CreateTabId = function (
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
 * @returns {Tab} tab
 */
const _getTabConfigInRouterMeta: GetTabConfigInRouterMeta = function (
  this: RouterStore,
  router: RouteLocationNormalized
) {
  const { meta } = router;

  const {
    key,
    name,
    keepAlive,
    isIframe = false,
  } = (meta.tabConfig as TabConfig) || INITIAL_TAB_CONFIG;
  const tab = {
    name: name ?? router.name ?? router.path,
    id: this._createTabId(key, router),
    keepAlive: keepAlive ?? INITIAL_TAB_CONFIG.keepAlive,
    fullPath: router.fullPath,
  } as Tab;
  if (isIframe) tab.isIframe = true;
  return tab;
};

/**
 *
 * @param {TabId} tabId
 * @returns {Tab|undefined} tab
 */
const _indexOfTab: IndexOfTab = function (this: RouterStore, tabId: TabId) {
  return this.tabs.findIndex(({ id }) => id === tabId);
};

const _hasTab: HasTab = function (this: RouterStore, tabId: TabId) {
  return this.tabs.some(({ id }) => id === tabId);
};

/**
 * get tab by tabId, if tabId is undefined, return active tab
 * @param {TabId} tabId TabId
 * @returns {Tab | undefined} tab
 */
const _getTab: GetTab = function (this: RouterStore, tabId?: TabId) {
  return this.tabs.find(({ id }) => id === (tabId ?? this.activeTabId));
};

/**
 * get tabId by route
 * @param {RouteLocationNormalizedLoaded} route
 * @returns {TabId} tabId
 */
const _getTabIdByRoute = function (
  this: RouterStore,
  route: RouteLocationNormalizedLoaded
) {
  console.log(route);

  const key =
    (route.meta?.tabConfig as TabConfig)?.key ?? INITIAL_TAB_CONFIG.key;
  const tabId = this._createTabId(key, route);
  return tabId;
};

/**
 * add tab
 * @param {TabId} tab
 * @param {object} options //TODO: add options
 * @returns {Number} index
 */
const _addTab: AddTab = function (this: RouterStore, tab: Tab, options) {
  const { setActive } = options ?? { setActive: true };
  const index = this.tabs.push(tab);

  if (setActive) {
    this._setActiveTab(tab.id);
  }
  return index;
};

//const _addIframeTab = function (this: RouterStore, tab: Tab) {};

/**
 * remove tab
 * @param {TabId} tabId
 * @returns {Tab | undefined} tab
 */
const _removeTab: RemoveTab = function (this: RouterStore, tabId: TabId) {
  return this.tabs.splice(this._indexOfTab(tabId), 1)[0];
};

//const _removeIframeTab = function (this: RouterStore, tab: Tab) {};

/**
 * set active tab
 * @param {TabId} tabId
 * @returns {number} index
 */
const _setActiveTab: SetActiveTab = function (
  this: RouterStore,
  tabId: TabId | null
) {
  let tabIndex = -1;
  if (tabId) {
    tabIndex = this._indexOfTab(tabId);
    const tab = this.tabs[tabIndex];
    if (!tab) {
      throwError(`Tab not found, please check the tab id: ${tabId}`);
      return -1;
    }
  }

  this.activeTabId = tabId;

  return tabIndex;
};

/**
 * open tab by tab id
 * @param {TabId} tabId
 */
const _openTab: OpenTab = function (this: RouterStore, tabId: TabId) {
  const tab = this._getTab(tabId);
  if (!tab) {
    throwError(`Tab not found, please check the tab id: ${tabId}`);
    return;
  }
  this.open(tab.fullPath);
};

// const addRoute = function (this: RouterStore) {};

// const removeRoute = function (this: RouterStore) {};

/**
 * @param {string} to
 */
const open = function (this: RouterStore, to: RouteLocationRaw) {
  return this.$router.push(to);
};

/**
 * @param {string} key created by TabConfig['key']
 * //if remove current tab, open before tab;if has not before tab,open last tab
 */
const close: Close = function (this: RouterStore, key?: string) {
  const _key = key ?? this.activeTabId; //if has no key,use activeTabId
  if (!_key) return;
  if (this.tabs.length <= 1) return;
  const index = this._indexOfTab(_key);
  const afterTab = this.tabs[index - 1] ?? this.tabs[index + 1] ?? null;
  this._setActiveTab(afterTab?.id);

  if (this.activeTabId) this.open(this.activeTabId);

  return this._removeTab(_key);
};

/**
 * @param {string} key created by TabConfig['key']
 * if remove current tab, open before tab，if has not before tab,open last tab
 */

const closeOthers = function (this: RouterStore) {
  const { activeTabId } = this;
  if (!activeTabId) return;
  const currentIndex = this._indexOfTab(activeTabId);

  this.tabs = this.tabs.filter((_, index) => index === currentIndex);
  return this.tabs[0];
};

/**
 * get all tabs
 */
const getTabs = function (this: RouterStore) {
  return this.tabs;
};

/**
 * @param {string} path //TODO:add other type,RouteLocationRaw
 */
// const openIframe = function (this: RouterStore, path: string) {
//   this.$router.push(path);
// };

export default {
  _createTabId,
  _getTabConfigInRouterMeta,
  _hasTab,
  _indexOfTab,
  _addTab,
  _getTab,
  _getTabIdByRoute,
  _removeTab,
  _setActiveTab,
  _openTab,

  open,
  close,
  closeOthers,
  getTabs,
};
