<template>
	<span>{{ $router.currentRoute.value.fullPath }}</span>
	<span>{{ num }}</span>
	<button @click="click">
		click
	</button>

	<input type="text">
</template>

<script lang="ts">
import { ref } from "vue";

export default {
	name: "PathPage",
	setup() {
		const num = ref(0);
		const click = () => {
			num.value++;
		};


		return { name: "page2", num, click };
	},
};
</script>
