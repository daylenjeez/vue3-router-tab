import { createApp } from "vue";
import App from "../../../App.vue";
import routerTab, { useRouterTab } from "..";
import { RouteLocationNormalized, createMemoryHistory, createRouter } from "vue-router";
import { RouterTabType } from "../store";

// 创建一个内存路由
const history = createMemoryHistory();
export const router = createRouter({
  history,
  routes: [
    { path: '/', component: {}, name: 'home', },
    { path: '/initial', component: {}, name: 'initial'},
    { path: '/path', component: {}, name: 'path', meta: { tabConfig: { key: 'path' } } },
    { path: '/pathWithParams/:id', component: {}, name: 'pathWithParams', meta: { tabConfig: { key: 'path' } } },
    { path: '/fullpath', component: {}, name: 'fullpath', meta: { tabConfig: { key: 'fullPath' } } },
    { path: '/fullpathWithParams/:id', component: {}, name: 'fullpathWithParams', meta: { tabConfig: { key: 'fullPath' } } },
    {
      path: '/custom', component: {}, name: 'custom', meta: {
        tabConfig: {
          key: (router: RouteLocationNormalized) => {
            const { path, query } = router;
            return `${path}?id=${query.id}`;
          }
        }
      }
    },
    {
      path: '/customWithParams/:id', component: {}, name: 'customWithParams', meta: {
        tabConfig: {
          key: () => {
            return '/customWithParams';
          }
        }
      }
    },
  ]
});

export const getRouterTab = () => {
  const app = createApp(App);

  app.use(router);
  app.use(routerTab, { router });

  return useRouterTab();
};


export const reset = async (_routerTab: RouterTabType) => {
  await router.push('/');
  _routerTab.clear();
};
