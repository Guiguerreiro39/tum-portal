<template>
    <div class="login">
        <form
            @submit.prevent="login"
            class="flex flex-col items-center justify-center bg-white w-1/3 h-1/4 rounded-lg bg-opacity-50"
        >
            <input
                type="text"
                placeholder="Username"
                autocomplete="username"
                v-model="username"
                class="input"
                autofocus
            />
            <input
                type="password"
                placeholder="Password"
                autocomplete="current-password"
                v-model="password"
                class="input"
            />
            <button
                type="submit"
                class="bg-red-500 rounded-lg text-white py-1 px-3 text-xl font-medium mt-2 hover:bg-red-600"
            >
                Login
            </button>
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
        login: function() {
            this.$store
                .dispatch("login", {
                    username: this.username,
                    password: this.password,
                })
                .then((res) => {
                    this.$router.push("/");
                })
                .catch((err) => {
                    this.username = "";
                    this.password = "";
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped lang="postcss">
.login {
    @apply w-full h-full flex flex-col items-center justify-center;
}
.input {
    @apply w-4/5 my-2 py-2 px-2 rounded-lg outline-none;
}
.input:focus {
    @apply shadow-outline;
}
</style>
