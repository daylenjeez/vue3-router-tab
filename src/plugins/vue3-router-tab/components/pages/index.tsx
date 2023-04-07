import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useRouterTabStore } from "../../store";

export default defineComponent({
  name: "RtPages",
  setup() {
    const store = useRouterTabStore();
    return () => (
      <div class="rt-pages">
        <RouterView />
      </div>
    );
  },
});
