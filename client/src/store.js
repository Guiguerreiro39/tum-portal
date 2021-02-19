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
        update_user(state, user) {
            state.user = {
                ...state.user,
                ...user,
            };
        },
    },
    getters: {
        getUsername: (state) => state.user.username,
        getFullName: (state) => state.user.fullName,
        getInstrument: (state) => state.user.instrument,
        getVoice: (state) => state.user.voice,
        getContact: (state) => state.user.contact,
        getEmail: (state) => state.user.email,
        getResidence: (state) => state.user.residence,
        getID: (state) => state.user.id,
        getProfileImage: (state) => state.user.profileImage,
        getConfigurations: (state) => state.user.configurations,
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
                        if (res.data.success) {
                            const user = res.data.user;
                            commit("auth_success", user);
                        } else {
                            throw new Error("User does not exist!");
                        }
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
                        resolve(res);
                    })
                    .catch((err) => {
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
        fileUpload({ commit }, file) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                formData.append("image", file);

                axios({
                    method: "put",
                    url: `${process.env.VUE_APP_API}/user/${this.getters.getID}`,
                    data: formData,
                    withCredentials: true,
                })
                    .then((res) => {
                        commit("update_user", {
                            profileImage: res.data.user.profileImage,
                        });
                        resolve(res.data.user.profileImage);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        updateUser({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    method: "put",
                    url: `${process.env.VUE_APP_API}/user/${this.getters.getID}`,
                    data: payload,
                    withCredentials: true,
                })
                    .then((res) => {
                        commit("update_user", res.data.user);
                        resolve(res.data.user);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        getUser(_, id) {
            return new Promise((resolve, reject) => {
                axios({
                    method: "get",
                    url: `${process.env.VUE_APP_API}/user/${id}`,
                    withCredentials: true,
                })
                    .then((res) => {
                        resolve(res.data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        getAllUsers() {
            return new Promise((resolve, reject) => {
                axios({
                    method: "get",
                    url: `${process.env.VUE_APP_API}/users`,
                    withCredentials: true,
                })
                    .then((res) => {
                        resolve(res.data.users);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        getAllEvents() {
            return new Promise((resolve, reject) => {
                axios({
                    method: "get",
                    url: `${process.env.VUE_APP_API}/events`,
                    withCredentials: true,
                })
                    .then((res) => {
                        resolve(res.data.events);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
    },
});

export default store;
