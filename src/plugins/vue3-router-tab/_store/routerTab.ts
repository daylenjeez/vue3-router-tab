import { INITIAL_TAB_CONFIG } from '@routerTab/constants';
import { TabKey } from '@routerTab/types';
import { isFunction, isNonEmptyString } from '@routerTab/utils';
import { reactive } from 'vue';
import { RouteLocationNormalized } from 'vue-router';

export const useUserStore = () => {
  const state = reactive({ tabs: [], activeTab: void 0 });

  /**
 * create tabId
 * @param {TabKey} tabKey
 * @param {RouteLocationNormalized} router
 * @returns {TabId} tabId
 */
  const _createTabId = (tabKey:TabKey,router:RouteLocationNormalized)=>{
    const _tabKey = tabKey ?? INITIAL_TAB_CONFIG.key;
    const tabId = isFunction(_tabKey) ? _tabKey(router) : router[_tabKey];

    if (isNonEmptyString(tabId)) return tabId;
  };

  return {state,_createTabId};
};
