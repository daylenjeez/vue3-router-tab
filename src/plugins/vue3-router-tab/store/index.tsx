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
  isInTabs: (value: string, key: keyof Tab) => number;
}

const isInTabs: Store["isInTabs"] = (value, key) => {
  return -1;
};

const store: Store = {
  // debug: true,
  router: null,
  state: reactive<State>({
    tabs: [],
  }),
  isInTabs,
  // addTab() {},
  // removeTab() {},
};

export { store };
