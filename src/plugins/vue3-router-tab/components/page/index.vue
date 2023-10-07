<template>
  <div
    v-if="tab"
  >
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
import { useRouterTabStore } from "../../store";
import RtIframe from "./iframe";


export default defineComponent({
  name: "RtPages",
  components: { "rt-iframe": RtIframe },
  setup() {
    const tabStore = useRouterTabStore();

    const tab = computed(tabStore.getActiveTab);

    return {
      key:tab.value?.id,
      tab,
    };
  },
});
</script>
