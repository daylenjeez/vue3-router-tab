<template>
  <span>{{ $router.currentRoute.value.fullPath }}</span>
  <span>{{ num }}</span>
  <button @click="click">click</button>
  <input type="text" />
</template>

<script lang="ts">
import { onActivated, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

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
