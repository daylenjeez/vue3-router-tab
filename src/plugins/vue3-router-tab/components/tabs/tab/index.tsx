import { defineComponent, PropType } from "vue";
import { Tab } from "../../../types";

export default defineComponent({
  name: "RtTab",
  props:{
    name: {
      type: String as PropType<Tab['name']>,
      required:true
    },

  },
  setup(props) {
    
    return () => <div class="rt-tab">
      <div></div>
      <div>{props.name}</div>
      <div></div>
    </div>;
  },
});
