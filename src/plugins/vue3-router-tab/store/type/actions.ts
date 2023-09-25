import {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
  Router,
} from "vue-router";
import { State } from "./../state";
import { Tab, TabId, TabKey } from "../../types";
import { CreateActions } from "../type";

export interface CreateTabId {
  (tabKey: TabKey | undefined | null, router: RouteLocationNormalized): TabId | void;
}
export interface CreateTab {
  (router: RouteLocationNormalized): Tab | void;
}
export interface GetTabByRouteMeta {
  (router: RouteLocationNormalized): Tab|void;
}
export interface HasTab {
  (tabId: TabId): boolean;
}
export interface IndexOfTab {
  (tabId: TabId): number;
}
export interface GetTab {
  (tabId: TabId): Tab | undefined;
}
export interface GetTabIdByRoute {
  (router: RouteLocationNormalized): TabId|void;
}
export interface AddTab {
  (tab: Tab, options?: { setActive?: boolean }): number;
}
export interface RemoveTab {
  (tabId: TabId): Tab | undefined;
}
export interface OpenTab {
  (tabId: TabId): void;
}

export interface SetActiveTab {
  (tabId: TabId | null): number;
}

export interface Open {
  (to: RouteLocationRaw): ReturnType<Router["push"]>;
}

export interface Close {
  (
    before?: TabId | RouteLocationNormalizedLoaded,
    after?: TabId | RouteLocationNormalizedLoaded
  ): Tab | undefined;
}

export interface CloseOthers {
  (): Tab | undefined;
}

export interface GetTabs {
  (): Tab[];
}

export type Actions = CreateActions<
  string,
  State,
  {
    _createTabId: CreateTabId;
    _createTab:CreateTab;
    _getTabByRouteMeta: GetTabByRouteMeta;
    _hasTab: HasTab;
    _indexOfTab: IndexOfTab;
    _getTab: GetTab;
    _getTabIdByRoute: GetTabIdByRoute;
    _addTab: AddTab;
    _removeTab: RemoveTab;
    _setActiveTab: SetActiveTab;
    _openTab: OpenTab;

    open: Open;
    close: Close;
    closeOthers: CloseOthers;
    getTabs: GetTabs;
  }
>;

export type RouterStore = ReturnType<
  typeof import("../../store")["useRouterTabStore"]
>;
