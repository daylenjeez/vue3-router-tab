import { StoreDefinition, defineStore } from "pinia";
import { CreateActions, CreateGetters } from "../type";
import { VNode, nextTick } from "vue";

interface State {
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
    has(key: string): boolean;
    get(key: string): VNode | undefined;
    add(key: string, vNode: VNode): void;
    delete(key: string): void;
    reset(): void;
    refresh(key: string): void;
    setActiveKey(key: string|undefined):void;
  }>

export type UseCache = StoreDefinition<string, State, Getters, Actions>;

export const useCache: UseCache = defineStore("cache", {
  state: (): State => ({ componentMap: new Map<string, VNode>(), refreshing: false,activeKey:undefined, }),
  getters: { keys: (state: State) => Array.from(state.componentMap.keys()) },
  actions: {
    setActiveKey(key: string|undefined) {
      this.activeKey = key;
    },
    has(key: string) {
      return this.componentMap.has(key);
    },
    get(key: string) {
      return this.componentMap.get(key);
    },
    add(key: string, vNode: VNode) {
      console.log('add',key);
      
      this.componentMap.set(key, vNode);
    },
    delete(key: string) {
      console.log('delete',key);
      this.componentMap.delete(key);
    },
    reset() {
      this.componentMap.clear();
    },
    refresh(key: string) {
      const component = this.componentMap.get(key);
      this.componentMap.delete(key);
      if(this.activeKey === key)this.refreshing = true;
      nextTick(() => {
        this.componentMap.set(key, component!);
        if(this.activeKey === key)this.refreshing = false;
      });
    }
  },
});


export type CacheType = ReturnType<typeof useCache>;
