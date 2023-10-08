import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FullPathRouter",
  setup() {
    const router = useRouter();
    return () => router.currentRoute.value.fullPath;
  },
});
