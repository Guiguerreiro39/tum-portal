<template>
    <div class="home">
        <h1 class="title">O Portal dos Vermelhinhos!</h1>
        <h2>O cantinho da Tuna Universitária do Minho</h2>
    </div>
</template>

<script>
import "es6-promise/auto";
export default {
    name: "home",
};
</script>

<style lang="postcss" scoped>
.home {
    @apply flex flex-col items-center pt-10 bg-center bg-cover bg-fixed bg-landing h-full w-full text-white;
}
.title {
    @apply text-4xl;
}
</style>
