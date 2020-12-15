<template>
    <div id="app">
        <div id="nav">
            <router-link to="/" username="asdsd">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/login" v-if="!isLoggedIn">Login</router-link> |
            <router-link to="/logout" v-if="isLoggedIn">Logout</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
import { store } from "@/store.js";
import "es6-promise/auto";
export default {
    created() {
        this.$http({
            method: "get",
            url: `${process.env.VUE_APP_API}/user`,
            withCredentials: true,
        }).then((res) => {
            if (typeof res.data.username !== "undefined") {
                this.$store.commit("setUser", {
                    username: res.data.username,
                    fullName: res.data.fullName,
                });
            }
        });
    },
    computed: {
        isLoggedIn: function() {
            const user = this.$store.getters.getUser;
            return user.username.length > 0;
        },
    },
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
