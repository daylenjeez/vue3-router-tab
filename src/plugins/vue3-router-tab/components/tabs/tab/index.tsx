import { computed, defineComponent, PropType } from "vue";
import type { Tab } from "@routerTab/types";
import Tablabel from "./label";
import Close from "./close";
import { useRouterTabStore } from "@routerTab/store/_routerTab";

import styles from "./style.module.less";

export default defineComponent({
  name: "RtTab",
  props: {
    name: {
      type: String as PropType<Tab["name"]>,
      required: true,
    },
    id: {
      type: String as PropType<Tab["id"]>,
      required: true,
    },
  },
  setup(props) {
    const store = useRouterTabStore();
    const tabsLength = computed(() => store.tabs.length);
    const active = computed(() => store.activeTab?.id === props.id);

    const classNames = computed(() => [
      styles["rt-tab"],
      active.value && styles["rt-tab-active"],
    ]);

    const click = () => {
      if (active.value) return;
      store.open(props.id);
    };

    const close = (e: MouseEvent) => {
      store.close({ id: props.id });
      e.stopPropagation();
    };

    return () => (
      <div class={classNames.value} onClick={click}>
        <div></div>
        <Tablabel name={props.name} />
        {tabsLength.value > 1 && <Close id={props.id} />}
      </div>
    );
  },
});
