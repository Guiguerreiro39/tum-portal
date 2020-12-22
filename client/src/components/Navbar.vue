<template>
    <div class="nav">
        <div class="nav-left">
            <router-link to="/" class="nav-link">Vermelhinhos</router-link>
            <router-link to="/about" class="nav-link">About</router-link>
        </div>
        <div class="nav-right">
            <p>Hello {{ username }}</p>
            <span @click="logout" class="nav-link">Logout</span>
        </div>
    </div>
</template>

<script>
import "es6-promise/auto";
export default {
    computed: {
        username: function() {
            return this.$store.getters.getUsername;
        },
    },
    methods: {
        logout() {
            this.$store
                .dispatch("logout")
                .then(() => {
                    this.$router.push("/");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped lang="postcss">
.nav {
    @apply fixed top-0 w-full h-14 flex justify-between items-center px-5 text-black font-medium text-lg border-b rounded-b-lg;
}
.nav-link {
    @apply mx-2 cursor-pointer;
}
.nav-right {
    @apply flex;
}
p {
    @apply mr-5 text-red-500;
}
</style>
