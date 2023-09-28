import { describe, expect, it } from 'vitest';
import Tabs from '../../components/tabs';
import { getRouterTab,reset,router } from '../common';
import { mount } from '@vue/test-utils';

const _routerTab = getRouterTab();

const _reset = reset.bind(null, _routerTab);

describe('check tabs', async () => {
  it('should render tabs', () => {
    expect(Tabs).toBeTruthy();
  });

  it('should render tabs', async () => {
    _reset();
    const wrapper = mount(Tabs);

    await router.push('/initial');
    const tabs = _routerTab.getTabs();

    wrapper.findAllComponents({ name: 'RtTab' }).forEach((tab, index) => {
      expect(tab.text()).toBe(tabs[index].name);
    });
  });
});
