import { computed, defineComponent, inject, PropType } from "vue";
import type { Tab, Ui } from "@routerTab/types";
import Tablabel from "./label";
import Close from "./close";
import "./index.less";
import { RouterTabStore } from "@routerTab/store";

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
    const store = inject<RouterTabStore>('tabStore')!;
    
    const tabsLength = computed(() => store.state.tabs.length);
    const active = computed(() => store.state.activeTab?.id === props.id);
    const showClose = computed(() => tabsLength.value > 1);

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
        {showClose.value && <Close id={props.id} />}
      </div>
    );
  },
});
