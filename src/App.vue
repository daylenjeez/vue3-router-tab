<script lang="ts">
import { useRouter } from "vue-router";
import "./style/index.less";

export default{
  setup() {
    const router = useRouter();
    return {
      handlePush(value:string){
        router.push(value);
      }
    };
  }
};

</script>

<template>
  <div>
    <button @click="()=>handlePush('/home')">
      首页
    </button>
    <button @click="()=>handlePush('/page1?id=asdb')">
      page1
    </button>
    <button @click="()=>handlePush('/page2/jikjk')">
      page2
    </button>
  </div>
  <RouterTab />
</template>
