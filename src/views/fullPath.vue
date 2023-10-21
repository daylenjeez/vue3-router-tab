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
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouterTab } from "../plugins/vue3-router-tab";

export default {
  name:'FullPathPage',
  setup() {
    const num = ref(0);
    const click = () => {
      num.value++;
    };

    const closeOthers = () => {
      const routerTab = useRouterTab();
      routerTab.closeOthers(routerTab.activeTab?.id);
    };
    return { name: "page3", num, click,closeOthers };
  },
  deactivated(){
    console.log('FullPathPage deactivated');
  },
  activated(){
    console.log('FullPathPage activated');
  },
  unmounted(){
    console.log('FullPathPage unmouted');
  }
};
</script>
