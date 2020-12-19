import App from "./App.vue";
import Vue from "vue";
import router from "./router";
import store from "./store.js";
import { sync } from "vuex-router-sync";
import "./registerServiceWorker";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./styles/tailwind.css";
import "./styles/global.css";
import "./icons";

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

sync(store, router);

store.dispatch("init");

new Vue({
    router,
    render: (h) => h(App),
    store,
}).$mount("#app");
