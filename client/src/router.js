import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/about",
            name: "about",
            component: About,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/register",
            name: "register",
            component: Register,
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        store
            .dispatch("init")
            .then(() => {
                if (store.getters.isAuthenticated) {
                    next();
                    return;
                }
                next("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        next();
    }
});

export default router;
