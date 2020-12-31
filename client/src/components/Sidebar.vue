<template>
    <nav class="sidebar">
        <div class="side-head">
            <router-link
                to="/"
                class="side-link"
                :class="{ selected: routeName == 'home' }"
            >
                <font-awesome-icon :icon="['fas', 'home']"></font-awesome-icon>
                <p class="inline ml-3">Início</p>
            </router-link>
            <router-link
                to="/events"
                class="side-link"
                :class="{ selected: routeName == 'events' }"
            >
                <font-awesome-icon
                    :icon="['fab', 'itunes-note']"
                ></font-awesome-icon>
                <p class="inline ml-3">Eventos</p>
            </router-link>
            <router-link
                to="/rehearsals"
                class="side-link"
                :class="{ selected: routeName == 'rehearsals' }"
            >
                <font-awesome-icon
                    :icon="['fab', 'itunes-note']"
                ></font-awesome-icon>
                <p class="inline ml-3">Ensaios</p>
            </router-link>
            <router-link
                to="/about"
                class="side-link"
                :class="{ selected: routeName == 'about' }"
            >
                <font-awesome-icon
                    :icon="['fas', 'glass-cheers']"
                ></font-awesome-icon>
                <p class="inline ml-3">Festivais</p>
            </router-link>
        </div>
        <div class="side-footer">
            <div class="logout">
                <font-awesome-icon
                    :icon="['fas', 'sign-out-alt']"
                ></font-awesome-icon>
                <span @click="logout" class="ml-3">Sair</span>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        routeName: function() {
            return this.$route.name;
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
.sidebar {
    @apply fixed w-56 bottom-0 bg-red-600 rounded-tr-3xl text-white px-5 h-90 flex flex-col justify-between py-8;
}
.side-head {
    @apply flex flex-col text-lg font-medium;
}
.side-footer {
    @apply flex flex-col text-lg font-medium items-center;
}
.logout {
    @apply my-2 cursor-pointer;
}
.side-link {
    @apply my-2 w-full rounded-full py-2 text-center cursor-pointer;
}
.side-link.selected {
    @apply bg-red-500;
}
.side-link:hover:not(.selected) {
    @apply bg-gray-800 bg-opacity-25;
}
</style>
