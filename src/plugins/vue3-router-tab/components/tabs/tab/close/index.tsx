import {  PropType, defineComponent } from "vue";
import { useRouterTabStore } from "@routerTab/store";
import { TabId } from "@routerTab/types";
import InitialClose from "@routerTab/components/ui/initial/icon/close";
import './index.less';

export default defineComponent({
  name: "RtTabClose",
  props: {
    id: {
      type: String as PropType<TabId>,
      required: true,
    },
  },
  setup(props) {
    const store = useRouterTabStore();
    
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
