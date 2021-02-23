<template>
    <div class="modal">
        <div>
            <button class="btn-exit" @click="$emit('closeModal')">
                <font-awesome-icon :icon="['fas', 'times']" />
            </button>
        </div>
        <div class="flex flex-col items-start h-full overflow-auto box-border">
            <div v-for="(user, index) in optionUsers" :key="index" class="my-2">
                <router-link
                    :to="'/profile/' + user.id"
                    class="flex items-center"
                >
                    <img
                        :src="profileImageURL(user)"
                        alt="User Profile Image"
                        class="user-image"
                    />
                    <p class="username">{{ user.username }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["users"],
    data() {
        return {
            optionUsers: [],
        };
    },
    created() {
        this.users.forEach((u) => {
            this.$store
                .dispatch("getUser", u)
                .then((res) => {
                    this.optionUsers.push(res.user);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    },
    methods: {
        profileImageURL(user) {
            return `${user.profileImage}?rnd=${Date.now()}`;
        },
    },
};
</script>

<style scoped lang="postcss">
.modal {
    @apply bg-white w-1/4 h-3/4 absolute inset-x-0 top-20 mx-auto pr-4 pl-8 pt-14 pb-5 rounded-lg shadow-md z-10;
}
.btn-exit {
    @apply text-gray-300 text-2xl absolute right-4 top-2;
}
.btn-exit:focus {
    @apply outline-none;
}
.btn-exit:hover {
    @apply text-red-500;
}
.user-image {
    @apply h-8 w-8 object-cover rounded-full inline;
}
.username {
    @apply inline capitalize font-medium pl-2 text-lg;
}
</style>
