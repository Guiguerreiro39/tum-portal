<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class="profile" v-if="isMounted">
            <Header :user="user" :isOwner="isOwner" />
            <Content :user="user" :isOwner="isOwner" />
        </div>
        <RotateLoader v-else color="rgba(239, 68, 68, 1)" size="2rem" />
    </div>
</template>

<script>
import Content from "../components/Profile/Content.vue";
import Header from "../components/Profile/Header.vue";

import RotateLoader from "vue-spinner/src/PulseLoader.vue";

export default {
    components: {
        Content,
        Header,
        RotateLoader,
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
    @apply flex flex-col items-center h-full w-full pt-5;
}
</style>
