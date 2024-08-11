import { computed, defineComponent, inject } from "vue";
import RtTab from "./tab";

import "./index.less";
import { Ui } from "@routerTab/types";
import { RouterTabStore } from "@routerTab/store";

export default defineComponent({
  name: "RtTabs",
  setup() {
    const ui = inject<Ui>('ui');
    const store = inject<RouterTabStore>('tabStore')!;
    
    const tabs = computed(() => store.state.tabs);
    const classNames = computed(() => [
      "rt-tabs",
      `rt-tabs--${ui}`
    ]);

    return () => (
      <div class={classNames.value}>
        {tabs.value.map((tab) => <RtTab {...tab} key={tab.id} />)}
      </div>
    );
  },
});
