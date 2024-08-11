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
import { RouterTabStore } from "@routerTab/store";
import { inject, ref } from "vue";

export default {
  name:'FullPathPage',
  setup() {
    const store = inject<RouterTabStore>('tabStore')!;
    const num = ref(0);
    const click = () => {
      num.value++;
    };

    const closeOthers = () => {
      store.closeOthers(store.state.activeTab?.id);
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
