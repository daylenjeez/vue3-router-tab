import { StoreDefinition, defineStore } from "pinia";
import { CreateActions, CreateGetters } from "../type";
import { VNode, nextTick } from "vue";

interface State {
  componentMap: Map<string, VNode>;
  refreshing: boolean;
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
    refresh(key: string): void;
  }>

export type UseCache = StoreDefinition<string, State, Getters, Actions>;

export const useCache: UseCache = defineStore("cache", {
  state: (): State => ({ componentMap: new Map<string, VNode>(), refreshing: false }),
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
    },
    refresh(key: string) {
      const component = this.componentMap.get(key);
      this.componentMap.delete(key);
      this.refreshing = true;
      nextTick(() => {
        this.componentMap.set(key, component!);
        this.refreshing = false;
      });
    }
  },
});
