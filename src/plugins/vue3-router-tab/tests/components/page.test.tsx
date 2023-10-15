
import Page from '@/plugins/vue3-router-tab/components/page/index.vue';
import { beforeEach, describe, it } from 'vitest';
import { beforeEachFn, } from '../unit';
import { Router } from 'vue-router';

describe('VueRouterTab Plugin', async () => {
  let router: Router;
  let wrapper: any;
  let pageComponent: any;
  let routerTab: any;

  beforeEach(async () => {
    const item = await beforeEachFn();
    router = item.router;
    wrapper = item.wrapper;
    pageComponent = wrapper.getComponent(Page);
    routerTab = item.routerTab;
  });

  it('Page content should be changed when route changed', async ({ expect }) => {
    await router.push('/initial');

    // expect(pageComponent.findComponent({ name: '/initial' }).exists()).toBeTruthy();

    // expect(pageComponent.html()).toContain('/initial');

    await router.push('/initial?id=1');
    expect(pageComponent.findComponent({ name: '/initial?id=1' }).exists()).toBeTruthy();
    expect(pageComponent.html()).toContain('/initial?id=1');

    await router.push('/path');
    expect(pageComponent.findComponent({ name: '/path' }).exists()).toBeTruthy();
    expect(pageComponent.html()).toContain('/path');

    await router.push('/path?id=1');
    expect(pageComponent.findComponent({ name: '/path' }).exists()).toBeTruthy();
    expect(pageComponent.html()).toContain('/path?id=1');

    await router.push('/fullpath');
    expect(pageComponent.findComponent({ name: '/fullpath' }).exists()).toBeTruthy();
    expect(pageComponent.html()).toContain('/fullpath');

    await router.push('/fullpath?id=1');
    expect(pageComponent.findComponent({ name: '/fullpath?id=1' }).exists()).toBeTruthy();
    expect(pageComponent.html()).toContain('/fullpath?id=1');
  });

  it('keep-alive should work', async ({ expect }) => {
    await router.push('/keepAlivePath');
    const keepAliveRouter = pageComponent.getComponent({ name: '/keepAlivePath' });
    expect(pageComponent.findComponent({ name: '/keepAlivePath' }).exists()).toBeTruthy();
    expect(keepAliveRouter.vm.deactivatedCalled).toBeFalsy();
    expect(keepAliveRouter.vm.unmountedCalled).toBeFalsy();

    // await router.push('/noKeepAlivePath');
    // const noKeepAliveRouter = pageComponent.getComponent({ name: '/noKeepAlivePath' });
    // expect(pageComponent.findComponent({ name: '/noKeepAlivePath' }).exists()).toBeTruthy();
    // expect(keepAliveRouter.vm.deactivatedCalled).toBeTruthy();
    // expect(keepAliveRouter.vm.unmountedCalled).toBeFalsy();

    // await router.push('/keepAlivePath');
    // expect(noKeepAliveRouter.vm.deactivatedCalled).toBeFalsy();
    // expect(noKeepAliveRouter.vm.unmountedCalled).toBeTruthy();
  });
});
