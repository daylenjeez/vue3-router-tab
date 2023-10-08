import { mount } from '@vue/test-utils';
import VueRouterTab from '@/plugins/vue3-router-tab';
import App from '@/App.vue';
import Page from '@/plugins/vue3-router-tab/components/page/index.vue';
import { afterEach, describe, it } from 'vitest';
import { reset, router } from '../common';

describe('VueRouterTab Plugin', async () => {
  const wrapper = await mount(App, { global: { plugins: [router, [VueRouterTab, { router }]] } });
  const pageComponent = wrapper.findComponent(Page);
  // afterEach(async () => await reset());

  // it('Page content should be changed when route changed', async ({ expect }) => {
  //   await router.push('/initial');
  //   expect(pageComponent.findComponent({ name: 'InitialRouter' }).exists()).toBeTruthy();
  //   expect(pageComponent.html()).toContain('/initial');

  //   await router.push('/initial?id=1');
  //   expect(pageComponent.findComponent({ name: 'InitialRouter' }).exists()).toBeTruthy();
  //   expect(pageComponent.html()).toContain('/initial?id=1');

  //   await router.push('/path');
  //   expect(pageComponent.findComponent({ name: 'PathRouter' }).exists()).toBeTruthy();
  //   expect(pageComponent.html()).toContain('/path');

  //   await router.push('/path?id=1');
  //   expect(pageComponent.findComponent({ name: 'PathRouter' }).exists()).toBeTruthy();
  //   expect(pageComponent.html()).toContain('/path?id=1');

  //   await router.push('/fullpath');
  //   expect(pageComponent.findComponent({ name: 'FullPathRouter' }).exists()).toBeTruthy();
  //   expect(pageComponent.html()).toContain('/fullpath');

  //   await router.push('/fullpath?id=1');
  //   expect(pageComponent.findComponent({ name: 'FullPathRouter' }).exists()).toBeTruthy();
  //   expect(pageComponent.html()).toContain('/fullpath?id=1');
  // });

  it('keep-alive should work', async ({ expect }) => {
    await router.push('/keepAlivePath');
    const keepAliveRouter = pageComponent.getComponent({ name: 'KeepAliveRouter' });
    expect(pageComponent.findComponent({ name: 'KeepAliveRouter' }).exists()).toBeTruthy();
    expect(keepAliveRouter.vm.deactivatedCalled).toBeFalsy();
    expect(keepAliveRouter.vm.unmountedCalled).toBeFalsy();

    await router.push('/noKeepAlivePath');
    expect(pageComponent.findComponent({ name: 'NoKeepAliveRouter' }).exists()).toBeTruthy();
    expect(keepAliveRouter.vm.deactivatedCalled).toBeTruthy();
    expect(keepAliveRouter.vm.unmountedCalled).toBeFalsy();
  });
});
