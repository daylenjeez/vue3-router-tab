<template>
  <span>{{ $router.currentRoute.value.path }}</span>
  <span>{{ num }}</span>
  <button @click="click">
    click
  </button>
  <input type="text">

  <button @click="closeOthers">
    close others
  </button>

  <button @click="refresh">
    refresh
  </button>
</template>

<script lang="ts">
import { inject, ref } from "vue";
import type { RouterTabStore } from "@routerTab/store";

export default {
  name: "FullPathPage",
  setup() {
    const store = inject<RouterTabStore>("tabStore");
    const num = ref(0);
    const click = () => {
      num.value++;
    };

    const refresh = () => {
      store?.refresh(store?.state.activeTab?.id);
    };

    const closeOthers = () => {
      store?.closeOthers(store?.state.activeTab?.id);
    };
    return { name: "page3", num, click, closeOthers, refresh };
  },
  deactivated() {
    console.log("FullPathPage deactivated");
  },
  activated() {
    console.log("FullPathPage activated");
  },
  unmounted() {
    console.log("FullPathPage unmouted");
  },
};
</script>
