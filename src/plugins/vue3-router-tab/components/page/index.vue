<template>
  <div
    v-if="tab"
  >
    {{ key }}
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component
          :is="Component"
          :key="key"
        />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import {  useRouterTab } from "../../store";
// import RtIframe from "./iframe";


export default defineComponent({
  name: "RtPages",
  // components: { "rt-iframe": RtIframe },
  setup() {
    const tabStore = useRouterTab();
    
    const tab = computed(tabStore.getActiveTab);
    
    return {
      key:tab.value?.id,
      tab,
    };
  },
});
</script>