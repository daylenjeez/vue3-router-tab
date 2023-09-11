import {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
} from "vue-router";
import { INITIAL_TAB_CONFIG } from "../constants";
import { Tab, TabConfig, TabId, TabKey } from "../types";
import { isFunction, isString, throwError } from "../utils";
import {
  AddTab,
  Close,
  CreateTabId,
  GetTab,
  GetTabConfigInRouterMeta,
  HasTab,
  IndexOfTab,
  OpenTab,
  RemoveTab,
  RouterStore,
  SetActiveTab,
} from "./type/actions";

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
 * get tab index by tabId
 * @param {TabId} tabId
 * @returns {Tab|undefined} tab
 */
const _indexOfTab: IndexOfTab = function (this: RouterStore, tabId: TabId) {
  return this.tabs.findIndex(({ id }) => id === tabId);
};

/**
 * has tab by tabId
 * @param {TabId} tabId
 * @returns {boolean} hasTab
 */
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
 * @param {string} tabId created by TabConfig['key']
 * //if remove current tab, open before tab;if has not before tab,open last tab
 * //TODO:after tab
 */
const close: Close = function (this: RouterStore, before, after) {
  let tabId: string | null = null;
  if (!before) {
    tabId = this.activeTabId; //if has no key,use activeTabId
  } else {
    tabId =
      typeof before === "string" ? before : _getTabIdByRoute.call(this, before);
  }
  const _key = tabId;
  if (!_key) return;
  if (this.tabs.length <= 1) return;
  const index = this._indexOfTab(_key);
  const afterTab = this.tabs[index - 1] ?? this.tabs[index + 1] ?? null;
  this._setActiveTab(afterTab?.id);

  if (this.activeTabId) this.open(this.activeTabId);

  return this._removeTab(_key);
};

/**
 * close others tabs
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
