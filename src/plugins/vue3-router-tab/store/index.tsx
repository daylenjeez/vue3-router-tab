//store.js
import { defineStore, StoreDefinition } from "pinia";
import state, { State } from "./state";
import actions, { Actions } from "./actions";
import { Router } from "vue-router";

export type RouterTabStore = StoreDefinition<string, State, {}, Actions>;
export const useRouterTabStore: RouterTabStore = defineStore("routerTab", {
  state,
  actions,
});

declare module "pinia" {
  export interface PiniaCustomProperties {
    $router: Router;
  }
}
