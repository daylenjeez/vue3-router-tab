import { describe, expect, it } from 'vitest';
import Page from '../../components/page/index.vue';
import App from "../../../../App.vue";
import { getRouterTab, reset,router } from '../common';
import { mount } from '@vue/test-utils';

const _routerTab = getRouterTab();
const _reset = reset.bind(null, _routerTab);

describe('YourComponent', () => {
  
  it('renders the correct route component', async () => {
    _reset();
    const wrapper = mount(App, {global: {plugins: [router]}});

    await router.push('/initial');

    await wrapper.vm.$nextTick();
    
    expect(wrapper.findComponent(Page).exists());
  });
});
