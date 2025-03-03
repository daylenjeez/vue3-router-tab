<script lang="ts">
import "./style/index.less";

import { useRouter } from "vue-router";
import Pre from "./pre.vue";

export default {
  components: {
    Pre
  },
  setup() {
    const router = useRouter();

    return {
      handlePush(value: string) {
        router.push(value);
      },
      Pre
    };
  },
};
</script>

<template>
  <div class>
    <div style="margin-bottom: 15px;">
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
    </div>
    <router-tab :tab-prefix="Pre"
                tab-type="card" />
  </div>
</template>
