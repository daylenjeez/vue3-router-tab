import { defineComponent } from "vue";
import Tabs from "./components/tabs";
import Page from "./components/page/index.vue";

export default defineComponent({
  name: "RouterTab",
  setup() {
    return () => (
      <div class="rt-container">
        <Tabs />
        <Page />
      </div>
    );
  },
});
