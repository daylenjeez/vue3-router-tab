<template>
  <span>{{ $router.currentRoute.value.path }}</span>
  <span>{{ num }}</span>
  <button @click="click">
    click
  </button>
  <input type="text">
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  name:'FullPathPage',
  setup() {
    const num = ref(0);
    const click = () => {
      num.value++;
    };
    return { name: "page3", num, click };
  },
};
</script>
