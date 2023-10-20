import { defineStore, StoreDefinition } from "pinia";
import { State } from "./type/state";
import { Actions } from "./type/actions";
import { Getters } from "./type/getters";
import state from "./state";
import getters from "./getters";
import actions from "./actions";

export type UseRouterTabStore = StoreDefinition<string, State, Getters, Actions>;
export const useRouterTabStore: UseRouterTabStore = defineStore("_routerTab", {
  state,
  getters,
  actions,
});

export type RouterTabStore = ReturnType<UseRouterTabStore>;
