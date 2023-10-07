// import { describe, expect, it } from 'vitest';
// import Page from '../../components/page/index.vue';
// import { getRouterTab, reset,router } from '../common';
// import { mount } from '@vue/test-utils';

// const _routerTab = getRouterTab();
// const _reset = reset.bind(null, _routerTab);

// describe('check tabs', async () => {
//   it('should render tabs', () => {
//     expect(Page).toBeDefined();
//   });
// });

// it('tab components 数量需跟 tabs 数量保持一致，且顺序一致，且activeId正确', async () => {
//   _reset();
//   const wrapper = mount(Page);

//   await router.push('/initial');
//   await router.push('/initial?id=1');
//   // await router.push('/path?id=1');
//   // await router.push('/path?id=1&name=1');
//   // await router.push('/fullpath?id=1');
//   // await router.push('/fullpath?id=3');
//   const activeTab = _routerTab.getActiveTab();
//   console.log(wrapper,activeTab);
// });
