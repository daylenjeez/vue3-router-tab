import { describe, it } from "vitest";
import { useRouterTab } from "..";
// import * as VueRouter from "vue-router";
// import routes from "../../../router/routes";
import App from "../../../App.vue";
import router from "../../../router";
import routerTab from "../";
import { createApp } from "vue";

describe("Vue3RouteTab Store", () => {
  const app = createApp(App);

  app.use(router);
  app.use(routerTab, { router });

  // let router;
  // beforeEach(async () => {
  //   router = VueRouter.createRouter({
  //     history: VueRouter.createWebHistory(),
  //     routes: routes,
  //   });

  //   router.push("/");
  //   await router.isReady();

  //   setActivePinia(createPinia());
  // });

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
