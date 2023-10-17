import { computed, defineComponent, PropType } from "vue";
import { Tab } from "../../../types"; //TODO: use relative path
import Tablabel from "./label";

import styles from "./style.module.less";
import { useRouterTabStore } from "../../../store/routerTab";

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
        {tabsLength.value > 1 && <div onClick={close}>x</div>}
      </div>
    );
  },
});
