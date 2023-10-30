import { computed, defineComponent } from "vue";
import { useRouterTabStore } from "@routerTab/store/_routerTab";
import RtTab from "./tab";

import "./index.less";

export default defineComponent({
  name: "RtTabs",
  setup() {
    const store = useRouterTabStore();
    const tabs = computed(() => store.tabs);

    return () => (
      <div class="rt-tabs">
        {tabs.value.map((tab) => <RtTab {...tab} key={tab.id} />)}
      </div>
    );
  },
});
