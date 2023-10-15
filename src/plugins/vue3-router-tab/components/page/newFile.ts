import { defineComponent, computed } from "vue";
import { useRouterTab } from "../../store";

export default defineComponent({
  name: "RtPages",
  props: {
    name: {
      type: String as PropType<Tab["name"]>,
      required: true,
    },
    id: {
      type: String as PropType<Tab["id"]>,
      required: true,
    },
  },
  setup(props) {
    const tabStore = useRouterTab();

    const tab = computed(tabStore.getActiveTab);

    return {
      key: tab.value?.id,
      tab,
    };
  },
});
