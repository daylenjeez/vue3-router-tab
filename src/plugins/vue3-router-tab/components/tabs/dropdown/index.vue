<template>
  <div v-if="visible" class="dropdown-menu" :style="{ top: position.y + 'px', left: position.x + 'px' }" @contextmenu="handleRightClick">
    <ul>
      <li @click="handleAction('action1')" >Action 1</li>
      <li @click="handleAction('action2')" >Action 2</li>
      <li @click="handleAction('action3')" >Action 3</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DropdownMenu',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    position: {
      type: Object as () => { x: number; y: number },
      required: true,
    },
  },
  setup() {
    const handleAction = (action: string) => {
      console.log(`Action selected: ${action}`);
    };

    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return {
      handleAction,
      handleRightClick
    };
  },
});
</script>

<style scoped>
.dropdown-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}
.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dropdown-menu li {
  padding: 8px 16px;
  cursor: pointer;
}
.dropdown-menu li:hover {
  background-color: #f5f5f5;
}
</style> 
