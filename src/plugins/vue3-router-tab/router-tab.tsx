import { defineComponent } from "vue";
import Header from "./components/header";
import Main from "./components/main";

export default defineComponent({
  setup() {
    return () => (
      <div class="router-tab">
        <Header />
        <Main />
      </div>
    );
  },
});
