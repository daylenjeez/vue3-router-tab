import { RouteLocationNormalized, Router, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../components/frame"),
    children: [
      {
        name: "home",
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
        name: "page1",
        path: "/page1",
        component: () => import("../views/first.vue"),
        meta: {},
      },
      {
        name: "page2",
        path: "/page2/:id",
        component: () => import("../views/second.vue"),
        meta: {},
      },
    ],
  },
];

export default routes;
