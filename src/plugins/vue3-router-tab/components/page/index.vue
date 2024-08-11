<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedKeys">
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
import { defineComponent, computed, watch, VNode, inject } from "vue";
import { renameComponentType } from "@routerTab/utils";
import { updateTabOnRouteChange } from "../..";
import { RouterTabStore } from "@routerTab/store";
import { useCache } from "@routerTab/store/cache";

export default defineComponent({
  name: "RtPages",
  setup() {
    const tabStore = inject<RouterTabStore>("tabStore")!;

    const cache = useCache();
    const activeTab = computed(() => tabStore.state.activeTab);
    const activeTabKey = computed(() => activeTab.value?.id);
    const refreshing = computed(() => cache.state.refreshing);

    const cachedKeys = computed(() => {
      const keys = cache.keys.value;

      return activeTab.value?.keepAlive
        ? keys
        : keys.filter((k) => k !== activeTabKey.value);
    });

    watch(
      tabStore.$router.currentRoute,
      (val) => updateTabOnRouteChange(val, tabStore),
      { immediate: true },
    );

    return {
      activeTabKey,
      cachedKeys,
      refreshing,
      retrieveOrCacheComponent: (Component: VNode) => {
        const key = activeTabKey.value;

        if (!Component || !key) return Component;
        if (cache.hasComponent(key)) return cache.getComponent(key);
        const renamedComponent = renameComponentType(Component, key);
        cache.addComponent(key, renamedComponent);
        cache.add(key);
        return cache.getComponent(key);
      },
    };
  },
});
</script>
@routerTab/store
