import "./index.less";

import InitialClose from "@routerTab/components/ui/initial/icon/close";
import { RouterTabStore } from "@routerTab/store";
import { TabId } from "@routerTab/types";
import { defineComponent, inject, PropType } from "vue";

export default defineComponent({
  name: "RtTabClose",
  props: {
    id: {
      type: String satisfies PropType<TabId>,
      required: true,
    },
  },
  setup(props) {
    const store = inject<RouterTabStore>("tabStore")!;

    const close = (e: MouseEvent) => {
      store.close({ id: props.id });
      e.stopPropagation();
    };

    return () => (
      <div class="remove-icon" onClick={close}>
        <InitialClose />
      </div>
    );
  },
});
