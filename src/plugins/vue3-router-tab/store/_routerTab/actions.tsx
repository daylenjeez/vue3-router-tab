import { INITIAL_TAB_CONFIG } from "../../constants";
import { Tab, TabConfig, TabId } from "../../types";
import { isFunction, isNonEmptyString, isString, throwError, withPostAction } from "../../utils";
import { useCache } from "../cache";
import {
  AddTab,
  Clear,
  Open,
  Close,
  CloseOthers,
  CreateTab,
  CreateTabId,
  GetTab,
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
  RouterReplace,
  Refresh,
  OpenNearTab,
  GetTabByFullPath,
  GetRemoveItem,
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
 * get tabId by route
 * @param {RouteLocationNormalizedLoaded} route
 * @returns {TabId} tabId
 */
const _getTabIdByRoute: GetTabIdByRouteMeta = function (
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
  if (index < 0) throwError(`Tab not found, please check the tab id: ${tabId}`);
  return index;
};

/**
 * has tab by tabId
 * @param {TabId} tabId
 * @returns {boolean} hasTab
 */
const hasTab: HasTab = function (this: RouterStore, tabId?) {
  return this.tabs.some(({ id }) => id === tabId);
};

/**
 * Retrieves a tab by its ID.
 * @param {TabId} [tabId] - The ID of the tab to retrieve.
 * @returns {Tab | undefined} The found tab or undefined.
 */
const _getTab: GetTab = function (this: RouterStore, tabId) {
  return this.tabs.find(({ id }) => id === tabId);
};

/**
 * get tabId by fullpath
 * @param {string} fullPath
 * @returns {Tab | undefined} tab
 */
const _getTabByFullpath: GetTabByFullPath = function (this: RouterStore, fullPath: string) {
  return this.tabs.find((tab) => tab.fullPath === fullPath);
};

/**
 * add tab
 * @param {TabId} tab
 * @param {object} options //TODO: add options
 * @returns {Number}
 */
const _addTab: AddTab = function (this: RouterStore, tab, options) {
  const { setActive } = options ?? { setActive: false };

  const index = this.tabs.push(tab);
  const cache = useCache();
  cache.add(tab.id);

  if (setActive) this._setActiveTab(tab);
  return index;
};

//const _addIframeTab = function (this: RouterStore, tab: Tab) {};

/**
 * remove tab and cache
 * @param {TabId} tabId
 * @returns {TabWithIndex | undefined} tab
 */
const _removeTabById: RemoveTabById = function (this: RouterStore, tabId) {
  const index = this._indexOfTab(tabId);
  if (index < 0) return void 0;
  const removedTab = this._removeTabByIndex(index);

  const cache = useCache();
  cache.delete(tabId);

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
  const cache = useCache();
  cache.setActiveKey(tab.id);
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
 * open near tab
 * @param {TabId} removedTab
 * @returns {ReturnType<RouterPush>| undefined}
 */
const _openNearTab: OpenNearTab = async function (this: RouterStore, removedTab) {
  const { index: afterIndex } = removedTab;

  const afterTab = this.tabs[afterIndex] ?? this.tabs[afterIndex - 1] ?? void 0;

  if (afterTab) await this.open(afterTab.fullPath);
};

/**
 * router push
 * @param {RouteLocationRaw} to
 * @returns {Promise<RouteLocationNormalized>}
 */
const _routerPush: RouterPush = async function (this: RouterStore, to) {
  return this.$router.push(to);
};

/**
 * router replace
 * @param {RouteLocationRaw} to
 * @returns {Promise<RouteLocationNormalized>} route
 */
const _routerReplace: RouterReplace = function (this: RouterStore, to) {
  return this.$router.replace(to);
};

/**
 * remove tab,The last tab cannot be closed
 * @param {{ id?: TabId; fullPath?: string }} item tabId or route
 * @returns {TabWithIndex  | undefined}
 */
const _remove: Remove = function (this: RouterStore, item) {
  let tabId: TabId | undefined;
  if ('id' in item) tabId = item.id;
  if ('fullPath' in item) tabId = item.fullPath ? this._getTabByFullpath(item.fullPath)?.id : void 0;

  if (!tabId) return throwError(`Tab not found, please check the param: ${item}`);
  if (this.tabs.length === 1 && this.tabs[0].id === tabId) {
    return throwError(`The last tab cannot be closed：${item}`);
  }
  return this._removeTabById(tabId);
};

/**
 * refresh tab
 * @param tabId
 */
const _refresh: Refresh = function (this: RouterStore, tabId) {
  const tab = this._getTab(tabId);
  if (!tab) return throwError(`Tab not found, please check the tab id: ${tabId}`);
  const cache = useCache();
  cache.refresh(tabId);
};

/**
 * clear tabs
 **/
const _clear: Clear = withPostAction(function (this: RouterStore) {
  this.tabs = [];
}, () => {
  const cache = useCache();
  cache.reset();
});

/**
 * @param {RouteLocationRaw} to
 * @param {Options} options
 * @returns {Promise<RouteLocationNormalized>} route
 * //TODO:refresh need test
 */
const open: Open = async function (this: RouterStore, to, options = { replace: false, refresh: false }) {
  const { replace,refresh } = options;
  if (replace) return this._routerReplace(to);
  const route = await this._routerPush(to);

  if (refresh && route) {
    const tabId = this._getTabIdByRoute(route.to);
    if(tabId) this._refresh(tabId);
  }
  return route;
};

/**
 * get remove item
 * @param {{id:TabId}|{fullPath:string}|string|undefined} item tabId or fullpath 
 * @returns { id?: TabId, fullPath?: string }
 */
const _getRemoveItem:GetRemoveItem =  function(this:RouterStore,item) {
  if (!item && !this.activeTab?.id) return void 0;
  const _item =  isString(item) ? { fullPath: item } : item;
  return _item ? _item :  { id: this.activeTab?.id };
};


/**
 * close tab and after tab
 * @param {{id:TabId}|{fullPath:string}|string|undefined} item tabId or fullpath
 * @param {ToOptions} toOptions
 * @returns {TabWithIndex | undefined}
 */
const close: Close = async function (this: RouterStore, item, toOptions) {
  const _item = this._getRemoveItem(item);
  if(!_item)return void 0;
  const removedTab = this._remove(_item);

  if (toOptions) {
    const { id, fullPath } = toOptions;
    if (id === item) return throwError('The id of the tab to be closed cannot be the same as the id of the tab to be opened,if you want to open the tab, please use the fullPath parameter.');
    const _fullPath = this._getTab(id)?.fullPath ?? fullPath;

    if (!_fullPath) return throwError(`The fullPath of the tab to be opened is not found, please check ${id ? id : fullPath}.`);

    await this._routerPush(_fullPath);
    return removedTab;
  }

  if (removedTab && (removedTab.id === this.activeTab?.id)) await this._openNearTab(removedTab);

  return removedTab;
};

/**
 * close others tabs
 * @param {TabId} currentTabId
 */
const closeOthers: CloseOthers = function (this: RouterStore, tabId) {
  if (!tabId && !this.activeTab?.id) return;
  const _tabId = tabId ?? this.activeTab?.id;

  if(!this.hasTab(_tabId)) return;
  
  [...this.tabs].forEach(item => {
    if (item.id !== _tabId) this._removeTabById(item.id);
  });

  this._setActiveTab(this._getTab(_tabId));
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
  _indexOfTab,
  _addTab,
  _getTab,
  _getTabByFullpath,
  _getTabIdByRoute,
  _removeTabById,
  _removeTabByIndex,
  _remove,
  _refresh,
  _setActiveTab,
  _openTabById,
  _openNearTab,
  _clear,
  _routerPush,
  _routerReplace,
  _getRemoveItem,

  open,
  close,
  closeOthers,
  hasTab,
};
