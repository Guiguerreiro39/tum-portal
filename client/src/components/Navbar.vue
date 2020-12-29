<template>
    <div class="nav">
        <div class="nav-left">
            <router-link to="/" class="mr-10">Vermelhinhos</router-link>
        </div>
        <div class="nav-center">
            <router-link to="/events" class="nav-link">Eventos</router-link>
            <router-link to="/rehearsals" class="nav-link">Ensaios</router-link>
            <router-link to="/about" class="nav-link">Festivais</router-link>
        </div>
        <div class="nav-right" @keydown.esc="isOpen = false">
            <div class="flex items-center">
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
                <span @click="logout" class="dropdown-item">Logout</span>
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
    methods: {
        logout() {
            this.$store
                .dispatch("logout")
                .then(() => {
                    this.$router.push("/");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped lang="postcss">
.nav {
    @apply fixed top-0 w-full h-14 px-10 flex justify-between items-center text-gray-800 bg-white font-medium border-b rounded-b-lg shadow;
}
.nav-link {
    @apply mx-10 cursor-pointer;
}
.nav-right {
    @apply relative;
}
.profile-image {
    @apply block h-8 w-8 rounded-full overflow-hidden relative z-10 mr-3;
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
