import { defineComponent } from "vue";
import Tabs from "./components/tabs";
import Pages from "./components/pages/index.vue";

export default defineComponent({
  name: "router-tab",
  setup() {
    return () => (
      <div class="rt-container">
        <Tabs />
        <Pages />
      </div>
    );
  },
});
