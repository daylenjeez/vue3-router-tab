import type { Tab, TabConfig, TabKey } from "@routerTab/types";
import { isFunction, isNonEmptyString, throwError } from "@routerTab/utils";
import type { RouteLocationNormalized } from "vue-router";

import { INITIAL_TAB_CONFIG } from "./constants";

/**
 * create tabId
 * @param {TabKey} tabKey
 * @param {RouteLocationNormalized} route
 * @returns {TabId} tabId
 */
export const createTabId = (
  tabKey: TabKey,
  route: RouteLocationNormalized,
) => {
  const _tabKey = tabKey ?? INITIAL_TAB_CONFIG.key;
  const tabId = isFunction(_tabKey) ? _tabKey(route) : route[_tabKey];

  if (isNonEmptyString(tabId)) return tabId;

  return throwError(
    "tabKey is not 'path','fullPath' or a function, or the return value of the function is not a non-empty string",
  );
};

/**
 * create tab
 * @param {TabKey} tabKey
 * @returns {Tab} tab
 */
export const createTab = (router: RouteLocationNormalized) => {
  const { key, name, keepAlive, iframeAttributes } =
    (router.meta.tabConfig as TabConfig) ?? INITIAL_TAB_CONFIG;

  if (!key) return throwError("tabKey is required");

  const tabId = createTabId(key, router);

  if (!tabId)
    return throwError(`TabId is not found, please check the tab key: ${key}`);

  const tab: Tab = {
    name: name ?? router.name ?? router.path,
    id: tabId,
    keepAlive: keepAlive ?? INITIAL_TAB_CONFIG.keepAlive,
    fullPath: router.fullPath,
  };

  if (iframeAttributes) tab.iframeAttributes = iframeAttributes;
  return tab;
};

/**
 * get tabId by route
 * @param {RouteLocationNormalizedLoaded} route
 * @returns {TabId|undefined} tabId
 */
export const getTabIdByRoute = (router: RouteLocationNormalized) => {
  const key =
    (router.meta?.tabConfig as TabConfig)?.key ?? INITIAL_TAB_CONFIG.key;
  const tabId = createTabId(key, router);
  return tabId;
};
