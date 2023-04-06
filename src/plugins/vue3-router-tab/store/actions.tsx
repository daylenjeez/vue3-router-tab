import { Router, useRouter } from "vue-router";
import { Tab, TabId } from "../types";
import { throwError } from "../utils";
import { State } from "./state";
import { CreateActions } from "./type";

export type Actions = CreateActions<
  string,
  State,
  {
    hasTab: (tabId: TabId) => boolean;
    indexOfTab: (tabId: TabId) => number;
    addTab: (tab: Tab, options?: { setActive?: boolean }) => number;
    removeTab: (tabId: TabId) => void;
    setActiveTab: (tabId: TabId) => number;
  }
>;

export type RouterStore = ReturnType<
  typeof import("./index")["useRouterTabStore"]
>;

function indexOfTab(this: RouterStore, tabId: TabId) {
  return this.tabs.findIndex(({ id }) => id === tabId);
}
function hasTab(this: RouterStore, tabId: TabId) {
  return this.tabs.some(({ id }) => id === tabId);
}

function addTab(this: RouterStore, tab: Tab, options) {
  console.log(this.$router);
  const { setActive } = options ?? { setActive: true };
  const index = this.tabs.push(tab);
  console.log(this.tabs);
  if (setActive) {
    this.setActiveTab(tab.id);
  }

  return index;
}

function removeTab(this: RouterStore, tabId: TabId) {
  this.tabs.splice(this.indexOfTab(tabId), 1);
}

/**
 * set active tab
 * @param {TabId} tabId
 * @returns {number} tab index
 */

function setActiveTab(this: RouterStore, tabId: TabId) {
  const tabIndex = this.indexOfTab(tabId);
  const tab = this.tabs[tabIndex];
  if (!tab) {
    throwError(`Tab not found, please check the tab id: ${tabId}`);
    return -1;
  }
  this.activeTabId = tabId;

  return tabIndex;
}

export default {
  indexOfTab,
  hasTab,
  addTab,
  removeTab,
  setActiveTab,
};
