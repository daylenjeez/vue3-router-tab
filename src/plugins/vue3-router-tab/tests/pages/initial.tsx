import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "InitialRouter",
  setup() {
    const deactivatedCalled = ref(false);

    return { deactivatedCalled };
  },
  deactivated() {
    this.deactivatedCalled = true;
  },
  activated() {
    this.deactivatedCalled = false;
  },
  render() {
    const router = useRouter();
    return router.currentRoute.value.fullPath;
  }
});
