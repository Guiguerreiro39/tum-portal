<template>
    <div id="app" :class="{ landing: !isLoggedIn }">
        <div :class="{ overlay: !isLoggedIn }">
            <Navbar v-if="isLoggedIn" />
            <router-view />
        </div>
    </div>
</template>

<script>
import "es6-promise/auto";

import Navbar from "./components/Navbar.vue";
export default {
    components: {
        Navbar,
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
.landing {
    @apply bg-center bg-cover bg-fixed bg-landing h-full w-full;
}
.overlay {
    @apply bg-gray-600 bg-opacity-60 h-full w-full;
}
</style>
