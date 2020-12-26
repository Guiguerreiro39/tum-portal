<template>
    <div class="home">
        <Navbar />
        <div class="container mx-auto pt-14 h-full">
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

<style scoped lang="postcss">
.home {
    @apply h-full w-full bg-gray-200;
}
</style>
