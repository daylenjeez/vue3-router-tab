import { VNode, reactive, ref } from "vue";

export const useCache = () => {
  const keys = ref<string[]>([]);

  return reactive({
    keys,
    add(key: string) {
      if (!key) return;
      !keys.value.includes(key) && keys.value.push(key);
      return keys;
    },
    delete(key: string) {
      if (!key) return;
      keys.value = keys.value.filter(item => item !== key);
    },
    reset() {
      keys.value = [];
    }
  });
};

export const useComponent = (cache: ReturnType<typeof useCache>) => {
  const componentMap: Map<string, VNode> = new Map();
  return reactive({
    has(key: string) {
      return componentMap.has(key);
    },
    get(key: string) {
      return componentMap.get(key);
    },
    add(key: string, vNode: VNode) {
      componentMap.set(key, vNode);
      cache.add(key);
      return componentMap;
    },
    delete(key: string) {
      componentMap.delete(key);
      cache.delete(key);
      return componentMap;
    },
    reset() {
      componentMap.clear();
      cache.reset();
      return componentMap;
    }
  });
};
