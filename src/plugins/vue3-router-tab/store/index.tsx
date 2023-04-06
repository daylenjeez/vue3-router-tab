//store.js
import { defineStore, StoreDefinition } from "pinia";
import state, { State } from "./state";
import actions, { Actions } from "./actions";

export type RouterTabStore = StoreDefinition<string, State, {}, Actions>;
export const useRouterTabStore: RouterTabStore = defineStore("routerTab", {
  state,
  actions,
});
