<template>
    <div class="background">
        <div class="landing">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: "landing",
};
</script>

<style scoped lang="postcss">
.landing {
    @apply h-full w-full bg-gray-600 bg-opacity-60;
}
.background {
    @apply bg-center bg-cover bg-fixed bg-landing h-full w-full;
}
</style>
