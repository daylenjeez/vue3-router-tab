import "./index.less";

import type { RouterTabStore } from "@routerTab/store";
import type { Tab, Ui } from "@routerTab/types";
import DropdownMenu from "../dropdown/index.vue";
import { computed, defineComponent, inject, ref, type PropType } from "vue";

import Close from "./close";
import Tablabel from "./label";
import clickOutside from "@routerTab/directives/clickOutside";

export default defineComponent({
  name: "RtTab",
  directives: {
    clickOutside, // Register the directive
  },
  props: {
    name: {
      type: [String, Symbol] satisfies PropType<Tab["name"]>,
      required: true,
    },
    id: {
      type: String satisfies PropType<Tab["id"]>,
      required: true,
    },
  },
  setup(props) {
    const ui = inject<Ui>("ui");
    const store = inject<RouterTabStore>("tabStore");

    const tabsLength = computed(() => store?.state.tabs.length ?? 0);
    const isActive = computed(() => store?.state.activeTab?.id === props.id);
    const showClose = computed(() => tabsLength.value > 1);

    const dropdownVisible = ref(false);
    const dropdownPosition = ref({ x: 0, y: 0 });

    const classNames = computed(() => [
      "rt-tab",
      `rt-tab--${ui}`,
      isActive.value && "rt-tab-active",
    ]);

    const click = () => {
      if (isActive.value) return;
      const tab = store?.find(props.id);
      if (tab) store?.open(tab.fullPath);
    };

    const handleClickOutside = () => {
      dropdownVisible.value = false;
    };

    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
      dropdownPosition.value = { x: event.clientX, y: event.clientY };
      dropdownVisible.value = true;
    };

    return () => (
      <div
        class={classNames.value}
        onClick={click}
        onContextmenu={handleRightClick}
      >
        <div class="rt-tab--prefix"></div>
        <Tablabel name={props.name} />
        {showClose.value && <Close id={props.id} />}
        <DropdownMenu
          v-click-outside={handleClickOutside}
          visible={dropdownVisible.value}
          position={dropdownPosition.value}
        />
      </div>
    );
  },
});
