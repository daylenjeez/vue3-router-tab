import { createApp } from "vue";

import App from "./App.vue";
import RouterTab from "vue3-tabor";
import router from "./router";

import "vue3-tabor/dist/assets/index.css";

const app = createApp(App);

app.use(router);

app.use(RouterTab, { router });
app.mount("#app");
