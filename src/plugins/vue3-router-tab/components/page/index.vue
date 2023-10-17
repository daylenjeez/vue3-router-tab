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
import { useRouterTab,useCache } from "../../store";
import {renameComponentType} from "../renameComponent";
import { useRouter } from "vue-router";
import { updateTabOnRouteChange } from "../..";

export default defineComponent({
  name: "RtPages",
  setup() {
    const routerTab = useRouterTab();
    const router = useRouter();
    const cache = useCache();
    const activeTab = computed(()=>routerTab.activeTab);
    const activeTabKey = computed(() => activeTab.value?.id);

    const cachedKeys = computed(() => {
      const keys = cache.keys;
      return activeTab.value?.keepAlive ? keys : keys.filter(k => k !== activeTabKey.value);
    });

    watch(
      router.currentRoute,
      async val => {
        updateTabOnRouteChange(val, routerTab);
      },
      { immediate: true }
    );

    return {
      activeTabKey,
      cachedKeys,
      getOrRenameComponent: (Component: VNode) =>  {
        const _key = activeTabKey.value;
        if (!Component || !_key) return Component;

        if (cache.has(_key)) return cache.get(_key);
        const renamedComponent = renameComponentType(Component, _key);
        cache.add(_key, renamedComponent);
        return cache.get(_key);
      },
    };
  },

});
</script>
