<template>
    <div class="profile">
        <Header />
        <Content />
    </div>
</template>

<script>
import Content from "../components/Profile/Content.vue";
import Header from "../components/Profile/Header.vue";
export default {
    components: {
        Content,
        Header,
    },
};
</script>

<style scoped lang="postcss">
.profile {
    @apply flex flex-col items-center h-full pt-8;
}
</style>
