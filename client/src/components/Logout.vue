<template></template>

<script>
import router from "@/router.js";
import "es6-promise/auto";
export default {
    created() {
        this.$http({
            method: "get",
            url: `${process.env.VUE_APP_API}/logout`,
            withCredentials: true,
        })
            .then((res) => {
                this.$store.commit("setUser", {
                    username: "",
                    fullName: "",
                });
                router.push({ name: "home" });
            })
            .catch((err) => {
                router.push({ name: "home" });
            });
    },
};
</script>
