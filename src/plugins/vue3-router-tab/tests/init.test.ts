import { describe, expectTypeOf, it } from "vitest";
import { useRouterTab } from "..";
import App from "../../../App.vue";
import router from "../../../router";
import routerTab from "..";
import { createApp } from "vue";
import { Tab } from "../types";
import { Close, CloseOthers, GetTabs, Open } from "../store/type/actions";

describe("init", () => {
  const app = createApp(App);

  app.use(router);
  app.use(routerTab, { router });

  it("router-tab is defined", ({ expect }) => {
    const routeTab = useRouterTab();
    expect(routeTab).toBeDefined();
  });

  it("should have 'tabs' property of type Tab[] in useRouterTab", () => {
    const routeTab = useRouterTab();
    expectTypeOf(routeTab.getTabs()).toEqualTypeOf<Tab[]>();
  });

  it("should have 'getTabs' property of type GetTabs in useRouterTab", () => {
    const routeTab = useRouterTab();
    expectTypeOf(routeTab.getTabs).toEqualTypeOf<GetTabs>();
  });

  it("should have 'close' property of type Close in useRouterTab", () => {
    const routeTab = useRouterTab();
    expectTypeOf(routeTab.close).toEqualTypeOf<Close>();
  });

  it("should have 'closeOthers' property of type CloseOthers in useRouterTab", () => {
    const routeTab = useRouterTab();
    expectTypeOf(routeTab.closeOthers).toEqualTypeOf<CloseOthers>();
  });

  it("should have 'open' property of type Open in useRouterTab", () => {
    const routeTab = useRouterTab();
    expectTypeOf(routeTab.open).toEqualTypeOf<Open>();
  });

});
