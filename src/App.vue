<script lang="ts">
import { useRouter } from "vue-router";
import { useRouterTab } from "./plugins/vue3-router-tab";
import "./style/index.less";



export default {
  setup() {
    const router = useRouter();
    const routerTab = useRouterTab();

    return {
      handlePush(value: string) {
        router.push(value);
      },
    };
  },
};
</script>

<template>
  <div
    class
    style="margin-bottom: 30px"
  >
    <button @click="() => handlePush('/home')">
      首页
    </button>
    <button @click="() => handlePush('/list?id=1')">
      用户列表+query
    </button>
    <button @click="() => handlePush('/list?id=2')">
      用户列表+query
    </button>
    <button @click="() => handlePush('/detail/2')">
      用户详情+params2
    </button>
    <button @click="() => handlePush('/detail/3')">
      用户详情+params3
    </button>
    <router-tab />
  </div>
</template>
