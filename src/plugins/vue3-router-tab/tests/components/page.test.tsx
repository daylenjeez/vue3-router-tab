import { mount } from '@vue/test-utils';
import VueRouterTab from '@/plugins/vue3-router-tab';
import App from '@/App.vue';
import Page from '@/plugins/vue3-router-tab/components/page/index.vue';
import { describe, it } from 'vitest';
import { router } from '../common';

describe('VueRouterTab Plugin', async () => {
  const wrapper = await mount(App, { global: { plugins: [router, [VueRouterTab, { router }]] } });

  it('should render the page', async ({ expect }) => {
    await router.push('/initial');
    expect(wrapper.findComponent(Page).html()).toContain('render initial');
  });
});
