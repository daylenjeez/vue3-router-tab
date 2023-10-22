import { computed, defineComponent, PropType } from "vue";
import { Tab } from "../../../types"; //TODO: use relative path
import Tablabel from "./label";
import { useRouterTabStore } from "../../../store/_routerTab";
import ElementClose from '../../elementUi/icon/close';

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
        {tabsLength.value > 1 && <div class={styles['remove-icon']} onClick={close}>
          <ElementClose style={{width:'1em'}} />
        </div>}
      </div>
    );
  },
});
