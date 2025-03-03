import type { App, Plugin } from "vue";
import type { RouteLocationNormalized, Router } from "vue-router";

import RouterTab from "./router-tab";
import { type RouterTabStore, useTabStore } from "./store";

/**
 * Plugin initialization options
 */
interface PluginOptions {
	router: Router;
	maxCache?: number;
}

/**
 * Update the tab when the route changes
 * @param {RouteLocationNormalized} guard
 * @param {RouterTabStore} store
 */
export const updateTabOnRouteChange = (
	guard: RouteLocationNormalized,
	store: RouterTabStore,
) => {
	const tabId = store.getTabIdByRoute(guard);

	if (tabId && store.has(tabId)) {
		const tab = store.find(tabId);
		if (tab) store.setActive(tab);
	} else {
		const tab = store.createTab(guard);
		if (tab) store.addTab(tab, { setActive: true });
	}
};

/**
 * Init
 * @param {App} app
 * @param {PluginOptions} options
 */
const init = (app: App, options: PluginOptions) => {
	const { router } = options;
	const tabStore = useTabStore(router, options);
	app.provide("tabStore", tabStore);
	app.config.globalProperties.$tabStore = tabStore;
};

const RouterTabPlugin: Plugin = {
	install(app: App, options: PluginOptions) {
		init(app, options);
		app.component("RouterTab", RouterTab);
	},
};

export default RouterTabPlugin;
export { RouterTab };
