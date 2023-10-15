<template>
  <div v-if="tab">
    <router-view v-slot="{ Component }">
      <keep-alive>
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
import { defineComponent, computed, watch,VNode, } from "vue";
import { useRouterTab } from "../../store";
import {useCache} from  "../../hooks";
import {  renameComponentType } from "../renameComponent";

export default defineComponent({
  name: "RtPages",
  setup() {
    const componentMap: Map<string,VNode> = new Map();
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
