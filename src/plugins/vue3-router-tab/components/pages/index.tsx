import {
  computed,
  defineComponent,
  KeepAlive,
  resolveDynamicComponent,
  Component as DynamicComponent,
} from "vue";
import { useRouterTabStore } from "../../store";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "RtPages",
  setup() {
    const store = useRouterTabStore();
    const activeTab = computed(store.getTab);
    return () => (
      <div class="rt-pages">
        <RouterView>
          {({ Component }: { Component: DynamicComponent }) =>
            activeTab.value?.keepAlive ? (
              <KeepAlive>{() => resolveDynamicComponent(Component)}</KeepAlive>
            ) : (
              resolveDynamicComponent(Component)
            )
          }
        </RouterView>
      </div>
    );
  },
});
