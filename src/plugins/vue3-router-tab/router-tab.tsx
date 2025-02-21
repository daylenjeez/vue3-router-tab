import { defineComponent, type PropType, provide } from "vue";

import Page from "./components/page/index.vue";
import Tabs from "./components/tabs";
import type { RouterTabProps, Ui } from "./types";

interface Props {
  maxAlive?: RouterTabProps["max-alive"];
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
      type: Number satisfies PropType<RouterTabProps["max-alive"]>,
      required: false,
      default: 10,
    },
    ui: {
      type: String as PropType<Ui>,
      required: false,
      default: "initial",
    },
    hideClose: {
      type: Boolean satisfies PropType<RouterTabProps["hide-close"]>,
      required: false,
      default: false,
    },
    tabClass: {
      type: String satisfies PropType<RouterTabProps["tab-class"]>,
      required: false,
      default: "",
    },
    pageClass: {
      type: String satisfies PropType<RouterTabProps["page-class"]>,
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
