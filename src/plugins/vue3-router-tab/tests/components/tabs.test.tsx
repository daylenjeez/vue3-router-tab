import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { router, reset, routerTab, } from '../common';
import Tabs from '@/plugins/vue3-router-tab/components/tabs';

describe('check tabs', async () => {
  beforeEach(async () => await reset());

  it('should render tabs', () => expect(Tabs).toBeDefined());

  it('tab components 数量需跟 tabs 数量保持一致，且顺序一致，且activeId正确', async () => {
    const wrapper = mount(Tabs);

    await router.push('/initial');
    await router.push('/initial?id=1');
    await router.push('/path?id=1');
    await router.push('/path?id=1&name=1');
    await router.push('/fullpath?id=1');
    await router.push('/fullpath?id=3');
    const tabs = routerTab.getTabs();

    const tabComponents = wrapper.findAllComponents({ name: 'RtTab' });

    //长度一致
    expect(tabComponents.length).equal(tabs.length).equal(5);
    //顺序一致
    tabComponents.forEach((tab, index) => {
      const tabLabel = tab.getComponent({ name: 'RtTabLabel' });
      expect(tabLabel.text()).toBe(tabs[index].name);//TODO:jsx
    });
    //activeId正确
    const hasActiveTab = wrapper.findAllComponents({ name: 'RtTab' }).some((tab) => {
      const classes = tab.classes();

      if (classes.some(item => item.toString().startsWith('_rt-tab-active'))) {
        const tabLabel = tab.getComponent({ name: 'RtTabLabel' });
        return tabLabel.text() === routerTab.getActiveTab()?.name;
      }
    });

    expect(hasActiveTab).toBeTruthy();
  });
});
