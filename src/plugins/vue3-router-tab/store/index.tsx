//store.js
import { reactive, Ref } from "vue";
import { Router } from "vue-router";

interface State {
  tabs: any[];
}

interface Store {
  router: null | Router;
  state: State;
}

const store: Store = {
  // debug: true,
  router: null,
  state: reactive<State>({
    tabs: [],
  }),
  // addTab() {},
  // removeTab() {},
};

export { store };
