import { StoreDefinition, defineStore } from "pinia";
import { CreateActions, CreateGetters } from "../type";
import { VNode } from "vue";

interface State {
  keSet: Set<string>;
  componentMap: Map<string, VNode>;
}

type Getters = CreateGetters<State, {
  keys: (state: State) => string[];
}>;

type Actions = CreateActions<
  string,
  State,
  {
    addKey(key: string): void;
    hasKey(key: string): boolean;
    deleteKey(key: string): void;
    resetKeySet(): void;

    has(key: string): boolean;
    get(key: string): VNode | undefined;
    add(key: string, vNode: VNode): void;
    delete(key: string): void
    reset(): void;
  }>

export type UseCache = StoreDefinition<string, State, Getters, Actions>;

export const useCache: UseCache = defineStore("cache", {
  state: (): State => ({ keSet: new Set(), componentMap: new Map<string, VNode>() }),
  getters: { keys: (state: State) => Array.from(state.keSet) },
  actions: {
    addKey(key: string) {
      this.keSet.add(key);
    },
    deleteKey(key: string) {
      this.keSet.delete(key);
    },
    resetKeySet() {
      this.keSet.clear();
    },
    hasKey(key: string) {
      return this.componentMap.has(key);
    },

    has(key: string) {
      return this.componentMap.has(key);
    },
    get(key: string) {
      return this.componentMap.get(key);
    },
    add(key: string, vNode: VNode) {
      this.componentMap.set(key, vNode);
      this.addKey(key);
    },
    delete(key: string) {
      this.componentMap.delete(key);
      this.deleteKey(key);
    },
    reset() {
      this.componentMap.clear();
      this.resetKeySet();
    }
  },
});
