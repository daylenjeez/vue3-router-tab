<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive
        :include="keys"
      >
        <component
          :is="handleComponent(Component)"
          :key="key"
        />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch,VNode, } from "vue";
import { useRouterTab, useRouterTabStore } from "../../store";
import {useCache} from  "../../hooks";
import {renameComponentType} from "../renameComponent";
import { useRouter } from "vue-router";
import { handleBeforeEachRoute } from "../..";

export default defineComponent({
  name: "RtPages",
  setup() {
    const componentMap: Map<string,VNode> = new Map();
    const tabStore = useRouterTab();
    const router = useRouter();
    const tab = computed(tabStore.getActiveTab);
    const key = computed(() => tab.value?.id);
    const cache = useCache(key.value);
    const keys = computed(() => {
      const keys = cache.keys;
      return tab.value?.keepAlive ? keys : keys.filter(k => k !== key.value);
    });

    watch(
      router.currentRoute,
      async val => {
        const store = useRouterTabStore();
        handleBeforeEachRoute(val, store);
        key.value && cache.add(key.value);
      },
      { immediate: true }
    );

    return {
      key,
      keys,
      tab,
      handleComponent: (Component: VNode) =>  {
        if (!Component || !key.value) return Component;

        if (componentMap.has(key.value)) return componentMap.get(key.value);
        const renamedComponent = renameComponentType(Component, key.value);
        componentMap.set(key.value, renamedComponent);

        return renamedComponent;
      },
    };
  },

});
</script>
