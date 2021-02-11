<template>
    <div class="home">
        <Navbar />
        <Sidebar />
        <div class="w-full pt-20 pl-56 h-full">
            <router-view :key="$route.path" />
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
export default {
    name: "home",
    components: {
        Navbar,
        Sidebar,
    },
};
</script>

<style scoped lang="postcss">
.home {
    @apply h-full w-full bg-gray-200;
}
</style>
