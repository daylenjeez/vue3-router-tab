import { beforeEach, describe, expectTypeOf, it } from "vitest";
import { Tab } from "../../types";
import { Close, CloseOthers, GetTabs, Open } from "../../store/routerTab/type/actions";
import { beforeEachFn } from "../unit";
import { useRouterTab } from "../../store/routerTab";

describe("init", () => {
  beforeEach(async () => {
    await beforeEachFn();
  });

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
