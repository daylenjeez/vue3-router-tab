import "./index.less";

import type { RouterTabStore } from "@routerTab/store";
import type { Ui } from "@routerTab/types";
import { computed, defineComponent, inject } from "vue";

import RtTab from "./tab";

export default defineComponent({
  name: "RtTabs",
  setup() {
    const ui = inject<Ui>("ui");
    const store = inject<RouterTabStore>("tabStore");

    const tabs = computed(() => store?.state.tabs ?? []);
    const classNames = computed(() => ["rt-tabs", `rt-tabs--${ui}`]);

    return () => (
      <div class={classNames.value}>
        {tabs.value.map((tab) => (
          <RtTab {...tab} key={tab.id} />
        ))}
      </div>
    );
  },
});
