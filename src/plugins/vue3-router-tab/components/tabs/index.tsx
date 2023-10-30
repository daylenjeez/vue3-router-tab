import { computed, defineComponent } from "vue";
import { useRouterTabStore } from "@routerTab/store/_routerTab";
import RtTab from "./tab";

import styles from "./index.module.less";

export default defineComponent({
  name: "RtTabs",
  setup() {
    const store = useRouterTabStore();
    const tabs = computed(() => store.tabs);

    return () => (
      <div class={styles["rt-tabs"]}>
        {tabs.value.map((tab) => <RtTab {...tab} key={tab.id} />)}
      </div>
    );
  },
});
