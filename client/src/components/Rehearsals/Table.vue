<template>
    <div class="my-4 overflow-auto">
        <div
            v-for="(user, index) in users"
            :key="index"
            class="users"
            :class="[
                selected.includes(index)
                    ? 'bg-red-500 text-white'
                    : 'hover:bg-gray-100',
                side === 'left' ? 'mr-10' : 'ml-10',
            ]"
            @click="toggleUser(index)"
        >
            <img
                :src="profileImageURL(user)"
                alt="User Profile Image"
                class="user-image"
            />
            <h1 class="username">
                {{ user.username }}
            </h1>
        </div>
    </div>
</template>

<script>
export default {
    props: ["users", "selectedUsers", "side"],
    data() {
        return {
            selected: this.selectedUsers,
        };
    },
    watch: {
        selectedUsers: function() {
            if (this.selectedUsers.length === 0)
                this.selected = this.selectedUsers;
        },
    },
    methods: {
        toggleUser(user) {
            const index = this.selected.indexOf(user);
            if (index !== -1) {
                this.selected.splice(index, 1);
            } else {
                this.selected.push(user);
            }
        },
        profileImageURL(user) {
            return `${user.profileImage}?rnd=${Date.now()}`;
        },
    },
};
</script>

<style scoped lang="postcss">
.users {
    @apply flex justify-start cursor-pointer py-1 pl-10 my-1 rounded-full select-none;
}
.user-image {
    @apply h-6 w-6 object-cover rounded-full;
}
.username {
    @apply ml-2 capitalize font-medium;
}
</style>
