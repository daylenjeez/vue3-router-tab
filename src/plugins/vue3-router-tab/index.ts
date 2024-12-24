import type { App, Plugin } from "vue";
import type { RouteLocationNormalized, Router } from "vue-router";

import RouterTab from "./router-tab";
import { type RouterTabStore, useTabStore } from "./store";

/**
 * Add configuration during initialization
 * @property {Router} router
 */
interface Options {
	router: Router;
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
 * @param {Options} options
 */
const init = (app: App, options: Options) => {
	const { router } = options;
	const tabStore = useTabStore(router);
	app.provide("tabStore", tabStore);
	app.config.globalProperties.$tabStore = tabStore;
};

const RouterTabPlugin: Plugin = {
	install(app: App, options: Options) {
		init(app, options);
		app.component("RouterTab", RouterTab);
	},
};

export default RouterTabPlugin;
export { RouterTab };
