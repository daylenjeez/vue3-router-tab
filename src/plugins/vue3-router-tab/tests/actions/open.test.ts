import { describe, it, beforeEach } from 'vitest';
import { RouterTabType } from '../../store/routerTab';
import { beforeEachFn } from '../unit';

describe('test open api', async () => {
  let routerTab: RouterTabType;

  beforeEach(async () => {
    const item = await beforeEachFn();
    routerTab = item.routerTab;
  });

  it('open a new router', async ({ expect }) => {
    await routerTab.open('/initial?id=1&name=amy');
    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=1&name=amy');
    await routerTab.open('/initial?id=2');
    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=2');
  });

  it('open a current tab', async ({ expect }) => {
    await routerTab.open('/initial?id=1&name=amy');
    await routerTab.open('/initial?id=2');

    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=2');

    await routerTab.open('/initial?id=1&name=amy');
    expect(routerTab.getTabs().length).toEqual(2);
    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=1&name=amy');
  });

  it('replace a current tab', async ({ expect }) => {
    await routerTab.open('/initial?id=1&name=amy');
    await routerTab.open('/initial?id=2');

    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=2');

    await routerTab.open('/initial?id=1&name=amy', { replace: true });
    expect(routerTab.getTabs().length).toEqual(2);
    expect(routerTab.getActiveTab()?.id).toEqual('/initial?id=1&name=amy');
  });

  it('open a current tab,but different query', async ({ expect }) => {
    await routerTab.open('/initial?id=1&name=amy');
    await routerTab.open('/path?id=2');

    expect(routerTab.getActiveTab()?.id).toEqual('/path');

    await routerTab.open('/path?id=3', { replace: true });
    expect(routerTab.getTabs().length).toEqual(2);
    expect(routerTab.getActiveTab()?.id).toEqual('/path');
  });
});
