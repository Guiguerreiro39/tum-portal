<template>
    <div class="profile" v-if="isMounted">
        <Header :user="user" :isOwner="isOwner" />
        <Content :user="user" :isOwner="isOwner" />
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
    data() {
        return {
            isOwner: Boolean,
            user: {},
            isMounted: false,
        };
    },
    created() {
        const id = this.$route.params.id
            ? this.$route.params.id
            : this.$store.getters.getID;

        this.$store
            .dispatch("getUser", id)
            .then((data) => {
                this.isOwner = data.isOwner;
                this.user = data.user;
                this.isMounted = true;
            })
            .catch((err) => {
                console.log("Something went wrong");
            });
    },
};
</script>

<style scoped lang="postcss">
.profile {
    @apply flex flex-col items-center h-full;
}
</style>
