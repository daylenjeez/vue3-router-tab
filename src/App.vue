<script lang="ts">
import { useRouter } from "vue-router";
import "./style/index.less";

export default {
  setup() {
    const router = useRouter();
    return {
      handlePush(value: string) {
        router.push(value);
      },
    };
  },
};
</script>

<template>
  <div style="margin-bottom: 30px">
    <button @click="() => handlePush('/home')">首页</button>
    <button @click="() => handlePush('/page1?id=1')">/page1?id=1</button>
    <button @click="() => $router.push({ path: '/page1' })">/page1?id=2</button>
    <button @click="() => handlePush('/page2/2')">/page2/2</button>
    <button @click="() => handlePush('/page2/3')">/page2/3</button>
    <router-tab />
  </div>
</template>
