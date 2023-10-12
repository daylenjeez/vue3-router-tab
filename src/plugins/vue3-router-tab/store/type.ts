import {
  PiniaCustomProperties,
  StateTree,
  _GettersTree,
  _StoreWithGetters,
  _StoreWithState,
} from "pinia";
import { UnwrapRef } from "vue";
import { Router } from "vue-router";

export type CreateActions<Id extends string, S extends StateTree, A> = A &
  ThisType<
    A &
    UnwrapRef<S> &
    _StoreWithState<Id, S, _GettersTree<S>, A> &
    _StoreWithGetters<_GettersTree<S>> &
    PiniaCustomProperties
  >;

export type CreateGetters<S extends StateTree, G extends _GettersTree<S>> = G &
  ThisType<UnwrapRef<S> & _StoreWithGetters<G> & PiniaCustomProperties> &
  _GettersTree<S>;

declare module "pinia" {
  export interface PiniaCustomProperties {
    $router: Router;
  }
}
