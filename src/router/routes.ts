const routes = [
  {
    path: "/",
    component: () => import("../components/frame"),
    children: [
      {
        path: "/",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/page1",
        component: () => import("../views/Page1.vue"),
      },
    ],
  },
];

export default routes;
