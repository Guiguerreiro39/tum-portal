import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        status: "",
        user: {},
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },
        auth_success(state, user) {
            state.status = "success";
            state.user = user;
        },
        auth_error(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = "";
        },
    },
    getters: {
        getUsername: (state) => state.user.username,
        isAuthenticated: (state) => state.status === "success",
        authStatus: (state) => state.status,
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                    method: "post",
                    url: `${process.env.VUE_APP_API}/login`,
                    withCredentials: true,
                    data: user,
                })
                    .then((res) => {
                        const user = res.data.user;
                        commit("auth_success", user);
                        resolve(res);
                    })
                    .catch((err) => {
                        commit("auth_error");
                        reject(err);
                    });
            });
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                    method: "post",
                    url: `${process.env.VUE_APP_API}/user`,
                    data: user,
                    withCredentials: true,
                })
                    .then((res) => {
                        const user = res.data.user;
                        commit("auth_success");
                        resolve(res);
                    })
                    .catch((err) => {
                        commit("auth_error");
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                axios({
                    method: "get",
                    url: `${process.env.VUE_APP_API}/logout`,
                    withCredentials: true,
                })
                    .then(() => {
                        commit("logout");
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        init({ commit }) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                    method: "get",
                    url: `${process.env.VUE_APP_API}/user`,
                    withCredentials: true,
                })
                    .then((res) => {
                        if (typeof res.data.user !== "undefined") {
                            commit("auth_success", res.data.user);
                            resolve("authenticated");
                        } else {
                            commit("logout");
                            resolve("notAuthenticated");
                        }
                    })
                    .catch((err) => {
                        commit("auth_error");
                        reject(err);
                    });
            });
        },
    },
});

export default store;
