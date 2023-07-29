<template>
  <div v-if="tab" :class="Style['rt-pages']">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="key" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, KeepAlive, computed } from "vue";
import { useRouter } from "vue-router";
import { useRouterTabStore } from "../../store";
import RtIframe from "./iframe";

import Style from "./style.module.less";

export default defineComponent({
  name: "rt-Pages",
  components: {
    "rt-iframe": RtIframe,
  },
  setup() {
    const tabStore = useRouterTabStore();
    const vueRouter = useRouter();

    const key = computed(() =>
      tabStore._getTabIdByRoute(vueRouter.currentRoute.value)
    );
    const tab = computed(() => tabStore._getTab(key.value));

    return {
      Style,
      key,
      tab,
    };
  },
});
</script>
