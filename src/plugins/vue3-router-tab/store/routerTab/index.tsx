import { StoreDefinition, defineStore } from 'pinia';
import { Close, CloseOthers, Open } from '../_routerTab/type/actions';
import { State as privateState } from '../_routerTab/type/state';
import { useRouterTabStore } from '../_routerTab';
import type { TabId } from '../../types';
import { CreateActions, CreateGetters } from '../type';

type Getters = CreateGetters<privateState, {
  activeTab:  (state: privateState) =>privateState['activeTab'],
  tabs:  (state: privateState)  =>privateState['tabs']
}>;

type Actions = CreateActions<
  string,
  privateState,
  {
    hasTab: (tabId:TabId) => boolean,
    open: Open,
    close: Close,
    closeOthers: CloseOthers
  }>

export type UseRouterTab = StoreDefinition<string, privateState, Getters, Actions>;

export const useRouterTab:UseRouterTab = defineStore({
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
    close: ((...args: Parameters<Close>) => {
      const routerTab = useRouterTabStore();
      return routerTab.close(...args);
    }) as Close,
    closeOthers:(...args: Parameters<CloseOthers>) => {
      const routerTab = useRouterTabStore();
      return routerTab.closeOthers(...args);
    }
  }
});

export type RouterTabType = ReturnType<typeof useRouterTab>;
