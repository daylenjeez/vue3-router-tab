import { Ref, reactive, ref } from "vue";

const useCache = (currentKey: string) => {
  const keys: Ref<Set<string>> = ref(new Set<string>());

  return reactive({
    keys: [...keys.value],
    add(key: string = currentKey) {
      keys.value.add(key);
    },
    delete(key: string = currentKey) {
      keys.value.delete(key);
    },
    reset() {
      keys.value.clear();
    }
  });
};

const useComponent = (cache: ReturnType<typeof useCache>, component: Map<string, VNode>) => {

};

export default useCache;
