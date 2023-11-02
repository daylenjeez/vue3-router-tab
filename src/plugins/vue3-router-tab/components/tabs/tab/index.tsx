import { computed, defineComponent, inject, PropType } from "vue";
import type { Tab, Ui } from "@routerTab/types";
import { useRouterTabStore } from "@routerTab/store/_routerTab";
import Tablabel from "./label";
import Close from "./close";
import "./index.less";

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
    const ui = inject<Ui>('ui');
    
    const store = useRouterTabStore();
    const tabsLength = computed(() => store.tabs.length);
    const active = computed(() => store.activeTab?.id === props.id);

    const classNames = computed(() => [
      "rt-tab",
      `rt-tab--${ui}`,
      active.value && "rt-tab-active",
    ]);

    const click = () => {
      if (active.value) return;
      store.open(props.id);
    };

    return () => (
      <div class={classNames.value} onClick={click}>
        <div class="rt-tab--pre"></div>
        <Tablabel name={props.name} />
        {tabsLength.value > 1 && <Close id={props.id} />}
      </div>
    );
  },
});
