import { RouteLocationNormalized, Router, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    children: [
      {
        name: "initial",
        path: "/",
        component: () => import("../views/home.vue"),
      },
      {
        name: "path",
        path: "/path",
        component: () => import("../views/home.vue"),
        meta: { tabConfig: { key: 'path' } }
      },
      {
        name: "fullpath",
        path: "/fullpath",
        component: () => import("../views/home.vue"),
        meta: { tabConfig: { key: 'fullPath' } }
      }, {
        name: "custom",
        path: "/custom",
        component: () => import("../views/home.vue"),
        meta: {
          tabConfig: {
            key: (router: RouteLocationNormalized) => {
              const { path, query } = router;
              return `${path}?id=${query.id}`;
            } 
          } 
        }
      }
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
