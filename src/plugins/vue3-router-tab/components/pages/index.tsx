import {
  defineComponent,
  KeepAlive,
  resolveDynamicComponent,
  Component as DynamicComponent,
} from "vue";
import { useRouterTabStore } from "../../store";
import { RouterView } from "vue-router";

import Style from "./style.module.less";

export default defineComponent({
  name: "RtPages",
  setup() {
    return () => (
      <div class={`${Style["rt-pages"]}`}>
        <RouterView>
          {({ Component }: { Component: DynamicComponent }) => (
            <KeepAlive>{() => resolveDynamicComponent(Component)}</KeepAlive>
          )}
        </RouterView>
      </div>
    );
  },
});
