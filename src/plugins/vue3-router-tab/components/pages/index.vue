<template>
  <div :class="Style['rt-pages']">
    {}
    <RouterView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="key" />
      </keep-alive>
    </RouterView>
  </div>
</template>
<script lang="ts">
import { defineComponent, KeepAlive, computed } from "vue";
import { useRouterTabStore } from "../../store";
import { useRouter } from "vue-router";

import Style from "./style.module.less";

export default defineComponent({
  name: "RtPages",
  setup() {
    const tabStore = useRouterTabStore();
    const vueRouter = useRouter();
    const key = computed(() =>
      tabStore.getTabIdByRoute(vueRouter.currentRoute.value)
    );
    const tab = computed(() => tabStore.getTab(key.value));

    return {
      Style,
      key,
    };
  },
});
</script>
