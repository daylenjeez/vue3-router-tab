<template>
  <span>{{ num }}</span>
  <button @click="click">click</button>
</template>

<script lang="ts">
import { ref } from "vue";

const num = ref(0);
const click = () => {
  num.value++;
};

export default {
  setup() {
    return { name: "page2", num, click };
  },
};
</script>
