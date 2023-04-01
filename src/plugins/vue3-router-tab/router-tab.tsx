import { defineComponent } from "vue";
import Tabs from "./components/tabs";
import Pages from "./components/pages";

export default defineComponent({
  setup() {
    return () => (
      <div class="rt-container">
        <Tabs />
        <Pages />
      </div>
    );
  },
});
