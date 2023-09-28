//store.js
import { defineStore, StoreDefinition } from "pinia";
import state, { State } from "./state";
import actions from "./actions";
import { Actions } from "./type/actions";

export type UseRouterTabStore = StoreDefinition<string, State, {}, Actions>;
export const useRouterTabStore: UseRouterTabStore = defineStore("routerTab", {
  state,
  actions,
});

export type RouterTabStore = ReturnType<UseRouterTabStore>;


export const useRouterTab = ()=> {
  const routerTab = useRouterTabStore();
  return {
    open:routerTab.open,
    getTabs:routerTab.getTabs,
    getActiveTab: routerTab.getActiveTab,
  };
};

