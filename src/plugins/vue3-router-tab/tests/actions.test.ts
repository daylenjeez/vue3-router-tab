// index.js

import { createRouter, createMemoryHistory } from 'vue-router';
import {describe, expect, it}from 'vitest';
import { createApp, ref } from 'vue';
import routerTab from "..";
import { useRouterTab } from '..';
import App from "../../../App.vue";

// 假设的tabs数组
const tabs = ref([]);

// 创建一个内存路由
const history = createMemoryHistory();
const router = createRouter({
  history,
  routes: [
    { path: '/initial', component: {},name:'initial', },
    { path: '/path', component: {} },
    { path: '/fullpath', component: {} }
  ]
});

// 监听路由变化，添加新的tab
router.afterEach((to) => {
  if (!tabs.value.includes(to.path)) {
    tabs.value.push(to.path);
  }
});

// 单元测试
describe('Tabs Test', () => {
  const app = createApp(App);

  app.use(router);
  app.use(routerTab, { router });

  const _routerTab = useRouterTab();
  it('should add a new tab when router.push is called', async () => {
    // 初始情况下，tabs应该是空的
    expect(tabs.value).toEqual([]);

    // 路由跳转到/tab1
    await router.push('/initial');
    console.log(router.currentRoute);
    
    console.log(_routerTab.tabs);
    
    // expect(tabs.value).toEqual(['/tab1']);

    // 路由跳转到/tab2
    await router.push('/tab2');
    expect(tabs.value).toEqual(['/tab1', '/tab2']);
  });
});
