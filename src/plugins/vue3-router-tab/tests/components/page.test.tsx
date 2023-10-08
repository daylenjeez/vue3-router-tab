import { mount } from '@vue/test-utils';
import VueRouterTab from '@/plugins/vue3-router-tab';
import App from '@/App.vue';
import Page from '@/plugins/vue3-router-tab/components/page/index.vue';
import { beforeEach, describe, it, vi } from 'vitest';
import { reset, router } from '../common';

describe('VueRouterTab Plugin', async () => {
  const wrapper = await mount(App, { global: { plugins: [router, [VueRouterTab, { router }]] } });
  const pageComponent = wrapper.findComponent(Page);

  it('Page content should be changed when route changed', async ({ expect }) => {
    await router.push('/initial');
    expect(pageComponent.findComponent({ name: 'InitialRouter' }).exists()).toBeTruthy();
    expect(pageComponent.html()).toContain('/initial');

    await router.push('/initial?id=1');
    expect(pageComponent.findComponent({ name: 'InitialRouter' }).exists()).toBeTruthy();
    expect(pageComponent.html()).toContain('/initial?id=1');

    await router.push('/path');
    expect(pageComponent.findComponent({ name: 'PathRouter' }).exists()).toBeTruthy();
    expect(pageComponent.html()).toContain('/path');

    await router.push('/path?id=1');
    expect(pageComponent.findComponent({ name: 'PathRouter' }).exists()).toBeTruthy();
    expect(pageComponent.html()).toContain('/path?id=1');

    await router.push('/fullpath');
    expect(pageComponent.findComponent({ name: 'FullPathRouter' }).exists()).toBeTruthy();
    expect(pageComponent.html()).toContain('/fullpath');

    await router.push('/fullpath?id=1');
    expect(pageComponent.findComponent({ name: 'FullPathRouter' }).exists()).toBeTruthy();
    expect(pageComponent.html()).toContain('/fullpath?id=1');
  });

  it('keep-alive should work', async ({ expect }) => {
    await router.push('/initial');
    const page1 = pageComponent.getComponent({ name: 'InitialRouter' });
    await router.push('/path');

    const page2 = pageComponent.getComponent({ name: 'PathRouter' });
    expect(page2.vm.deactivatedCalled).toBe(false);
    expect(page1.vm.deactivatedCalled).toBe(true);

    await router.push('/initial');
    expect(page2.vm.deactivatedCalled).toBe(true);
    expect(page2.vm.unmountedCalled).toBe(false);
    expect(page1.vm.deactivatedCalled).toBe(false);

    await router.push('/noKeepAlivePath');
    const page3 = pageComponent.getComponent({ name: 'KeepAliveRouter' });
    expect(page2.vm.unmountedCalled).toBe(false);
    expect(page3.vm.unmountedCalled).toBe(false);
    expect(page3.vm.deactivatedCalled).toBe(false);

    await router.push('/initial');
    expect(page3.vm.unmountedCalled).toBe(true);
    expect(page3.vm.deactivatedCalled).toBe(false);
  });
});
