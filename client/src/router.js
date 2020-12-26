import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import Home from "./views/Home.vue";
import Landing from "./views/Landing.vue";
import About from "./views/About.vue";
import Profile from "./views/Profile.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Edit from "./views/Edit.vue";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: {
                render(c) {
                    if (store.getters.isAuthenticated) return c(Home);

                    return c(Landing);
                },
            },
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
            path: "/profile",
            name: "profile",
            component: Profile,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/profile/edit",
            name: "edit",
            component: Edit,
            meta: {
                requiresAuth: true,
            },
        },

        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                requiresNotAuth: true,
            },
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                requiresNotAuth: true,
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next();
            return;
        }
        next("/login");
    } else if (to.matched.some((record) => record.meta.requiresNotAuth)) {
        if (!store.getters.isAuthenticated) {
            next();
            return;
        }
        next("/");
    } else {
        next();
    }
});

export default router;
