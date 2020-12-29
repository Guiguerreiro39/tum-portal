<template>
    <div class="py-4">
        <div
            v-for="(user, index) in users"
            :key="index"
            class="flex justify-start cursor-pointer py-1 pl-10 my-1 rounded-full select-none"
            :class="[
                selected.includes(index)
                    ? 'bg-red-500 text-white'
                    : 'hover:bg-gray-200',
                side === 'left' ? 'mr-10' : 'ml-10',
            ]"
            @click="toggleUser(index)"
        >
            <img
                :src="profileImageURL(user.profileImage)"
                alt="User Profile Image"
                class="h-6 w-6 object-cover rounded-full"
            />
            <h1 class="ml-2 capitalize font-medium">
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
        profileImageURL(url) {
            return `${process.env.VUE_APP_API}/${url}`;
        },
        toggleUser(user) {
            const index = this.selected.indexOf(user);
            if (index !== -1) {
                this.selected.splice(index, 1);
            } else {
                this.selected.push(user);
            }
        },
    },
};
</script>

<style></style>
