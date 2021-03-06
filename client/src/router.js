import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import Home from "./views/Home.vue";
import Landing from "./views/Landing.vue";
import Profile from "./views/Profile.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Rehearsals from "./views/Rehearsals.vue";
import Events from "./views/Events.vue";
import Vote from "./views/Vote.vue";
import Ranking from "./views/Ranking.vue";
import Guide from "./views/Guide.vue";
import Settings from "./views/Settings.vue";

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
            path: "/rehearsals",
            name: "rehearsals",
            component: Rehearsals,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/vote",
            name: "vote",
            component: Vote,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/ranking",
            name: "ranking",
            component: Ranking,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/guide",
            name: "guide",
            component: Guide,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/events",
            name: "events",
            component: Events,
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
            path: "/profile/:id",
            name: "user",
            component: Profile,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/settings",
            name: "settings",
            component: Settings,
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
