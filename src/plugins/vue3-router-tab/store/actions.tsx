import {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
} from "vue-router";
import { INITIAL_TAB_CONFIG } from "../constants";
import { Tab, TabConfig, TabId, TabKey } from "../types";
import { isFunction, isNonEmptyString, throwError } from "../utils";
import {
  AddTab,
  Close,
  CreateTab,
  CreateTabId,
  GetTab,
  GetTabByRouteMeta,
  GetTabIdByRouteMeta,
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
): string | void {
  const _tabKey = tabKey ?? INITIAL_TAB_CONFIG.key;
  const tabId = isFunction(_tabKey) ? _tabKey(router) : router[_tabKey];

  if (isNonEmptyString(tabId)) return tabId;

  return throwError(
    "tabKey is not 'path','fullPath' or a function, or the return value of the function is not empty."
  );
};

/**
 * create tab
 * @param {TabKey} tabKey
 * @returns {Tab} tab
 */
const _createTab:CreateTab = function (this: RouterStore,
  router: RouteLocationNormalized) {
  const {
    key,
    name,
    keepAlive,
    isIframe = false,
  } = (router.meta.tabConfig as TabConfig) || INITIAL_TAB_CONFIG;

  const tabId = this._createTabId(key, router);

  if (!tabId) return throwError(`TabId is not found, please check the tab key: ${key}`);

  const tab: Tab = {
    name: name ?? router.name ?? router.path,
    id: tabId,
    keepAlive: keepAlive ?? INITIAL_TAB_CONFIG.keepAlive,
    fullPath: router.fullPath,
  };

  if (isIframe) tab.isIframe = true;
  return tab;
};

/**
 * Retrieves the tab identifier using the route's meta information
 * @param {RouteLocationNormalized} router
 * @returns {Tab} tab|void
 */
const _getTabByRouteMeta: GetTabByRouteMeta = function (
  this: RouterStore,
  router: RouteLocationNormalized
) {

  const { key } = (router.meta.tabConfig as TabConfig) || INITIAL_TAB_CONFIG;

  const tabId = this._createTabId(key, router);

  if (!tabId) return throwError(`TabId is not found, please check the tab key: ${key}`);
  return this._getTab(tabId);
};

/**
 * Get tabId by route
 * @param {RouteLocationNormalizedLoaded} route
 * @returns {TabId} tabId
 */
const _getTabIdByRouteMeta: GetTabIdByRouteMeta = function (
  this: RouterStore,
  route: RouteLocationNormalizedLoaded
) {
  const key =
    (route.meta?.tabConfig as TabConfig)?.key ?? INITIAL_TAB_CONFIG.key;
  const tabId = this._createTabId(key, route);
  return tabId;
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
 * Retrieves a tab by its ID. If no tabId is provided, the active tab is returned.
 * @param {TabId} [tabId] - The ID of the tab to retrieve.
 * @returns {Tab | undefined} The found tab or undefined.
 */
const _getTab: GetTab = function (this: RouterStore, tabId?: TabId) {
  return tabId ? this.tabs.find(({ id }) => id === tabId) : this.activeTab;
};

/**
 * add tab
 * @param {TabId} tab
 * @param {object} options //TODO: add options
 * @returns {Number} index
 */
const _addTab: AddTab = function (this: RouterStore, tab: Tab, options) {
  const { setActive } = options ?? { setActive: false };
  
  const index = this.tabs.push(tab);

  if (setActive) this._setActiveTab(tab.id);
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
 * //TODO:处理 null 的情况
 */
const _setActiveTab: SetActiveTab = function (
  this: RouterStore,
  tabId: TabId | null
) {
  const tab = tabId ? this._getTab(tabId) : null;

  if (!tab) return throwError(`Tab not found, please check the tab id: ${tabId}`);

  this.activeTab = tab;

  return tab;
};

/**
 * open tab by tab id
 * @param {TabId} tabId
 * @returns {void}
 */
const _openTab: OpenTab = function (this: RouterStore, tabId: TabId) {
  const tab = this._getTab(tabId);
  if (!tab) {
    return throwError(`Tab not found, please check the tab id: ${tabId}`);
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
const close: Close = function (this: RouterStore, before) {
  let tabId: string | void;
  if (!before) {
    tabId = this.activeTab?.id; //if has no key,use activeTab
  } else {
    tabId = this.activeTab ? 
      typeof before === "string" ? before : _getTabIdByRouteMeta.call(this, before);
    const _key = tabId;
    if (!_key) return;
    if (this.tabs.length <= 1) return;
    const index = this._indexOfTab(_key);
    const afterTab = this.tabs[index - 1] ?? this.tabs[index + 1] ?? null;
    this._setActiveTab(afterTab?.id);

    if (this.activeTab) this.open(this.activeTab.id);

    return this._removeTab(_key);
  }
};

/**
 * close others tabs
 */

const closeOthers = function (this: RouterStore) {
  if (!this.activeTab) return;
  const currentIndex = this._indexOfTab(this.activeTab.id);

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
  _createTab,
  _getTabByRouteMeta,
  _hasTab,
  _indexOfTab,
  _addTab,
  _getTab,
  _getTabIdByRouteMeta,
  _removeTab,
  _setActiveTab,
  _openTab,

  open,
  close,
  closeOthers,
  getTabs,
};
