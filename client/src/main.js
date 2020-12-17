import App from "./App.vue";
import Vue from "vue";
import router from "./router";
import { store } from "./store.js";
import "./registerServiceWorker";

import "./styles/tailwind.css";
import "./styles/global.css";

import axios from "axios";

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
    store,
}).$mount("#app");
