import { RouteLocationNormalized, Router, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../components/frame"),
    children: [
      {
        name: "首页",
        path: "/",
        component: () => import("../views/Home.vue"),
        meta: {
          tabConfig: {
            key: (router: RouteLocationNormalized) => {
              console.log(router);

              return router.fullPath;
            },
          },
        },
      },
      {
        name: "page1",
        path: "/page1",
        component: () => import("../views/Page1.vue"),
        meta: {},
      },
    ],
  },
];

export default routes;
