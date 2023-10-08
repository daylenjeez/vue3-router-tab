import { mount } from '@vue/test-utils';
import VueRouterTab from '@/plugins/vue3-router-tab';
import App from '@/App.vue';
import Page from '@/plugins/vue3-router-tab/components/page/index.vue';
import { describe, it } from 'vitest';
import { router } from '../common';

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
});
