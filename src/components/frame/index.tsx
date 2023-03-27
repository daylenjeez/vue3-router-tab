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
            <ul class="router-tab--nav">
              <li class="router-tab--nav-item">页面1</li>
              <li class="router-tab--nav-item">页面2</li>
            </ul>
            <div>
              <router-view />
            </div>
          </main>
        </div>
      </div>
    );
  },
});
