import { createRouter, createMemoryHistory } from 'vue-router';
import { ExpectStatic, describe, it } from 'vitest';
import { createApp } from 'vue';
import routerTab, { useRouterTab } from "..";
import App from "../../../App.vue";
import { RouterTabType } from '../store';

const expectActiveTab = (expect: ExpectStatic, routerTab: RouterTabType) => {
  expect(routerTab.getActiveTab()).toEqual(routerTab.getTabs().at(-1));
  expect(routerTab.getActiveTab()?.id).toEqual(routerTab.getTabs().at(-1)?.id);
};

const getRouterTab = () => {
  const app = createApp(App);

  app.use(router);
  app.use(routerTab, { router });

  return useRouterTab();
};

// 创建一个内存路由
const history = createMemoryHistory();
const router = createRouter({
  history,
  routes: [
    { path: '/', component: {}, name: 'home', },
    { path: '/initial', component: {}, name: 'initial', },
    { path: '/path', component: {}, name: 'path', meta: { tabConfig: { key: 'path' } } },
    { path: '/pathWithParams/:id', component: {}, name: 'pathWithParams', meta: { tabConfig: { key: 'path' } } },
    { path: '/fullpath', component: {}, name: 'fullpath', meta: { tabConfig: { key: 'fullPath' } } },
    { path: '/fullpathWithParams/:id', component: {}, name: 'fullpathWithParams', meta: { tabConfig: { key: 'fullPath' } } },
  ]
});

const _routerTab = getRouterTab();

describe('Check addTab', () => {

  it(`默认没有配置 key 时，应该默认使用 'fullPath' 的类型`, async ({ expect }) => {
    await router.push('/initial?id=1&name=amy');

    expect(_routerTab.getTabs().at(-1)).toEqual({
      "fullPath": "/initial?id=1&name=amy",
      "id": "/initial?id=1&name=amy",
      "keepAlive": true,
      "name": "initial",
    });

    expectActiveTab(expect, _routerTab);
  });

  it(`配置 key:path 时，包含 query 的 path，id需要去除 query`, async ({ expect }) => {
    await router.push('/path?id=1');

    expect(_routerTab.getTabs().at(-1)).toEqual({
      "fullPath": "/path?id=1",
      "id": "/path",
      "keepAlive": true,
      "name": "path",
    });

    expectActiveTab(expect, _routerTab);
  });

  it(`配置 key:path 时，包含 params 的 path，id不能去除 params`, async ({ expect }) => {
    await router.push('/pathWithParams/2');

    expect(_routerTab.getTabs().at(-1)).toEqual({
      "fullPath": "/pathWithParams/2",
      "id": "/pathWithParams/2",
      "keepAlive": true,
      "name": "pathWithParams",
    });

    expectActiveTab(expect, _routerTab);
  });

  it(`配置 key:fullpath 时，包含 query 的 fullpath，不能去除 query`, async ({ expect }) => {
    await router.push('/fullpath?id=1');

    expect(_routerTab.getTabs().at(-1)).toEqual({
      "fullPath": "/fullpath?id=1",
      "id": "/fullpath?id=1",
      "keepAlive": true,
      "name": "fullpath",
    });

    expectActiveTab(expect, _routerTab);
  });
});

const reset = async ()=>{
  await router.push('/');
  _routerTab.clear();
};

describe('Check add Tab when the same route', () => {
  it(`fullPath时，相同path，相同params，应该同一条`, async ({ expect }) => {
    await reset();
    await router.push('/initial?id=1&name=amy');
    await router.push('/initial?id=1&name=amy');

    expect(_routerTab.getTabs()).length(1);
    expect(_routerTab.getActiveTab()).equal(_routerTab.getTabs().at(-1));
  });

  it(`fullPath时，相同path，不同params，应该新增一条`, async ({ expect }) => {
    await reset();

    await router.push('/initial?id=1&name=amy');
    await router.push('/initial?id=1');

    expect(_routerTab.getTabs()).length(2);
    expect(_routerTab.getActiveTab()).equal(_routerTab.getTabs().at(-1));
  });

  it(`fullPath时，相同path，不同query，应该新增一条`, async ({ expect }) => {
    await reset();

    await router.push('/fullpathWithParams/1');
    await router.push('/fullpathWithParams/2');

    expect(_routerTab.getTabs()).length(2);
    expect(_routerTab.getActiveTab()).equal(_routerTab.getTabs().at(-1));
  });

  it(`path时，相同path，相同params，应该同一条`, async ({ expect }) => {
    await reset();

    await router.push('/path?id=1&name=amy');
    await router.push('/path?id=1&name=amy');

    expect(_routerTab.getTabs()).length(1);
  });

  it(`path时，相同path，不同params，应该同一条`, async ({ expect }) => {
    await reset();

    await router.push('/path?id=1&name=amy');
    await router.push('/path?id=1');

    expect(_routerTab.getTabs()).length(1);
  });

  it(`path时，相同path，不同query，应该新增一条`, async ({ expect }) => {
    await reset();

    await router.push('/pathWithParams/1');
    await router.push('/pathWithParams/2');

    expect(_routerTab.getTabs()).length(2);
    expect(_routerTab.getActiveTab()).equal(_routerTab.getTabs().at(-1));
  });
});



