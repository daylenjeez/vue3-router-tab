//store.js
import { defineStore, StoreDefinition } from "pinia";
import { State } from "./type/state";
import actions from "./actions";
import { Actions } from "./type/actions";
import { Getters } from "./type/getters";
import { pick } from "../utils";
import state from "./state";
import getters from "./getters";

export type UseRouterTabStore = StoreDefinition<string, State, Getters, Actions>;
export const useRouterTabStore: UseRouterTabStore = defineStore("routerTab", {
  state,
  getters,
  actions,
});

export type RouterTabStore = ReturnType<UseRouterTabStore>;

export const useRouterTab = () => {
  const routerTab = useRouterTabStore();

  return pick(routerTab, "currentTab", "currentTabId", "open", "getTabs", "getActiveTab", "close", "closeOthers");
};

export type RouterTabType = ReturnType<typeof useRouterTab>;
