import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NoKeepAliveRouter",
  setup() {
    const deactivatedCalled = ref(false);
    const unmountedCalled = ref(false);

    return { deactivatedCalled, unmountedCalled };
  },
  unmounted() {
    console.log('unmounted noKeepAliveRouter');
    this.unmountedCalled = true;
  },
  deactivated() {
    console.log('deactivated noKeepAliveRouter');
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
