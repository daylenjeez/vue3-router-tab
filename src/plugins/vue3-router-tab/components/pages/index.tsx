import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "RtPages",
  setup() {
    return () => <div class="rt-pages">
      < RouterView/>
    </div>;
  },
});
