<script lang="ts">
import "./style/index.less";

import { useRouter } from "vue-router";

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
  <div
    class
    style="margin-bottom: 30px"
  >
    <button @click="() => handlePush('/')">
      首页
    </button>
    <button @click="() => handlePush('/path?id=1')">
      /path?id=1
    </button>
    <button @click="() => handlePush('/path?id=2')">
      /path?id=2
    </button>
    <button @click="() => handlePush('/fullpath?id=1')">
      /fullpath?id=1
    </button>
    <button @click="() => handlePush('/fullpath?id=2')">
      /fullpath?id=2
    </button>
    <router-tab />
  </div>
</template>
