import type { TabConfig } from "vue3-tabor";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    children: [
      {
        name: "initial",
        path: "/",
        component: () => import("../views/Home.vue"),
      },
      {
        name: "path",
        path: "/path",
        component: () => import("../views/path.vue"),
        meta: { tabConfig: { key: "path", keepAlive: true } satisfies TabConfig },
      },
      {
        name: "fullpathlonglonglonglonglonglonglonglonglonglonglong",
        path: "/fullpath",
        component: () => import("../views/fullPath.vue"),
        meta: { tabConfig: { key: "fullPath", keepAlive: true } satisfies TabConfig },
      },
      // {
      //   name: "custom",
      //   path: "/custom",
      //   component: () => import("../views/custom.vue"),
      //   meta: {
      //     tabConfig: {
      //       key: (router: RouteLocationNormalized) => {
      //         const { path, query } = router;
      //         return `${path}?id=${query.id}`;
      //       }
      //     }
      //   }
      // }
      // {
      //   name: "主页",
      //   path: "/home",
      //   component: () => import("../views/home.vue"),
      //   meta: {
      //     tabConfig: {
      //       key: (router: RouteLocationNormalized) => {
      //         return router.fullPath;
      //       },
      //     },
      //   },
      // },
      // {
      //   name: "列表",
      //   path: "/list",
      //   component: () => import("../views/first.vue"),
      //   meta: {tabConfig: {isIframe: true,},},
      // },
      // {
      //   name: "详情页",
      //   path: "/detail/:id",
      //   component: () => import("../views/second.vue"),
      //   meta: {
      //     tabConfig: {
      //       key: (router: RouteLocationNormalized) => {
      //         return router.fullPath;
      //       },
      //     },
      //   },
      // },
      // {
      //   name: "编辑页",
      //   path: "/edit/:id",
      //   component: () => import("../views/third.vue"),
      // },
    ],
  },
];

export default routes;
