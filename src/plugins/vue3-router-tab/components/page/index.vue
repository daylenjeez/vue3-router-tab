<template>
  <div v-if="tab">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component
          :is="Component"
          v-if="tab.keepAlive"
          :key="key"
        />
      </keep-alive>
      <component
        :is="Component"
        v-if="!tab.keepAlive"
        :key="key"
      />
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouterTab } from "../../store";
import RtIframe from "./iframe";

export default defineComponent({
  name: "RtPages",
  components: { "rt-iframe": RtIframe },
  setup() {
    const tabStore = useRouterTab();
    const tab = computed(tabStore.getActiveTab);

    return {
      key: tab.value?.id,
      tab,
    };
  },
});
</script>
