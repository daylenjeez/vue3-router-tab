import { computed, markRaw, nextTick, reactive, VNode } from "vue";

// 创建一个包装器来存储 VNode
class VNodeWrapper {
  constructor(public vnode: VNode) {}
}

export const useCache = () => {
  const state = reactive<{
    keySet: Set<string>;
    //使用Map来存储VNodeWrapper
    keyToWrapper: Map<string, VNodeWrapper>;
    //使用WeakMap来存储VNodeWrapper和VNode之间的关系
    componentMap: WeakMap<VNodeWrapper, VNode>;
    refreshing: boolean;
    activeKey: string | undefined;
  }>({
    keySet: new Set<string>(),
    keyToWrapper: new Map(),
    componentMap: new WeakMap(),
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
    const wrapper = state.keyToWrapper.get(key);
    return wrapper ? state.componentMap.has(wrapper) : false;
  };

  const getComponent = (key: string) => {
    const wrapper = state.keyToWrapper.get(key);
    return wrapper ? state.componentMap.get(wrapper) : undefined;
  };

  const addComponent = (key: string, vNode: VNode) => {
    //创建新的包装器
    const wrapper = new VNodeWrapper(markRaw(vNode));
    //将key和包装器存储在keyToWrapper中
    state.keyToWrapper.set(key, wrapper);
    //将包装器和VNode存储在componentMap中
    state.componentMap.set(wrapper, vNode);
  };

  const remove = (key: string) => {
    state.keySet.delete(key);
    state.keyToWrapper.delete(key);
  };

  const reset = () => {
    state.keySet.clear();
    state.keyToWrapper.clear();
  };

  const refresh = async (key: string) => {
    const wrapper = state.keyToWrapper.get(key);
    const component = wrapper ? state.componentMap.get(wrapper) : undefined;

    if (wrapper && component) {
      //移除旧的映射
      state.keyToWrapper.delete(key);

      if (state.activeKey === key) {
        state.refreshing = true;
      }

      await nextTick();

      const newWrapper = new VNodeWrapper(markRaw(component));
      state.keyToWrapper.set(key, newWrapper);
      state.componentMap.set(newWrapper, component);

      if (state.activeKey === key) {
        state.refreshing = false;
      }
    }
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
