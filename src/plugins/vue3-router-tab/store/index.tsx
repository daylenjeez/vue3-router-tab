//store.js
import { reactive } from "vue";
import { Router } from "vue-router";
import { Tab } from "../types";
import { throwError } from "../utils";

interface State {
  tabs: Tab[];
  activeTabId: null | TabId;
}

type TabId = Tab["id"];

interface Store {
  router: null | Router;
  state: State;
  hasTab: (tabId: TabId) => boolean;
  indexOfTab: (tabId: TabId) => number;
  addTab: (tab: Tab,options?:{setActive?:boolean}) => number;
  removeTab: (tabId:TabId)=>void;
  setActiveTab: (tabId:TabId)=>number;
}

const indexOfTab: Store["indexOfTab"] = (tabId:TabId) => {
  return store.state.tabs.findIndex(({ id }) => id === tabId);
};

const hasTab: Store["hasTab"] = (tabId:TabId) => {
  return store.state.tabs.some(({ id }) => id === tabId);
};

const addTab: Store["addTab"] = (tab:Tab,options) => {
  const {setActive} = options ?? {setActive:true};
  const index =  store.state.tabs.push(tab);
  console.log(store.state.tabs);
  if(setActive){
    setActiveTab(tab.id);
  }

  return index;
};

const removeTab: Store["removeTab"] = (tabId:TabId) => {
  store.state.tabs.splice(indexOfTab(tabId), 1);
};

/**
 * set active tab
 * @param {TabId} tabId 
 * @returns {number} tab index
 */

const setActiveTab: Store["setActiveTab"] = (tabId:TabId) => {
  const tabIndex = indexOfTab(tabId);
  const tab = store.state.tabs[tabIndex];
  if(!tab) {
    throwError(`Tab not found, please check the tab id: ${tabId}`);
    return -1;
  }
  store.state.activeTabId = tabId;

  return tabIndex;
};


const store: Store = {
  // debug: true,
  router: null,
  state: reactive<State>({tabs: [],activeTabId:null}),
  hasTab,
  indexOfTab,
  addTab,
  removeTab,
  setActiveTab,
};

export { store };
