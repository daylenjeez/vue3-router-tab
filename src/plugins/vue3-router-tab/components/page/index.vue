<template>
  <div v-if="tab">
    {{ key }}
    <router-view v-slot="{ Component }">
      <template v-if="tab.keepAlive">
        <keep-alive>
          <component
            :is="Component"
            :key="key"
          />
        </keep-alive>
      </template>
      <template v-else>
        <component
          :is="Component"
        />
      </template>
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
