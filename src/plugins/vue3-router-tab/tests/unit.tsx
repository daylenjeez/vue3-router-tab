import { mount } from "@vue/test-utils";
import { ExpectStatic } from "vitest";
import {
  createMemoryHistory,
  createRouter,
  RouteLocationNormalized,
  Router,
} from "vue-router";

import RouterTabPlugin from "..";
import { RouterTabType, useRouterTabStore } from "../store";
import { useCache } from "../store";
import { CacheType } from "../store/cache";

// 创建一个内存路由
const history = createMemoryHistory();
export const getRouter = () =>
  createRouter({
    history,
    routes: [
      { path: "/", component: () => import("./pages/home"), name: "home" },
      {
        path: "/initial",
        component: () => import("./pages/initial"),
        name: "initial",
      },
      {
        path: "/path",
        component: () => import("./pages/path"),
        name: "path",
        meta: { tabConfig: { key: "path" } },
      },
      {
        path: "/pathWithParams/:id",
        component: () => import("./pages/pathWithParams"),
        name: "pathWithParams",
        meta: { tabConfig: { key: "path" } },
      },
      {
        path: "/fullpath",
        component: () => import("./pages/fullpath"),
        name: "fullpath",
        meta: { tabConfig: { key: "fullPath" } },
      },
      {
        path: "/fullpathWithParams/:id",
        component: () => import("./pages/fullpathWithParams"),
        name: "fullpathWithParams",
        meta: { tabConfig: { key: "fullPath" } },
      },
      {
        path: "/custom",
        component: () => import("./pages/custom"),
        name: "custom",
        meta: {
          tabConfig: {
            key: (router: RouteLocationNormalized) => {
              const { path, query } = router;
              return `${path}?id=${query.id}`;
            },
          },
        },
      },
      {
        path: "/customWithParams/:id",
        component: () => import("./pages/customWithParams"),
        name: "customWithParams",
        meta: {
          tabConfig: {
            key: () => {
              return "/customWithParams";
            },
          },
        },
      },
      {
        path: "/noKeepAlivePath",
        component: () => import("./pages/noKeepAlive"),
        name: "noKeepAlive",
        meta: { tabConfig: { keepAlive: false } },
      },
      {
        path: "/keepAlivePath",
        component: () => import("./pages/keepAlive"),
        name: "keepAlive",
      },
    ],
  });

export const getWrapper = (router: Router) =>
  mount(
    {
      render() {
        return (
          <div>
            <router-tab />
          </div>
        );
      },
    },
    { global: { plugins: [router, [RouterTabPlugin, { router }]] } },
  );

export const beforeEachFn = async () => {
  const router = getRouter();
  const wrapper = await getWrapper(router);
  const cache = useCache();
  useRouterTabStore()._clear();

  return {
    router,
    routerTab,
    wrapper,
    cache,
  };
};

export const afterEachFn = async ({wrapper,}: {
  routerTab: RouterTabType;
  wrapper: any;
}) => {
  useRouterTabStore()._clear();
  wrapper.unmount();
};

export const sameLength = (cache: CacheType, routerTab: RouterTabType) => {
  return (expect: ExpectStatic, length: number) => {
    expect(cache.keys).length(length);
    expect(routerTab.tabs).length(length);
  };
};
