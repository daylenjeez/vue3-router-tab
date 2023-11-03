import { PropType, defineComponent } from "vue";
import { Tab } from "@routerTab/types";
import './index.less';

export default defineComponent({
  name: "RtTabLabel",
  props: {
    name: {
      type: String as PropType<Tab["name"]>,
      required: false,
      default: void 0
    }
  },
  setup(props) {
    return () => (
      <div class="rt-tab-label">
        <span>
          {props.name}
        </span>
      </div>
    );
  }
});
