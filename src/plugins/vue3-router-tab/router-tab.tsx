import { PropType, defineComponent } from "vue";
import Tabs from "./components/tabs";
import Page from "./components/page/index.vue";
import { RouterTabConfig } from "./types";

export default defineComponent({
  name: "RouterTab",
  props: {
    maxAlive: {
      type: Number as PropType<RouterTabConfig['max-alive']>,
      required: false,
      default: 10
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
