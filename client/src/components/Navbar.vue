<template>
    <div class="nav">
        <div class="nav-left">
            <router-link to="/" class="nav-link">Vermelhinhos</router-link>
            <router-link to="/about" class="nav-link">About</router-link>
        </div>
        <div class="nav-right">
            <router-link to="/login" v-if="!isLoggedIn" class="nav-link"
                >Login</router-link
            >
            <p v-if="isLoggedIn">Hello {{ username }}</p>
            <router-link to="/logout" v-if="isLoggedIn" class="nav-link"
                >Logout</router-link
            >
        </div>
    </div>
</template>

<script>
import "es6-promise/auto";
export default {
    computed: {
        isLoggedIn: function() {
            const user = this.$store.getters.getUser;
            return user.username.length > 0;
        },
        username: function() {
            const user = this.$store.getters.getUser;
            return user.username;
        },
    },
};
</script>

<style scoped lang="postcss">
.nav {
    @apply fixed top-0 w-full h-14 flex justify-between items-center px-5 text-black font-medium bg-gray-200 text-lg;
}
.nav-link {
    @apply mx-2;
}
.nav-right {
    @apply flex;
}
p {
    @apply mr-5 text-red-500;
}
</style>
