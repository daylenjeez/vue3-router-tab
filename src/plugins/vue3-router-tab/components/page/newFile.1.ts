import { defineComponent, computed, watch, VNode } from "vue";
import { useRouterTab, useRouterTabStore } from "../../store";
import { useCache } from "../../hooks";
import { renameComponentType } from "../renameComponent";
import { useRouter } from "vue-router";
import { before } from "./index.vue";

export default defineComponent({
  name: "RtPages",
  setup() {
    const componentMap: Map<string, VNode> = new Map();
    const tabStore = useRouterTab();
    const tab = computed(tabStore.getActiveTab);
    const key = computed(() => tab.value?.id);
    const cache = useCache(key.value);
    const router = useRouter();

    watch(
      router.currentRoute,
      async (val) => {
        const store = useRouterTabStore();
        handleBeforeEachRoute(val, store);
        key.value && cache.add(key.value);
      },
      { immediate: true }
    );

    return {
      key,
      keys: cache.keys,
      tab,
      handleComponent: (Component: VNode) => {
        console.log(43, key.value, Component?.type?.name);

        if (!Component || !key.value) return Component;
        if (before == Component) {
          console.log('xiangdeng');

          return Component;
        } else {
          before = Component;
        }

        if (componentMap.has(key.value)) return componentMap.get(key.value);
        const renamedComponent = renameComponentType(Component, key.value);
        componentMap.set(key.value, renamedComponent);

        return Component;
      },
    };
  },
});
