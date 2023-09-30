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

  it('tab components 数量需跟 tabs 数量保持一致，且顺序一致，且activeId正确', async () => {
    _reset();
    const wrapper = mount(Tabs);

    await router.push('/initial');
    await router.push('/initial?id=1');
    await router.push('/path?id=1');
    await router.push('/path?id=1&name=1');
    await router.push('/fullpath?id=1');
    await router.push('/fullpath?id=3');
    const tabs = _routerTab.getTabs();

    expect(wrapper.findAllComponents({ name: 'RtTab' }).length).equal(tabs.length).equal(5);

    wrapper.findAllComponents({ name: 'RtTab' }).forEach((tab, index) => {
      const tabLabel = tab.getComponent({ name: 'RtTabLabel' });
      expect(tabLabel.text()).toBe(tabs[index].name);
    });
    
    const hasActiveTab = wrapper.findAllComponents({ name: 'RtTab' }).some((tab) => {

      const classes = tab.classes();
      
      if(classes.some(item=>item.toString().startsWith('_rt-tab-active'))) {
        const tabLabel = tab.getComponent({ name: 'RtTabLabel' });
        return tabLabel.text() === _routerTab.getActiveTab()?.name;
      }
    });

    expect(hasActiveTab).toBeTruthy();
  });
});
