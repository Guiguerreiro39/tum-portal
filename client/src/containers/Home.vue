<template>
    <div class="home">
        <Navbar />
        <div class="container mx-auto pt-14 px-10">
            <router-view />
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
    name: "home",
    components: {
        Navbar,
    },
};
</script>

<style></style>
