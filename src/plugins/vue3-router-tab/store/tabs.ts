import { createTab, createTabId } from '@routerTab/helper/utils';
import { INITIAL_TAB_CONFIG } from '@routerTab/helper/utils/constants';
import type { Tab, TabConfig, TabGetter, TabId, ToOptions } from '@routerTab/types';
import { isString, throwError, withPostAction } from '@routerTab/utils';
import { computed, reactive } from 'vue';
import { RouteLocationNormalizedLoaded, RouteLocationRaw, Router } from 'vue-router';

import { useCache } from './cache';

export const useTabStore = (router: Router) => {
  const state = reactive<{
    tabs: Tab[]
    activeTab?: Tab
    shouldClose: boolean
  }>({ tabs: [], activeTab: void 0, shouldClose: true });

  const currentTab = computed(() => state.activeTab);
  const currentTabId = computed(() => state.activeTab?.id);

  /**
   * get tab index by tabId
   * @param {TabId} tabId
   * @returns {number} index
   */
  const indexOf = (tabId: TabId) => {
    const index = state.tabs.findIndex(({ id }) => id === tabId);
    if (index < 0) throwError(`Tab not found, please check the tab id: ${tabId}`);
    return index;
  };

  /**
   * has tab by tabId
   * @param {TabId} tabId
   * @returns {boolean} hasTab
   */
  const has = (tabId?: TabId) => {
    return state.tabs.some(({ id }) => id === tabId);
  };

  /**
   * find tab by tabId
   * @param {TabId} tabId - The ID of the tab to retrieve.
   * @returns {Tab | undefined} The found tab or undefined.
   */
  const find = (tabId: TabId) => {
    return state.tabs.find(({ id }) => id === tabId);
  };

  /**
   * get tabId by fullpath
   * @param {string} fullPath
   * @returns {Tab | undefined} tab
   */
  const getTabByFullpath = (fullPath: string) => {
    return state.tabs.find((tab) => tab.fullPath === fullPath);
  };

  /**
   * set active tab
   * @param {Tab} tab
   * @returns {Tab|undefined}
   */
  const setActive = (tab: Tab) => {
    if (!tab) return throwError(`Tab not found, please check the tab: ${tab}`);
    state.activeTab = tab;
    const cache = useCache();
    cache.setActiveKey(tab.id);
    return tab;
  };

  /**
   * add tab
   * @param {Tab} tab
   * @param {{ setActive?: boolean }} options //TODO: add options
   * @returns {Number}
   */
  const addTab = (tab: Tab, options?: { setActive?: boolean }) => {
    const index = state.tabs.push(tab);
    const cache = useCache();
    cache.add(tab.id);

    if (options?.setActive) setActive(tab);
    return index;
  };

  /**
   * remove tab by index
   * @param {number} index
   * @returns {Tab | undefined}
   */
  const removeTabByIndex = (index: number) => {
    if (index < 0) return throwError(`Index is less than 0, please check the index: ${index}`);
    return state.tabs.splice(index, 1)[0];
  };

  /**
   * remove tab and cache
   * @param {TabId} tabId
   * @returns {TabWithIndex | undefined} tab
   */
  const removeTabById = (tabId: TabId) => {
    const index = indexOf(tabId);
    if (index < 0) return void 0;
    const removedTab = removeTabByIndex(index);

    const cache = useCache();
    cache.remove(tabId);

    return removedTab ? { ...removedTab, index } : void 0;
  };

  /**
   * router push
   * @param {RouteLocationRaw} to
   * @returns {Promise<RouteLocationNormalized>}
   */
  const routerPush = async (to: RouteLocationRaw) => {
    return router.push(to);
  };

  /**
   * router replace
   * @param {RouteLocationRaw} to
   * @returns {Promise<RouteLocationNormalized>} route
   */
  const routerReplace = (to: RouteLocationRaw) => {
    return router.replace(to);
  };

  /**
   * refresh tab
   * @param {TabId} tabId
   */
  const refresh = (tabId: TabId) => {
    const tab = find(tabId);
    if (!tab) return throwError(`Tab not found, please check the tab id: ${tabId}`);
    const cache = useCache();
    cache.refresh(tabId);
  };

  /**
   * @param {RouteLocationRaw} to
   * @param {Options} options
   * @returns {Promise<RouteLocationNormalized>} route
   * //TODO:refresh need test
   */
  const open = async function (to: RouteLocationRaw, options = { replace: false, refresh: false }) {
    const { replace } = options;
    if (replace) return routerReplace(to);
    const route = await routerPush(to);

    if (options.refresh && route) {
      const tabId = getTabIdByRoute(route.to);
      if (tabId) refresh(tabId);
    }
    return route;
  };

  /**
   * open tab by tab id
   * @param {TabId} tabId
   * @returns {ReturnType<RouterPush>| undefined}
   */
  const openTabById = (tabId: TabId) => {
    const tab = find(tabId);
    if (!tab) return throwError(`Tab not found, please check the tab id: ${tabId}`);
    return routerPush(tab.fullPath);
  };

  /**
   * open near tab
   * @param {{index:number}} removedTab
   * @returns {ReturnType<RouterPush>| undefined}
   */
  const openNearTab = async function (removedTab: { index: number }) {
    const { index: afterIndex } = removedTab;

    const afterTab = state.tabs[afterIndex] ?? state.tabs[afterIndex - 1] ?? void 0;

    if (afterTab) await open(afterTab.fullPath);
  };

  /**
   * get tabId by route
   * @param {RouteLocationNormalizedLoaded} route
   * @returns {TabId} tabId
   */
  const getTabIdByRoute = (route: RouteLocationNormalizedLoaded) => {
    const key = (route.meta?.tabConfig as TabConfig)?.key ?? INITIAL_TAB_CONFIG.key;
    const tabId = createTabId(key, route);
    return tabId;
  };

  /**
   * get tabId by remove item
   * @param {TabGetter} item
   * @returns {TabId | undefined}
   */
  const getTabIdByRemoveItem = function (item: TabGetter) {
    let tabId: TabId | undefined;
    if (typeof item === 'string') item = { fullPath: item };
    if ('id' in item) tabId = item.id;
    if ('fullPath' in item) tabId = item.fullPath ? getTabByFullpath(item.fullPath)?.id : void 0;

    if (!tabId) return throwError(`Tab not found, please check the param: ${item}`);
    return tabId;
  };

  /**
   * remove tab,The last tab cannot be closed
   * @param {{ id?: TabId; fullPath?: string }} item tabId or route
   * @returns {TabWithIndex  | undefined}
   */
  const remove = (item: { id?: TabId; fullPath?: string }) => {
    const tabId = getTabIdByRemoveItem(item);
    if (!tabId) return void 0;
    if (state.tabs.length === 1 && state.tabs[0].id === tabId) {
      return throwError(`The last tab cannot be closed：${item}`);
    }
    return removeTabById(tabId);
  };

  /**
   * clear tabs
   **/
  const clear = withPostAction(
    () => {
      state.tabs = [];
    },
    () => {
      const cache = useCache();
      cache.reset();
    }
  );

  /**
   * get remove item
   * @param {TabGetter|undefined} item tabId or fullpath
   * @returns { id?: TabId, fullPath?: string }
   */
  const getRemoveItem = (item?: TabGetter) => {
    if (!item && !state.activeTab?.id) return void 0;
    const _item = isString(item) ? { fullPath: item } : item;
    return _item ? _item : { id: state.activeTab?.id };
  };

  /**
   * set should close
   * @param val boolean
   */
  const setShouldClose = (val: boolean) => {
    state.shouldClose = val;
  };

  /**
   * close tab and after tab
   * @param {TabGetter|undefined} item tabId or fullpath
   * @param {ToOptions} toOptions
   * @returns {TabWithIndex | undefined}
   */
  const close = async (item?: TabGetter, toOptions?: ToOptions) => {
    if (!state.shouldClose) return;
    const _item = getRemoveItem(item);
    if (!_item) return void 0;
    const removedTab = remove(_item);

    if (toOptions && (toOptions.id || toOptions.fullPath)) {
      const { id, fullPath } = toOptions;
      if (id === item) return throwError('The id of the tab to be closed cannot be the same as the id of the tab to be opened,if you want to open the tab, please use the fullPath parameter.');
      const _fullPath = id ? find(id)?.fullPath : fullPath;

      if (!_fullPath) return throwError(`The fullPath of the tab to be opened is not found, please check ${id ? id : fullPath}.`);

      await routerPush(_fullPath);
      return removedTab;
    }

    if (removedTab && removedTab.id === state.activeTab?.id) await openNearTab(removedTab);

    return removedTab;
  };

  /**
   * close others tabs
   * @param {TabId} currentTabId
   */
  const closeOthers = (tabId?: TabId) => {
    if (!tabId && !state.activeTab?.id) return;
    const _tabId = tabId ?? state.activeTab?.id;

    if (!has(_tabId)) return
    ;[...state.tabs].forEach((item) => {
      if (item.id !== _tabId) removeTabById(item.id);
    });

    if (!_tabId) return;

    const afterActiveTab = find(_tabId);

    if (afterActiveTab) setActive(afterActiveTab);
  };

  return {
    $router: router,
    state,
    createTab,
    indexOf,
    find,
    getTabByFullpath,
    getTabIdByRoute,
    setActive,
    addTab,
    removeTabByIndex,
    removeTabById,
    routerPush,
    routerReplace,
    openTabById,
    openNearTab,
    remove,
    refresh,
    clear,
    getRemoveItem,
    setShouldClose,

    currentTab,
    currentTabId,
    open,
    close,
    closeOthers,
    has,
  };
};

export type RouterTabStore = ReturnType<typeof useTabStore>
