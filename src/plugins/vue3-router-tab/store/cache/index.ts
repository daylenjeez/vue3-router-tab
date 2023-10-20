import { StoreDefinition, defineStore } from "pinia";
import { CreateActions, CreateGetters } from "../type";
import { VNode, nextTick } from "vue";

interface State {
  keySet: Set<string>;
  componentMap: Map<string, VNode>;
  refreshing: boolean;
  activeKey: string | undefined;
}

type Getters = CreateGetters<State, {
  keys: (state: State) => string[];
}>;

type Actions = CreateActions<
  string,
  State,
  {
    setActiveKey(key: string | undefined): void;
    has(key: string): boolean;
    add(key: string): void;
    getComponent(key: string): VNode | undefined;
    hasComponent(key: string): boolean;
    addComponent(key: string, vNode: VNode): void;
    delete(key: string): void;
    reset(): void;
    refresh(key: string): void;
  }>

export type UseCache = StoreDefinition<string, State, Getters, Actions>;

export const useCache: UseCache = defineStore("cache", {
  state: (): State => ({ keySet: new Set<string>(), componentMap: new Map<string, VNode>(), refreshing: false, activeKey: undefined, }),
  getters: { keys: (state: State) => [...state.keySet] },
  actions: {
    setActiveKey(key: string | undefined) {
      this.activeKey = key;
    },
    add(key: string) {
      this.keySet.add(key);
    },
    has(key: string) {
      return this.keySet.has(key);
    },
    hasComponent(key: string) {
      return this.componentMap.has(key);
    },
    getComponent(key: string) {
      return this.componentMap.get(key);
    },
    addComponent(key: string, vNode: VNode) {
      this.componentMap.set(key, vNode);
    },
    delete(key: string) {
      this.keySet.delete(key);
      this.componentMap.delete(key);
    },
    reset() {
      this.keySet.clear();
      this.componentMap.clear();
    },
    refresh(key: string) {
      const component = this.componentMap.get(key);
      this.componentMap.delete(key);
      if (this.activeKey === key) this.refreshing = true;
      nextTick(() => {
        this.componentMap.set(key, component!);
        if (this.activeKey === key) this.refreshing = false;
      });
    }
  },
});


export type CacheType = ReturnType<typeof useCache>;
