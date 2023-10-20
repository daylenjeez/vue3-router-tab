import { StoreDefinition, defineStore } from 'pinia';
import { useRouterTabStore } from '../_routerTab';
import { Close, CloseOthers, Open } from '../_routerTab/type/actions';
import type { TabId } from '../../types';
import { State as privateState } from '../_routerTab/type/state';
import { CreateActions, CreateGetters } from '../type';

interface State extends privateState{
}

type Getters = CreateGetters<State, {
  activeTab:  (state: State) =>privateState['activeTab'],
  tabs:  (state: State)  =>privateState['tabs']
}>;

type Actions = CreateActions<
  string,
  State,
  {
    hasTab: (tabId:TabId) => boolean,
    open: (...args:Parameters<Open>) => ReturnType<Open>,
    close: (...args: Parameters<Close>) => ReturnType<Close>,
    closeOthers:(...args: Parameters<CloseOthers>) => ReturnType<CloseOthers>
  }>

export type UseRouterTab = StoreDefinition<string, State, Getters, Actions>;

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
