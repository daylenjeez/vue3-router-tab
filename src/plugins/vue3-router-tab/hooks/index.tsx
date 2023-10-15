import { reactive, ref } from "vue";

export const useCache = (currentKey?: string) => {
  // const keys: Ref<Set<string>> = ref(new Set<string>());
  const keys = ref<string[]>([]);

  return reactive({
    keys,
    add(key: string | undefined = currentKey) {
      if (!key) return;
      !keys.value.includes(key) && keys.value.push(key);
      return keys;
    },
    delete(key: string | undefined = currentKey) {
      if (!key) return;
      keys.value = keys.value.filter(item => item !== key);
    },
    reset() {
      keys.value = [];
    }
  });
};

export const useComponent = (cache: ReturnType<typeof useCache>, component: Map<string, VNode>) => {

};
