import { INITIAL_TAB_CONFIG } from "../constants";
import { Tab, TabConfig, TabId } from "../types";
import { isFunction, isNonEmptyString, throwError } from "../utils";
import {
  AddTab,
  Clear,
  Open,
  Close,
  CreateTab,
  CreateTabId,
  GetTab,
  GetTabByRouteMeta,
  GetTabIdByRouteMeta,
  HasTab,
  IndexOfTab,
  OpenTabById,
  RemoveTabById,
  RemoveTabByIndex,
  RouterPush,
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
  tabKey,
  router
): string | undefined {
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
const _createTab: CreateTab = function (this: RouterStore,
  router) {
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
 * @returns {Tab} tab|undefined
 */
const _getTabByRouteMeta: GetTabByRouteMeta = function (
  this: RouterStore,
  router
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
  route
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
 * Retrieves a tab by its ID.
 * @param {TabId} [tabId] - The ID of the tab to retrieve.
 * @returns {Tab | undefined} The found tab or undefined.
 */
const _getTab: GetTab = function (this: RouterStore, tabId: TabId | undefined) {
  return this.tabs.find(({ id }) => id === tabId);
};

/**
 * add tab
 * @param {TabId} tab
 * @param {object} options //TODO: add options
 * @returns {Number} index
 */
const _addTab: AddTab = function (this: RouterStore, tab, options) {
  const { setActive } = options ?? { setActive: false };

  const index = this.tabs.push(tab);

  if (setActive) this._setActiveTab(tab);
  return index;
};

//const _addIframeTab = function (this: RouterStore, tab: Tab) {};

/**
 * remove tab
 * @param {TabId} tabId
 * @returns {Tab | undefined} tab
 */
const _removeTabById: RemoveTabById = function (this: RouterStore, tabId) {
  return this.tabs.splice(this._indexOfTab(tabId), 1)[0];
};

/**
 * remove tab
 * @param {number} index
 * @returns {Tab | undefined} tab
 */
const _removeTabByIndex: RemoveTabByIndex = function (this: RouterStore, index) {
  return this.tabs.splice(index, 1)[0];
};

//const _removeIframeTab = function (this: RouterStore, tab: Tab) {};

/**
 * set active tab
 * @param {TabId} tabId
 * @returns {number} index
 */
const _setActiveTab: SetActiveTab = function (
  this: RouterStore,
  tab
) {
  if (!tab) return throwError(`Tab not found, please check the tab: ${tab}`);
  this.activeTab = tab;
  return tab;
};

/**
 * open tab by tab id
 * @param {TabId} tabId
 * @returns {undefined}
 */
const _openTabById: OpenTabById = function (this: RouterStore, tabId) {
  const tab = this._getTab(tabId);
  if (!tab) return throwError(`Tab not found, please check the tab id: ${tabId}`);
  this._routerPush(tab.fullPath);
};

/**
 * router push
 * @param {RouteLocationRaw} to
 * @returns {Promise<RouteLocationNormalized>} route
 */
const _routerPush: RouterPush = function (this: RouterStore, to) {
  return this.$router.push(to);
};

const _clear: Clear = function (this: RouterStore) {
  this.tabs = [];
  // this._setActiveTab(void 0);
};

/**
 * @param {RouteLocationRaw} to
 * @returns {Promise<RouteLocationNormalized>} route
 */
const open: Open = function (this: RouterStore, to) {
  return this._routerPush(to);
};

/**
 * close tab and after tab
 * @param {TabId|RouteLocationNormalizedLoaded} item tabId or route
 * @param {ToOptions} toOptions
 * @returns {Tab | undefined}
 * //TODO:if only one tab and item is current tab, do nothing
 */
const close: Close = async function (this: RouterStore, item, toOptions) {
  const tabId = item ? typeof item === "string" ? item : _getTabIdByRouteMeta.call(this, item) : this.activeTab?.id;

  if (!tabId) return throwError(`Tab not found, please check the param: ${item}`);
  const index = this._indexOfTab(tabId);
  if (index === -1) return throwError(`Tab not found, please check the tab id: ${tabId}`);
  const res = this._removeTabByIndex(index);

  if (toOptions) {
    const { id, fullPath } = toOptions;

    const _fullPath = this._getTab(id)?.fullPath ?? fullPath;

    if (_fullPath) {
      await this.open(_fullPath);
      return res;
    }
  }

  if (tabId === this.activeTab?.id) {//if tab is active tab, open after tab
    const afterTab = this.tabs[index + 1] ?? this.tabs[index - 1] ?? void 0;
    if (afterTab) await this.open(afterTab.fullPath);
  }


  return res;
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
 * get active tab
 */
const getActiveTab = function (this: RouterStore) {
  return this.activeTab;
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
  _removeTabById,
  _removeTabByIndex,
  _setActiveTab,
  _openTabById,
  _clear,
  _routerPush,

  open,
  close,
  closeOthers,
  getTabs,
  getActiveTab,
};
