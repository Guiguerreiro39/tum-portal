import App from "./App.vue";
import Vue from "vue";
import router from "./router";
import { store } from "./store.js";
import "./registerServiceWorker";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faFacebook,
    faYoutube,
    faInstagram,
    faSpotify,
} from "@fortawesome/free-brands-svg-icons";

import "./styles/tailwind.css";
import "./styles/global.css";

library.add(faFacebook);
library.add(faInstagram);
library.add(faYoutube);
library.add(faSpotify);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
    store,
}).$mount("#app");
