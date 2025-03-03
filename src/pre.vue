<template>
  <!-- <div class="tab-prefix"> -->
  <!-- <span>📌</span> -->
  <!-- </div> -->
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { Tab } from "@routerTab/types";

export default {
  name: "Pre",
  props: {
    tab: {
      type: Object as PropType<Tab>,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
.tab-prefix {
  display: inline-flex;
  align-items: center;
  margin-right: 5px;
  color: var(--tab-color, #666);
}
</style>
