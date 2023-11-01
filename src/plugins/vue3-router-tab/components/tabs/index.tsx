import { computed, defineComponent, inject } from "vue";
import { useRouterTabStore } from "@routerTab/store/_routerTab";
import RtTab from "./tab";

import "./index.less";
import { Ui } from "@routerTab/types";

export default defineComponent({
  name: "RtTabs",
  setup() {
    const ui = inject<Ui>('ui');
    
    const store = useRouterTabStore();
    const tabs = computed(() => store.tabs);
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
