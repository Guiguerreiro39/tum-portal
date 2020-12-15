<template>
    <div class="login">
        <form @submit.prevent="login">
            <input
                type="text"
                placeholder="Username"
                autocomplete="username"
                v-model="username"
            />
            <input
                type="password"
                placeholder="Password"
                autocomplete="current-password"
                v-model="password"
            />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import router from "@/router.js";
import "es6-promise/auto";
export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        login() {
            this.$http({
                method: "post",
                url: `${process.env.VUE_APP_API}/login`,
                data: {
                    username: this.username,
                    password: this.password,
                },
                withCredentials: true,
            })
                .then((res) => {
                    this.$store.commit("setUser", res.data);
                    router.push({ name: "home" });
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style></style>
