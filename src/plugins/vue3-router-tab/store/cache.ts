import { computed, nextTick, reactive, VNode } from "vue";

export const useCache = () => {
  const state = reactive<{
    keySet: Set<string>;
    componentMap: Map<string, VNode>;
    refreshing: boolean;
    activeKey: string | undefined;
  }>({
    keySet: new Set<string>(),
    componentMap: new Map<string, VNode>(),
    refreshing: false,
    activeKey: void 0,
  });

  const keys = computed(() => Array.from(state.keySet));

  const setActiveKey = (key: string | undefined) => {
    state.activeKey = key;
  };

  const add = (key: string) => {
    state.keySet.add(key);
  };

  const has = (key: string) => {
    return state.keySet.has(key);
  };

  const hasComponent = (key: string) => {
    return state.componentMap.has(key);
  };

  const getComponent = (key: string) => {
    return state.componentMap.get(key);
  };

  const addComponent = (key: string, vNode: VNode) => {
    state.componentMap.set(key, vNode);
  };

  const remove = (key: string) => {
    state.keySet.delete(key);
    state.componentMap.delete(key);
  };

  const reset = () => {
    state.keySet.clear();
    state.componentMap.clear();
  };

  const refresh = async (key: string) => {
    const component = state.componentMap.get(key);
    state.componentMap.delete(key);
    if (state.activeKey === key) state.refreshing = true;

    await nextTick();

    state.componentMap.set(key, component!);
    if (state.activeKey === key) state.refreshing = false;
  };

  return {
    state,
    keys,
    setActiveKey,
    add,
    has,
    hasComponent,
    getComponent,
    addComponent,
    remove,
    reset,
    refresh,
  };
};

export type Cache = ReturnType<typeof useCache>;

