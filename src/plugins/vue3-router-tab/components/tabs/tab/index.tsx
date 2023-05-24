import { computed, defineComponent, PropType } from "vue";
import { Tab } from "../../../types"; //TODO: use relative path

import styles from "./style.module.less";
import { useRouterTabStore } from "../../../store";

export default defineComponent({
  name: "rt-tab",
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
      if (active.value) return;
      store.open(props.id);
    };

    const close = (e: MouseEvent) => {
      store.close(props.id);
      e.preventDefault();
    };

    return () => (
      <div class={classNames.value} onClick={click}>
        <div></div>
        <div>{props.name}</div>
        <div onClick={close}>x</div>
      </div>
    );
  },
});
