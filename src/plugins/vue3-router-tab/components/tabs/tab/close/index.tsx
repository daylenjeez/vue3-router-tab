import {  PropType, defineComponent,inject } from "vue";
import { useRouterTabStore } from "@routerTab/store";
import { TabId, Ui } from "@routerTab/types";
import ElementClose from "@routerTab/components/elementPlus/icon/close";
import styles from './style.module.less';

type Close = typeof ElementClose;

const CLOSE_ICON:{[k in Ui]:Close} = {
  elementPlus: ElementClose,
  initial:ElementClose,
  ant:ElementClose,
  naviUi:ElementClose,
  tailWind:ElementClose
};

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
    const ui = inject<Ui>('ui');
    
    const close = (e: MouseEvent) => {
      store.close({ id: props.id });
      e.stopPropagation();
    };

    const CloseComponent = CLOSE_ICON[ui ?? 'elementPlus'];
    
    return () => (
      <div class={styles['remove-icon']} onClick={close}>
        <CloseComponent />
      </div>
    );
  },
});
