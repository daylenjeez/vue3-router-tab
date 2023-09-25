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

  it("should return tabs of type Tab[] from useRouterTab", () => {
    const routeTab = useRouterTab();
    expectTypeOf(routeTab.tabs).toEqualTypeOf<Tab[]>();
  });

  it("should return getTabs of type GetTabs from useRouterTab", () => {
    const routeTab = useRouterTab();
    expectTypeOf(routeTab.getTabs).toEqualTypeOf<GetTabs>();
  });

  it("should return close of type Close from useRouterTab", () => {
    const routeTab = useRouterTab();
    expectTypeOf(routeTab.close).toEqualTypeOf<Close>();
  });

  it("should return closeOthers of type CloseOthers from useRouterTab", () => {
    const routeTab = useRouterTab();
    expectTypeOf(routeTab.closeOthers).toEqualTypeOf<CloseOthers>();
  });

  it("should return open of type Open from useRouterTab", () => {
    const routeTab = useRouterTab();
    expectTypeOf(routeTab.open).toEqualTypeOf<Open>();
  });

  it("should have tabs property equal to the result of getTabs method", ({expect}) => {
    const routeTab = useRouterTab();
    expect(routeTab.tabs).to.equal(routeTab.getTabs());
  });
});
