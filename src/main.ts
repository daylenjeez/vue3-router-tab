import { createApp } from "vue";

import App from "./App.vue";
import RouterTab from "./plugins/vue3-router-tab";
import router from "./router";

const app = createApp(App);

app.use(router);

app.use(RouterTab, { router});
app.mount("#app");
