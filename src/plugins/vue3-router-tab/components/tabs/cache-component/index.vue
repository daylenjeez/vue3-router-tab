<template>
  <component
    :is="Component"
    :key="key"
  />
</template>
<script lang="ts">
import { defineComponent, PropType, VNode } from "vue";

export default defineComponent({
  name: "RtPages",
  props:{
    componentKey:{
      type:String as PropType<String>,
      required:true
    },
    component: {
      type: Object as PropType<VNode>,
      required: true,
    }
  },
  setup(props) {
    const componentMap = new Map<string,VNode>();
    return {Component:props.component,key:props.componentKey};
  },
});
</script>
