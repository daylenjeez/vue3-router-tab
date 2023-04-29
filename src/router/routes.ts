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
        name: "页面1",
        path: "/page1",
        component: () => import("../views/first.vue"),
        meta: {
          tabConfig: {
            key: "fullPath",
          },
        },
      },
      {
        name: "页面2",
        path: "/page2/:id",
        component: () => import("../views/second.vue"),
        meta: {},
      },
    ],
  },
];

export default routes;
