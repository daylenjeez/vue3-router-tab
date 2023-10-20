import { defineStore } from 'pinia';
import { useRouterTabStore } from '../_routerTab';
import type { TabId } from '../../types';
import { Close, CloseOthers, Open } from '../_routerTab/type/actions';

export const useRouterTab = defineStore({
  id: 'routerTab',
  getters: {
    activeTab: () => {
      const routerTab = useRouterTabStore();
      return routerTab.activeTab;
    },
    tabs: () => {
      const routerTab = useRouterTabStore();
      return routerTab.tabs;
    }
  },
  actions: {
    hasTab: (tabId:TabId) => {
      const routerTab = useRouterTabStore();
      return routerTab.hasTab(tabId);
    },
    open: (...args:Parameters<Open>) => {
      const routerTab = useRouterTabStore();
      return routerTab.open(...args);
    },
    close: (...args: Parameters<Close>) => {
      const routerTab = useRouterTabStore();
      return routerTab.close(...args);
    },
    closeOthers:(...args: Parameters<CloseOthers>) => {
      const routerTab = useRouterTabStore();
      return routerTab.closeOthers(...args);
    }
  }
});

export type RouterTabType = ReturnType<typeof useRouterTab>;
