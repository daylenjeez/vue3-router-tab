import "./index.less";

import type { RouterTabStore } from "@routerTab/store";
import { computed, defineComponent, inject } from "vue";

import RtTab from "./tab";
import { TabType } from "@routerTab/types";
import { INITIAL_TAB_TYPE } from "@routerTab/helper/utils/constants";

export default defineComponent({
  name: "RtTabs",
  setup() {
    const store = inject<RouterTabStore>("tabStore");
    const tabType = inject<TabType>("tabType") ?? INITIAL_TAB_TYPE;

    const tabs = computed(() => store?.state.tabs ?? []);
    const classNames = computed(() => ["rt-tabs", `rt-tabs--${tabType}`]);

    return () => (
      <div class={classNames.value}>
        {tabs.value.map((tab) => (
          <RtTab {...tab} key={tab.id} />
        ))}
      </div>
    );
  },
});
