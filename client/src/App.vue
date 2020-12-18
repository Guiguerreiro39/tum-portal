<template>
    <div id="app" :class="{ landing: !isLoggedIn }">
        <div :class="{ overlay: !isLoggedIn }">
            <Navbar v-if="isLoggedIn" />
            <router-view />
        </div>
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

import { store } from "@/store.js";
import "es6-promise/auto";
export default {
    components: {
        Navbar,
    },
    computed: {
        isLoggedIn: function() {
            const user = this.$store.getters.getUser;
            return user.username.length > 0;
        },
    },
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
