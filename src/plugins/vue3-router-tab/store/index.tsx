//store.js
import { reactive, Ref } from "vue";
import { Router } from "vue-router";
import { Tab } from "../types/global";

interface State {
  tabs: Tab[];
}

interface Store {
  router: null | Router;
  state: State;
  hasTab: (value: string, key: keyof Tab) => number;
  addTab: (value: Router) => number;
  removeTab: (value: Tab) => number;
}

const hasTab: Store["hasTab"] = (value, key) => {
  return -1;
};

const addTab: Store["addTab"] = (value) => {
  console.log(value);
  return -1;
};

const removeTab: Store["removeTab"] = (value) => {
  console.log(value);
  return -1;
};

const store: Store = {
  // debug: true,
  router: null,
  state: reactive<State>({
    tabs: [],
  }),
  hasTab,
  addTab,
  removeTab,
};

export { store };
