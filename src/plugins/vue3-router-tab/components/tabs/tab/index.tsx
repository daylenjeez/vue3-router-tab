import { computed, defineComponent, PropType } from "vue";
import { Tab } from "../../../types"; //TODO: use relative path

import styles from "./style.module.less";
import { useRouterTabStore } from "../../../store";

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
    const active = computed(() => store.activeTabId === props.id);

    const classNames = computed(() => [
      styles["rt-tab"],
      active.value && styles["rt-tab-active"],
    ]);

    const click = () => {
      store.setActiveTab(props.id);
    };
    return () => (
      <div class={classNames.value} onClick={click}>
        <div></div>
        <div>{props.name}</div>
        <div></div>
      </div>
    );
  },
});
