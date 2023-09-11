import { describe, it } from "vitest";
import { useRouterTab } from "..";
import App from "../../../App.vue";
import router from "../../../router";
import routerTab from "../";
import { createApp } from "vue";

describe("Vue3RouteTab Store", () => {
  const app = createApp(App);

  app.use(router);
  app.use(routerTab, { router });

  it("increments", ({ expect }) => {
    const routeTab = useRouterTab();
    expect(routeTab).toBeDefined();
  });

  it("increments by amount", ({ expect }) => {
    const routeTab = useRouterTab();
    expect(routeTab.getTabs()).toEqual([
      {
        fullPath: "/",
        id: "/",
        keepAlive: true,
        name: "/",
      },
    ]);
  });
});
