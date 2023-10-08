import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PathRouter",
  setup() {
    const deactivatedCalled = ref(false);
    const unmountedCalled = ref(false);

    return { deactivatedCalled, unmountedCalled };
  },
  unmounted() {
    console.log('path unmounted');
    this.unmountedCalled = true;
  },
  deactivated() {
    console.log('path deactivated');
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
