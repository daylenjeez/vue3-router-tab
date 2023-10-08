import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PathRouter",
  setup() {
    const router = useRouter();
    return () => `render path ${router.currentRoute.value.fullPath}`;
  },
});
