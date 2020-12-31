<template>
    <div class="nav">
        <div class="nav-left">
            <router-link to="/" class="mr-10">Vermelhinhos</router-link>
        </div>
        <div class="nav-right" @keydown.esc="isOpen = false">
            <div class="flex items-center">
                <font-awesome-icon
                    :icon="['far', 'bell']"
                    class="text-xl"
                ></font-awesome-icon>
                <button class="profile-image" @click="isOpen = !isOpen">
                    <img
                        class="w-full h-full object-cover"
                        :src="profileImageURL"
                        alt="Profile Image"
                    />
                </button>
                <p class="capitalize">{{ username }}</p>
            </div>
            <button
                v-if="isOpen"
                @click="isOpen = false"
                tabindex="-1"
                class="fixed inset-0 h-full w-full cursor-default focus:outline-none"
            ></button>
            <div class="dropdown" v-if="isOpen" @click="isOpen = false">
                <span class="dropdown-item">Settings</span>
                <router-link to="/profile" class="dropdown-item"
                    >Profile</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            isOpen: false,
            now: Date.now(),
        };
    },
    computed: {
        ...mapGetters({
            profileImage: "getProfileImage",
            username: "getUsername",
        }),
        profileImageURL: function() {
            this.now = Date.now();
            return `${process.env.VUE_APP_API}/${this.profileImage}?rnd=${this.now}`;
        },
    },
};
</script>

<style scoped lang="postcss">
.nav {
    @apply fixed top-0 w-full px-10 mt-4 flex justify-between items-center text-gray-800 font-medium;
}
.nav-right {
    @apply relative;
}
.profile-image {
    @apply block h-8 w-8 rounded-full overflow-hidden relative z-10 mr-2 ml-5;
}
.profile-image:focus {
    @apply outline-none;
}
.dropdown-item {
    @apply block px-4 py-2 cursor-pointer;
}
.dropdown-item:hover {
    @apply bg-gray-400 text-gray-800;
}
.dropdown {
    @apply w-48 mt-2 py-2 absolute right-0 bg-white rounded-lg shadow-md overflow-hidden;
}
</style>
