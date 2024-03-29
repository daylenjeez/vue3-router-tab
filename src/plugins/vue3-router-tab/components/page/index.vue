<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive
        :include="cachedKeys"
      >
        <component
          :is="retrieveOrCacheComponent(Component)"
          v-if="!refreshing"
          :key="activeTabKey"
        />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch,VNode, } from "vue";
import { useRouterTabStore,useCache } from "@routerTab/store";
import { renameComponentType } from "@routerTab/utils";
import { updateTabOnRouteChange } from "../..";

export default defineComponent({
  name: "RtPages",
  setup() {
    const routerTab = useRouterTabStore();
    
    const cache = useCache();
    const activeTab = computed(()=>routerTab.activeTab);
    const activeTabKey = computed(() => activeTab.value?.id);
    const refreshing = computed(() => cache.refreshing);

    const cachedKeys = computed(() => {
      const keys = cache.keys;
      return activeTab.value?.keepAlive ? keys : keys.filter(k => k !== activeTabKey.value);
    });

    watch(
      routerTab.$router.currentRoute,
      val => updateTabOnRouteChange(val, routerTab),
      { immediate: true }
    );

    return {
      activeTabKey,
      cachedKeys,
      refreshing,
      retrieveOrCacheComponent: (Component: VNode) =>  {
        const key = activeTabKey.value;
        if (!Component || !key) return Component;
        if (cache.hasComponent(key)) return cache.getComponent(key);
        const renamedComponent = renameComponentType(Component, key);
        cache.addComponent(key, renamedComponent);
        return cache.getComponent(key);
      },
    };
  },

});
</script>
