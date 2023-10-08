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
    { path: '/', component: () => import('./pages/home'), name: 'home', },
    { path: '/initial', component: () => import('./pages/initial'), name: 'initial' },
    { path: '/path', component: () => import('./pages/path'), name: 'path', meta: { tabConfig: { key: 'path' } } },
    { path: '/pathWithParams/:id', component: () => import('./pages/pathWithParams'), name: 'pathWithParams', meta: { tabConfig: { key: 'path' } } },
    { path: '/fullpath', component: () => import('./pages/fullpath'), name: 'fullpath', meta: { tabConfig: { key: 'fullPath' } } },
    { path: '/fullpathWithParams/:id', component: () => import('./pages/fullpathWithParams'), name: 'fullpathWithParams', meta: { tabConfig: { key: 'fullPath' } } },
    {
      path: '/custom', component: () => import('./pages/custom'), name: 'custom', meta: {
        tabConfig: {
          key: (router: RouteLocationNormalized) => {
            const { path, query } = router;
            return `${path}?id=${query.id}`;
          }
        }
      }
    },
    {
      path: '/customWithParams/:id', component: () => import('./pages/customWithParams'), name: 'customWithParams', meta: {
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
