<script lang="ts">
import { useRouter } from "vue-router";
import "./style/index.less";

export default{
  setup() {
    const router = useRouter();
    return {
      handlePush(name:string){
        
        router.push({name});
      }
    };
  }
};

</script>

<template>
  <div>
    <button @click="()=>handlePush('home')">
      首页
    </button>
    <button @click="()=>handlePush('page1')">
      page1
    </button>
    <button @click="()=>handlePush('page2')">
      page2
    </button>
  </div>
  <RouterTab />
</template>
