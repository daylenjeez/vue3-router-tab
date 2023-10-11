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
  Remove,
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
 * @returns {number} index
 */
const _indexOfTab: IndexOfTab = function (this: RouterStore, tabId) {
  const index = this.tabs.findIndex(({ id }) => id === tabId);
  if (index < 0) {
    throwError(`Tab not found, please check the tab id: ${tabId}`);
  }
  return index;
};

/**
 * has tab by tabId
 * @param {TabId} tabId
 * @returns {boolean} hasTab
 */
const _hasTab: HasTab = function (this: RouterStore, tabId) {
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
 * @returns {TabWithIndex | undefined} tab
 */
const _removeTabById: RemoveTabById = function (this: RouterStore, tabId) {
  const index = this._indexOfTab(tabId);
  if (index < 0) return void 0;

  const removedTab = this._removeTabByIndex(index);
  return removedTab ? { ...removedTab, index } : void 0;
};

/**
 * remove tab
 * @param {number} index
 * @returns {Tab | undefined}
 */
const _removeTabByIndex: RemoveTabByIndex = function (this: RouterStore, index) {
  if (index < 0) return throwError(`Index is less than 0, please check the index: ${index}`);
  return this.tabs.splice(index, 1)[0];
};

//const _removeIframeTab = function (this: RouterStore, tab: Tab) {};

/**
 * set active tab
 * @param {TabId} tabId
 * @returns {Tab|undefined}
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
 * @returns {ReturnType<RouterPush>| undefined}
 */
const _openTabById: OpenTabById = function (this: RouterStore, tabId) {
  const tab = this._getTab(tabId);
  if (!tab) return throwError(`Tab not found, please check the tab id: ${tabId}`);
  return this._routerPush(tab.fullPath);
};

/**
 * router push
 * @param {RouteLocationRaw} to
 * @returns {Promise<RouteLocationNormalized>} route
 */
const _routerPush: RouterPush = function (this: RouterStore, to) {
  return this.$router.push(to);
};

/**
 * remove tab
 * @param {TabId|RouteLocationNormalizedLoaded} item tabId or route
 * @returns {TabWithIndex  | undefined}
 */
const _remove: Remove = function (this: RouterStore, item) {
  const tabId = typeof item === "string" ? item : this._getTabIdByRouteMeta(item);


  if (!tabId) return throwError(`Tab not found, please check the param: ${item}`);
  return this._removeTabById(tabId);
};

/**
 * clear tabs
 **/
const _clear: Clear = function (this: RouterStore) {
  this.tabs = [];
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
 * @returns {Tab & {index:number} | undefined}
 * //TODO:if only one tab and item is current tab, do nothing
 */
const close: Close = async function (this: RouterStore, item, toOptions) {
  if (!item && !this.activeTab) return void 0;

  const removedTab = this._remove(item ?? this.activeTab!.id);

  if (toOptions) {
    const { id, fullPath } = toOptions;
    if (id === item) {
      return throwError('The id of the tab to be closed cannot be the same as the id of the tab to be opened,if you want to open the tab, please use the fullPath parameter.');
    }
    const _fullPath = this._getTab(id)?.fullPath ?? fullPath;

    if (!_fullPath) {
      return throwError(`The fullPath of the tab to be opened is not found, please check ${id ? id : fullPath}.`);
    }

    await this._routerPush(_fullPath);
    return removedTab;
  }

  if (removedTab && (removedTab.id === this.activeTab?.id)) {
    const { index: afterIndex } = removedTab;

    const afterTab = this.tabs[afterIndex] ?? this.tabs[afterIndex - 1] ?? void 0;

    if (afterTab) await this.open(afterTab.fullPath);
  }

  return removedTab;
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
  _remove,
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
