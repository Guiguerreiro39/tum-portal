<template>
    <div id="app">
        <Navbar />
        <router-view />
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
    @apply pt-14 h-full w-full;
}
</style>
