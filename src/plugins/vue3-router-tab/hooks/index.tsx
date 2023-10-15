import { Ref, reactive, ref } from "vue";

const useCache = (currentKey: string) => {
  const keys: Ref<Set<string>> = ref(new Set<string>());

  return reactive({
    keys,
    add(key: string = currentKey) {
      if (!keys.value.has(key)) keys.value.add(key);
      return keys;
    },
    delete(key: string = currentKey) {
      keys.value.delete(key);
    }
  });
};

const useComponent = (cache: ReturnType<typeof useCache>, component: Map<string, VNode>) => { };

export default useCache;
