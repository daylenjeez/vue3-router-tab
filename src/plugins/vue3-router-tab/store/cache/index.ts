import { StoreDefinition, defineStore } from "pinia";
import { CreateActions, CreateGetters } from "../type";
import { VNode } from "vue";

interface State {
  componentMap: Map<string, VNode>;
}

type Getters = CreateGetters<State, {
  keys: (state: State) => string[];
}>;

type Actions = CreateActions<
  string,
  State,
  {
    has(key: string): boolean;
    get(key: string): VNode | undefined;
    add(key: string, vNode: VNode): void;
    delete(key: string): void;
    reset(): void;
  }>

export type UseCache = StoreDefinition<string, State, Getters, Actions>;

export const useCache: UseCache = defineStore("cache", {
  state: (): State => ({ componentMap: new Map<string, VNode>() }),
  getters: { keys: (state: State) => Array.from(state.componentMap.keys()) },
  actions: {
    has(key: string) {
      return this.componentMap.has(key);
    },
    get(key: string) {
      return this.componentMap.get(key);
    },
    add(key: string, vNode: VNode) {
      this.componentMap.set(key, vNode);
    },
    delete(key: string) {
      this.componentMap.delete(key);
    },
    reset() {
      this.componentMap.clear();
    }
  },
});
