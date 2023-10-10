import { describe, beforeEach, it } from 'vitest';
import { Router } from 'vue-router';
import { RouterTabType } from '../../store';
import { beforeEachFn } from '../unit';

describe('Check tab closed', async () => {
  let router: Router;
  let routerTab: RouterTabType;

  beforeEach(async () => {
    const item = await beforeEachFn();
    router = item.router;
    routerTab = item.routerTab;
  });

  it(`close current tab`, async ({ expect }) => {
    await router.push('/initial?id=1&name=amy');
    expect(routerTab.getTabs().length).toEqual(1);
    await routerTab.close();
    expect(routerTab.getTabs().length).toEqual(0);
  });

  it(`close tab by id`, async ({ expect }) => {
    await router.push('/initial?id=1');
    await router.push('/path?id=1');
    expect(routerTab.getTabs().length).toEqual(2);
    await routerTab.close('/initial?id=1');
    expect(routerTab.getTabs().length).toEqual(1);
  });

  it(`close tab by route`, async ({ expect }) => {
    await router.push('/initial?id=1');
    await router.push('/path?id=1');
    expect(routerTab.getTabs().length).toEqual(2);
    await routerTab.close(router.currentRoute.value);

    expect(routerTab.getTabs().length).toEqual(1);
    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=1');
  });

  it(`close undefined tab`, async ({ expect }) => {
    await router.push('/initial?id=1');
    await router.push('/path?id=1');
    expect(routerTab.getTabs().length).toEqual(2);
    await routerTab.close('/initial?id=2');

    expect(routerTab.getTabs().length).toEqual(2);
  });

});
