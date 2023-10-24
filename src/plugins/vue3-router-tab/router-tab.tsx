import { PropType, defineComponent } from "vue";
import Tabs from "./components/tabs";
import Page from "./components/page/index.vue";
import { RouterTabConfig, Ui } from "./types";

export default defineComponent({
  name: "RouterTab",
  props: {
    maxAlive: {
      type: Number as PropType<RouterTabConfig['max-alive']>,
      required: false,
      default: 10
    },
    ui:{
      type:String as PropType<Ui>,
      required:false,
      default:undefined
    }
  },
  setup() {
    return () => (
      <div class="rt-container">
        <Tabs />
        <Page />
      </div>
    );
  },
});
