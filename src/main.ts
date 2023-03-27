import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import RouterTab from "./plugins/vue3-router-tab";

const app = createApp(App);

app.use(router);
app.use(RouterTab);
app.mount("#app");
