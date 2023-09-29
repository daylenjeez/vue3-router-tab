import { PropType, defineComponent } from "vue";
import { Tab } from "../../../../types";
import styles from './style.module.less';

export default defineComponent({
  name: "RtTab",
  props: {
    name: {
      type: String as PropType<Tab["name"]>,
      required: false,
      default: void 0
    }
  },
  setup(props) {
    return () => (
      <div class={styles['rt-tab-labe']}>
        {props.name}
      </div>
    );
  }
});
