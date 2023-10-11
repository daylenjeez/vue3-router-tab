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
    await routerTab.close(router.currentRoute.value.fullPath);

    expect(routerTab.getTabs().length).toEqual(1);
    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=1');
  });

  it(`close no funded tab`, async ({ expect }) => {
    await router.push('/initial?id=1');
    await router.push('/path?id=1');
    expect(routerTab.getTabs().length).toEqual(2);
    await routerTab.close('/initial?id=2');

    expect(routerTab.getTabs().length).toEqual(2);
  });

  it(`close active tab if param is undefined`, async ({ expect }) => {
    await router.push('/initial?id=1');
    await router.push('/path?id=1');

    await routerTab.open('/initial?id=1');
    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=1');
    await routerTab.close();
    expect(routerTab.getActiveTab()?.id).toEqual('/path');

  });

  it(`after tab is active when current tab closed`, async ({ expect }) => {
    await router.push('/initial?id=1');
    await router.push('/path?id=1');

    await routerTab.open('/initial?id=1');
    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=1');

    await routerTab.close('/initial?id=1');
    expect(routerTab.getActiveTab()?.id).toEqual('/path');
  });

  it(`before tab is active when current tab closed and has not after tab`, async ({ expect }) => {
    await router.push('/initial?id=1');
    await router.push('/path?id=1');

    await routerTab.open('/path?id=1');
    expect(routerTab.getActiveTab()?.id).toEqual('/path');

    await routerTab.close({ id: '/path' });
    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=1');
  });

  it(`navigate to custom tab when add config`, async ({ expect }) => {
    await router.push('/initial?id=1');
    await router.push('/initial?id=2');
    await router.push('/initial?id=3');
    await router.push('/path?id=1');
    expect(routerTab.getTabs().length).toEqual(4);
    expect(routerTab.getActiveTab()?.id).toEqual('/path');

    await routerTab.close({ fullPath: '/path?id=1' }, { id: '/initial?id=2' });
    expect(routerTab.getTabs().length).toEqual(3);

    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=2');
  });

  it(`close tab but open the same tab`, async ({ expect }) => {
    await router.push('/initial?id=1');
    await router.push('/initial?id=2');
    await router.push('/initial?id=3');
    await router.push('/path?id=1');
    expect(routerTab.getTabs().length).toEqual(4);
    expect(routerTab.getActiveTab()?.id).toEqual('/path');

    routerTab.open('/initial?id=2');

    await routerTab.close('/path?id=1', { fullPath: '/path?id=1' });

    expect(routerTab.getActiveTab()?.id).toEqual('/path');
  });

});
