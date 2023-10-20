import {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
} from "vue-router";
import { State } from "./state";
import { Tab, TabId, TabKey, TabWithIndex } from "../../../types";
import { CreateActions } from "../../type";
import { OpenOptions, ToOptions } from "./options";

export interface CreateTabId {
  (tabKey: TabKey | undefined, router: RouteLocationNormalized): TabId | undefined;
}
export interface CreateTab {
  (router: RouteLocationNormalized): Tab | undefined;
}
export interface GetTabByRouteMeta {
  (router: RouteLocationNormalized): Tab | undefined;
}
export interface HasTab {
  (tabId: TabId): boolean;
}
export interface IndexOfTab {
  (tabId: TabId): number;
}
export interface GetTab {
  (tabId: TabId | undefined): Tab | undefined;
}
export interface GetTabByFullPath {
  (fullPath: string): Tab | undefined;
}
export interface GetTabIdByRouteMeta {
  (router: RouteLocationNormalized): TabId | undefined;
}
export interface AddTab {
  (tab: Tab, options?: { setActive?: boolean }): number;
}
export interface RemoveTabById {
  (tabId: TabId): TabWithIndex | undefined;
}
export interface RemoveTabByIndex {
  (tabId: number): Tab | undefined;
}
export interface Remove {
  (item: { id?: TabId, fullPath?: string }): TabWithIndex | undefined;
}
export interface Refresh {
  (item: TabId): Tab | undefined;
}
export interface OpenTabById {
  (tabId: TabId): ReturnType<RouterPush> | undefined;
}
export interface OpenNearTab {
  (removeTab: TabWithIndex): Promise<void>;
}
export interface SetActiveTab {
  (tab: Tab | undefined): Tab | undefined;
}
export interface Open {
  (to: RouteLocationRaw, options?: OpenOptions): ReturnType<Router["push"]>;
}
export interface Close {
  (item?: { id: TabId }, toOptions?: ToOptions): Promise<Tab | undefined>;
  (item?: { fullPath: string }, toOptions?: ToOptions): Promise<Tab | undefined>;
  (fullPath?: string, toOptions?: ToOptions): Promise<Tab | undefined>;
}
export interface CloseOthers {
  (tabId?: TabId): undefined;
}
export interface Clear {
  (): void;
}
export interface RouterPush {
  (to: RouteLocationRaw): ReturnType<Router["push"]>;
}
export interface RouterReplace {
  (to: RouteLocationRaw): ReturnType<Router["replace"]>;
}
export interface GetTabs {
  (): Tab[];
}
export interface GetActiveTab {
  (): Tab | undefined
}
export type Actions = CreateActions<
  string,
  State,
  {
    _createTabId: CreateTabId;
    _createTab: CreateTab;
    _indexOfTab: IndexOfTab;
    _getTab: GetTab;
    _getTabIdByRoute: GetTabIdByRouteMeta;
    _getTabByFullpath: GetTabByFullPath;
    _addTab: AddTab;
    _removeTabById: RemoveTabById;
    _removeTabByIndex: RemoveTabByIndex;
    _setActiveTab: SetActiveTab;
    _openTabById: OpenTabById;
    _openNearTab: OpenNearTab;
    _clear: Clear;
    _remove: Remove;
    _refresh: Refresh;
    _routerPush: RouterPush;
    _routerReplace: RouterReplace;

    open: Open;
    close: Close;
    hasTab: HasTab;
    closeOthers: CloseOthers;
  }
>;
export type RouterStore = ReturnType<
  typeof import("..")["useRouterTabStore"]
>;
