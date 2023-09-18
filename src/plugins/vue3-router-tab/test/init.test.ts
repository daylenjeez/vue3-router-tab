import { describe, it } from "vitest";
import { useRouterTab } from "..";
import App from "../../../App.vue";
import router from "../../../router";
import routerTab from "..";
import { createApp } from "vue";

describe("init", () => {
  const app = createApp(App);

  app.use(router);
  app.use(routerTab, { router });

  it("router-tab is defined", ({ expect }) => {
    const routeTab = useRouterTab();
    expect(routeTab).toBeDefined();
  });
  

  it("initial tab is home", ({ expect }) => {
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
