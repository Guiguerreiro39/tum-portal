<template>
    <main id="app">
        <Home v-if="isLoggedIn" />
        <Landing v-else />
    </main>
</template>

<script>
import Home from "./containers/Home.vue";
import Landing from "./containers/Landing.vue";
export default {
    components: {
        Landing,
        Home,
    },
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isAuthenticated;
        },
    },
};
</script>

<style scoped lang="postcss">
#app {
    @apply h-full w-full;
}
</style>
