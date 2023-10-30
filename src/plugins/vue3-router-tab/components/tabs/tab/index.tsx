import { computed, defineComponent, PropType } from "vue";
import type { Tab } from "@routerTab/types";
import Tablabel from "./label";
import Close from "./close";
import { useRouterTabStore } from "@routerTab/store/_routerTab";
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
    const store = useRouterTabStore();
    const tabsLength = computed(() => store.tabs.length);
    const active = computed(() => store.activeTab?.id === props.id);

    const classNames = computed(() => [
      "rt-tab",
      active.value && "rt-tab-active",
    ]);

    const click = () => {
      if (active.value) return;
      store.open(props.id);
    };

    return () => (
      <div class={classNames} onClick={click}>
        <div class="rt-tab--pre"></div>
        <Tablabel name={props.name} />
        {tabsLength.value > 1 && <Close id={props.id} />}
      </div>
    );
  },
});
