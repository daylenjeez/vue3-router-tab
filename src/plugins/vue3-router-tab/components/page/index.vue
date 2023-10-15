<template>
  <div v-if="tab">
    {{ keys }}|{{ key }}
    <router-view v-slot="{ Component }">
      <keep-alive :include="keys">
        <component
          :is="handleComponent(Component)"
          v-if="tab.keepAlive"
          :key="key"
        />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch, ComponentInternalInstance } from "vue";
import { useRouterTab } from "../../store";
import {useCache} from  "../../hooks";

export default defineComponent({
  name: "RtPages",
  setup() {
    const componentMap: Map<string,ComponentInternalInstance> = new Map();
    const tabStore = useRouterTab();
    const tab = computed(tabStore.getActiveTab);
    const key = computed(() => tab.value?.id);
    const cache = useCache(key.value);

    watch(
      key,
      val => {
        val && cache.add(val);
      },
      { immediate: true }
    );


    return {
      key,
      keys:cache.keys,
      tab,
      handleComponent: (Component: any) => {
        
        if (!Component || !key.value) return void 0;
        
        if (componentMap.has(key.value)) return componentMap.get(key.value);
        componentMap.set(key.value, {...Component, type: { ...Component.type, name: key.value }});
        return Component;
      },
    };
  },

});
</script>
