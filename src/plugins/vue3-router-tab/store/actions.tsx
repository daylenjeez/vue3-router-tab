import { Tab, TabId } from "../types";
import { throwError } from "../utils";
import { State } from "./state";
import { CreateActions } from "./type";

interface HasTab {
  (tabId: TabId): boolean;
}
interface IndexOfTab {
  (tabId: TabId): number;
}
interface GetTab {
  (tabId: TabId): Tab | undefined;
}
interface AddTab {
  (tab: Tab, options?: { setActive?: boolean }): number;
}
interface RemoveTab {
  (tabId: TabId): Tab;
}
interface OpenById {
  (tabId: TabId): void;
}

interface SetActiveTab {
  (tabId: TabId): number;
}

export type Actions = CreateActions<
  string,
  State,
  {
    hasTab: HasTab;
    indexOfTab: IndexOfTab;
    getTab: GetTab;
    addTab: AddTab;
    removeTab: RemoveTab;
    setActiveTab: SetActiveTab;
    openById: OpenById;
  }
>;

export type RouterStore = ReturnType<
  typeof import("./index")["useRouterTabStore"]
>;

const indexOfTab: IndexOfTab = function (this: RouterStore, tabId: TabId) {
  return this.tabs.findIndex(({ id }) => id === tabId);
};

const hasTab: HasTab = function (this: RouterStore, tabId: TabId) {
  return this.tabs.some(({ id }) => id === tabId);
};

/**
 * get tab by tab id, if tabId is undefined, return active tab
 * @param tabId
 * @returns Tab | undefined
 */
const getTab: GetTab = function (this: RouterStore, tabId?: TabId) {
  return this.tabs.find(({ id }) => id === (tabId ?? this.activeTabId));
};

const addTab: AddTab = function (this: RouterStore, tab: Tab, options) {
  const { setActive } = options ?? { setActive: true };
  const index = this.tabs.push(tab);
  if (setActive) {
    this.setActiveTab(tab.id);
  }
  return index;
};

const removeTab: RemoveTab = function (this: RouterStore, tabId: TabId) {
  return this.tabs.splice(this.indexOfTab(tabId), 1)[0];
};

/**
 * set active tab
 * @param {TabId} tabId
 * @returns {number} tab index
 */
const setActiveTab: SetActiveTab = function (this: RouterStore, tabId: TabId) {
  const tabIndex = this.indexOfTab(tabId);
  const tab = this.tabs[tabIndex];
  if (!tab) {
    throwError(`Tab not found, please check the tab id: ${tabId}`);
    return -1;
  }
  this.activeTabId = tabId;

  return tabIndex;
};

const openById: OpenById = function (this: RouterStore, tabId: TabId) {
  const routes = this.$router.getRoutes();
  console.log(routes);
};

const getRouterPath = (tabId: TabId) => {};

export default {
  indexOfTab,
  hasTab,
  addTab,
  getTab,
  removeTab,
  setActiveTab,
  openById,
};
