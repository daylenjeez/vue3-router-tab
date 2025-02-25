import { defineComponent, type PropType, provide } from "vue";

import Page from "./components/page/index.vue";
import Tabs from "./components/tabs";
import type { RouterTabProps } from "./types";
import { INITIAL_TAB_TYPE } from "./helper/utils/constants";

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
    hideClose: {
      type: Boolean satisfies PropType<RouterTabProps["hide-close"]>,
      required: false,
      default: false,
    },
    tabClass: {
      type: String satisfies PropType<RouterTabProps["tab-class"]>,
    },
    pageClass: {
      type: String satisfies PropType<RouterTabProps["page-class"]>,
    },
    dropdownClass:{
      type: String satisfies PropType<RouterTabProps["dropdown-class"]>,
    },
    tabType: {
      type: String as PropType<RouterTabProps["tab-type"]>,
      default:"line",
    },
  },

  setup(props) {
    provide("dropdownClass", props.dropdownClass);
    provide("tabClass", props.tabClass);
    provide("pageClass", props.pageClass);
    provide("tabType", props.tabType);

    return () => (
      <div class="rt-container">
        <Tabs />
        <Page />
      </div>
    );
  },
});
