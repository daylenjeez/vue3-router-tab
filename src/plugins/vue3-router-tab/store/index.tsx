//store.js
import { defineStore, Store, StoreDefinition } from "pinia";
import state, { State } from "./state";
import actions, { Actions } from "./actions";

export type UseRouterTabStore = StoreDefinition<string, State, {}, Actions>;
export const useRouterTabStore: UseRouterTabStore = defineStore("routerTab", {
  state,
  actions,
});

export type RouterTabStore = ReturnType<UseRouterTabStore>;
