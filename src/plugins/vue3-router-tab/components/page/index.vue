<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive
        :include="cachedKeys"
      >
        <component
          :is="getOrRenameComponent(Component)"
          :key="activeTabKey"
        />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch,VNode, } from "vue";
import { useRouterTab } from "../../store";
import {useCache} from  "../../hooks";
import {renameComponentType} from "../renameComponent";
import { useRouter } from "vue-router";
import { updateTabOnRouteChange } from "../..";

export default defineComponent({
  name: "RtPages",
  setup() {
    const componentMap: Map<string,VNode> = new Map();
    const routerTab = useRouterTab();
    const router = useRouter();
    const activeTab = computed(()=>routerTab.activeTab);
    const activeTabKey = computed(() => activeTab.value?.id);
    const cache = useCache(activeTabKey.value);
    const cachedKeys = computed(() => {
      const keys = cache.keys;
      return activeTab.value?.keepAlive ? keys : keys.filter(k => k !== activeTabKey.value);
    });

    watch(
      router.currentRoute,
      async val => {
        updateTabOnRouteChange(val, routerTab);
        activeTabKey.value && cache.add(activeTabKey.value);
      },
      { immediate: true }
    );

    return {
      activeTabKey,
      cachedKeys,
      getOrRenameComponent: (Component: VNode) =>  {
        const _key = activeTabKey.value;
        if (!Component || !_key) return Component;

        if (componentMap.has(_key)) return componentMap.get(_key);
        const renamedComponent = renameComponentType(Component, _key);
        return componentMap.set(_key, renamedComponent).get(_key);
      },
    };
  },

});
</script>
