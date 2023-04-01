//store.js
import { reactive, computed } from "vue";

const store = {
  debug: true,

  state: reactive({
    tabs: [],
  }),
};

export { store };
