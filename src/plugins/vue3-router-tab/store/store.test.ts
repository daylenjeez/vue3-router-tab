import { setActivePinia, createPinia } from "pinia";
import { describe, it, beforeEach } from "vitest";
import { useRouterTab } from "..";
import * as VueRouter from "vue-router";
import routes from "../../../router/routes";

describe("Vue3RouteTab Store", () => {
  let router;
  beforeEach(async () => {
    router = VueRouter.createRouter({
      history: VueRouter.createWebHistory(),
      routes: routes,
    });

    router.push("/");
    await router.isReady();

    setActivePinia(createPinia());
  });

  it("increments", ({ expect }) => {
    const routeTab = useRouterTab();
    expect(routeTab).toBeDefined();
  });

  it("increments by amount", ({ expect }) => {
    const routeTab = useRouterTab();
    expect(routeTab.getTabs()).toEqual([]);
  });
});
