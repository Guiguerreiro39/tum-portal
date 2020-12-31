<template>
    <div class="home">
        <Navbar />
        <Sidebar />
        <div class="container mx-auto pt-14 h-full ">
            <router-view />
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
