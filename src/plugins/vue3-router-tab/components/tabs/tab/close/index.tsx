import {  PropType, defineComponent } from "vue";
import { useRouterTabStore } from "../../../../store";
import ElementClose from '../../../elementPlus/icon/close';
import { TabId } from "@routerTab/types";
import styles from './style.module.less';

export default defineComponent({
  name: "RtTab",
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
      <div class={styles['remove-icon']} onClick={close}>
        <ElementClose />
      </div>
    );
  },
});
