import { createRouter, createMemoryHistory } from 'vue-router';
import { describe, it } from 'vitest';
import { createApp } from 'vue';
import routerTab, { useRouterTab } from "..";
import App from "../../../App.vue";

// 创建一个内存路由
const history = createMemoryHistory();
const router = createRouter({
  history,
  routes: [
    { path: '/initial', component: {}, name: 'initial', },
    { path: '/path', component: {}, name: 'path', meta: { tabConfig: { key: 'path' } } },
    { path: '/pathWithParams/:id', component: {},name: 'pathWithParams', meta: { tabConfig: { key: 'path' } } },
    { path: '/fullpath', component: {},name:'fullpath',meta: { tabConfig: { key: 'fullPath' } } }
  ]
});

describe('Check addTab', () => {
  const app = createApp(App);

  app.use(router);
  app.use(routerTab, { router });

  const _routerTab = useRouterTab();

  it(`默认没有配置 key 时，应该默认使用 'fullPath' 的类型`, async ({ expect }) => {
    await router.push('/initial?id=1&name=amy');

    expect(_routerTab.tabs[1]).toEqual({
      "fullPath": "/initial?id=1&name=amy",
      "id": "/initial?id=1&name=amy",
      "keepAlive": true,
      "name": "initial",
    });

    expect(_routerTab.activeTabId).toEqual('/initial?id=1&name=amy');
  });

  it(`配置 key:path 时，包含 query 的 path，id需要去除 query`, async ({ expect }) => {
    await router.push('/path?id=1');

    expect(_routerTab.tabs[_routerTab.tabs.length - 1]).toEqual({
      "fullPath": "/path?id=1",
      "id": "/path",
      "keepAlive": true,
      "name": "path",
    });

    expect(_routerTab.activeTabId).toEqual('/path');
  });

  it(`配置 key:path 时，包含 params 的 path，id不能去除 params`, async ({ expect }) => {
    await router.push('/pathWithParams/2');

    expect(_routerTab.tabs[_routerTab.tabs.length - 1]).toEqual({
      "fullPath": "/pathWithParams/2",
      "id": "/pathWithParams/2",
      "keepAlive": true,
      "name": "pathWithParams",
    });

    expect(_routerTab.activeTabId).toEqual('/pathWithParams/2');
  });

  it(`配置 key:fullpath 时，包含 query 的 fullpath，不能去除 query`, async ({ expect }) => {
    await router.push('/fullpath?id=1');

    expect(_routerTab.tabs[_routerTab.tabs.length - 1]).toEqual({
      "fullPath": "/fullpath?id=1",
      "id": "/fullpath?id=1",
      "keepAlive": true,
      "name": "fullpath",
    });
    
    expect(_routerTab.activeTabId).toEqual('/fullpath?id=1');
  });
});
