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
  (tabId: TabId): Tab | void;
}
export interface GetTabIdByRouteMeta {
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
  (tabId: TabId | null): Tab|void;
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

export interface GetActiveTabId{
  ():TabId|null
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
    _getTabIdByRouteMeta: GetTabIdByRouteMeta;
    _addTab: AddTab;
    _removeTab: RemoveTab;
    _setActiveTab: SetActiveTab;
    _openTab: OpenTab;

    open: Open;
    close: Close;
    closeOthers: CloseOthers;
    getTabs: GetTabs;
    getActiveTabId:GetActiveTabId
  }
>;

export type RouterStore = ReturnType<
  typeof import("../../store")["useRouterTabStore"]
>;
