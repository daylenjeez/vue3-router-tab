<template>
	<span>{{ $router.currentRoute.value.fullPath }}</span>
	<span>{{ num }}</span>
	<button @click="click">
		click
	</button>

	<input type="text">

	<button @click="openIframe">打开iframe</button>
</template>

<script lang="ts">
import { RouterTabStore } from "@routerTab/store";
import { inject, ref } from "vue";

export default {
	name: "PathPage",
	setup() {
		const store = inject<RouterTabStore>("tabStore");
		const num = ref(0);
		const click = () => {
			num.value++;
		};

		const openIframe = () => {
			store?.open(
				'/iframe',
				{
					tabConfig: {
						key: 'path',
						iframeAttributes: {
							src: 'https://www.baidu.com',
							width: '100%',
							height: '100%',
						}
					}
				}
			);
		};

		return { name: "page2", num, click, openIframe };
	},
};
</script>
