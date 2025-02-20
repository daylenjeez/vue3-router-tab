import { defineComponent, type PropType, provide } from "vue";

import Page from "./components/page/index.vue";
import Tabs from "./components/tabs";
import type { RouterTabConfig, Ui } from "./types";

interface Props {
  maxAlive?: RouterTabConfig["max-alive"];
  ui?: Ui;
}

export default defineComponent({
  name: "RouterTab",
  components: {
    Tabs,
    Page,
  },
  props: {
    maxAlive: {
      type: Number satisfies PropType<RouterTabConfig["max-alive"]>,
      required: false,
      default: 10,
    },
    ui: {
      type: String as PropType<Ui>,
      required: false,
      default: "initial",
    },
    hideClose: {
      type: Boolean satisfies PropType<RouterTabConfig["hide-close"]>,
      required: false,
      default: false,
    },
    tabsClass: {
      type: String satisfies PropType<RouterTabConfig["tabs-class"]>,
      required: false,
      default: "",
    },
    pageClass: {
      type: String satisfies PropType<RouterTabConfig["page-class"]>,
      required: false,
      default: "",
    },
  },

  setup(props: Props) {
    provide("ui", props.ui);

    return () => (
      <div class="rt-container">
        <Tabs />
        <Page />
      </div>
    );
  },
});
