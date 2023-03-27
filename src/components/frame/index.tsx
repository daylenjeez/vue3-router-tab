import { defineComponent } from "vue";
import "./style.less";

export default defineComponent({
  setup() {
    return () => (
      <div class="router-tab--frame">
        <header class="header">header</header>
        <div class="router-tab--body">
          <aside class="router-tab--side">side</aside>
          <main>
            <router-view />
          </main>
        </div>
      </div>
    );
  },
});
