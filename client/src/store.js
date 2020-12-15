import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            username: "",
            fullName: "",
        },
    },
    mutations: {
        setUser(state, user) {
            state.user.username = user.username;
            state.user.fullName = user.fullName;
        },
    },
    getters: {
        getUser: (state) => {
            return state.user;
        },
    },
});
