import type { RouterTabStore } from "@routerTab/store";
import {
  computed,
  defineComponent,
  inject,
} from "vue";

export default defineComponent({
  name: "RtIframe",

  setup() {
    const tabStore = inject<RouterTabStore>("tabStore");

    const iframes = computed(() => tabStore?.iframeTabs.value);

    return () => (
      <div class="rt-iframe-container">
        {
          iframes.value?.map((iframe) => (
            <iframe v-show={tabStore?.state.activeTab?.id === iframe.id} width="100%" height="100%" key={iframe.id} {...iframe.iframeAttributes}  />
          ))
        }
      </div>
    );
  },
});
