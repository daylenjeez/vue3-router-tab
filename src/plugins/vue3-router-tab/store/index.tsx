//store.js
import { reactive, Ref } from "vue";
import { Router } from "vue-router";
import { PageType, Tab } from "../types";

interface State {
  tabs: Tab[];
}

type TabId = Tab["id"];

interface Store {
  router: null | Router;
  state: State;
  hasTab: (tabId: TabId) => boolean;
  indexOfTab: (tabId: TabId) => number;
  addTab: (tab: Tab) => number;
  removeTab: (tabId:TabId)=>void;
}

const indexOfTab: Store["indexOfTab"] = (tabId:TabId) => {
  return store.state.tabs.findIndex(({ id }) => id === tabId);
};

const hasTab: Store["hasTab"] = (tabId:TabId) => {
  return store.state.tabs.some(({ id }) => id === tabId);
};

const addTab: Store["addTab"] = (tab:Tab) => {
  return store.state.tabs.push(tab);
};

const removeTab: Store["removeTab"] = (tabId:TabId) => {
  store.state.tabs.splice(indexOfTab(tabId), 1);
};


const store: Store = {
  // debug: true,
  router: null,
  state: reactive<State>({tabs: [],}),
  hasTab,
  indexOfTab,
  addTab,
  removeTab,
};

export { store };
