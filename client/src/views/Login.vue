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
                class="text-input w-2/3 my-2"
                autofocus
            />
            <input
                type="password"
                placeholder="Password"
                autocomplete="current-password"
                v-model="password"
                class="text-input w-2/3 my-2"
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
</style>
