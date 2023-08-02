import { RouteLocationNormalized, Router, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    // component: () => import("../components/frame"),
    children: [
      {
        name: "主页",
        path: "/",
        component: () => import("../views/home.vue"),
        meta: {
          tabConfig: {
            key: (router: RouteLocationNormalized) => {
              return router.fullPath;
            },
          },
        },
      },
      {
        name: "列表",
        path: "/list",
        component: () => import("../views/first.vue"),
        meta: {
          tabConfig: {
            isIframe: true,
          },
        },
      },
      {
        name: "详情页",
        path: "/detail/:id",
        component: () => import("../views/second.vue"),
        meta: {
          tabConfig: {
            key: (router: RouteLocationNormalized) => {
              return router.fullPath;
            },
          },
        },
      },
    ],
  },
];

export default routes;
