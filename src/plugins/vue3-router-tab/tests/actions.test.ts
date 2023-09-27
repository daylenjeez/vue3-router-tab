import { createRouter, createMemoryHistory } from 'vue-router';
import {describe, it}from 'vitest';
import { createApp } from 'vue';
import routerTab,{ useRouterTab } from "..";
import App from "../../../App.vue";

// 创建一个内存路由
const history = createMemoryHistory();
const router = createRouter({
  history,
  routes: [
    { path: '/initial', component: {},name:'initial', },
    {path: '/path', component: {},meta:{routerTabConfig:{key:'path'}}},
    { path: '/fullpath', component: {},meta:{routerTabConfig:{key:'fullpath'}} }
  ]
});

// 单元测试
describe('Tabs Test', () => {
  const app = createApp(App);

  app.use(router);
  app.use(routerTab, { router });

  it('should add a new tab when router.push is called', async ({expect}) => {
    const _routerTab = useRouterTab();
    
    await router.push('/initial');

    expect(_routerTab.tabs[1]).toEqual({
      "fullPath": "/initial",
      "id": "/initial",
      "isIframe": false,
      "keepAlive": true,
      "name": "initial",
    });
  });
});
