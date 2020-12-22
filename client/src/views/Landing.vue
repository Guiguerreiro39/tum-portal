<template>
    <div class="main">
        <div class="text">
            <h1 class="title">Os Vermelhinhos</h1>
            <div class="line"></div>
            <h2 class="description">
                O cantinho da Tuna Universitária do Minho
            </h2>
            <div class="mt-8">
                <router-link
                    to="/login"
                    class="btn border hover:border-red-500 hover:text-red-500"
                    >Entrar</router-link
                >
                <router-link
                    to="/register"
                    class="btn fill hover:bg-red-600 hover:border-red-600"
                    >Registar</router-link
                >
            </div>
        </div>
        <div class="social">
            <font-awesome-icon
                :icon="['fab', 'facebook']"
                class="icon"
                @click="socialClick(social.facebook)"
            />
            <font-awesome-icon
                :icon="['fab', 'instagram']"
                class="icon"
                @click="socialClick(social.instragram)"
            />
            <font-awesome-icon
                :icon="['fab', 'spotify']"
                class="icon"
                @click="socialClick(social.spotify)"
            />
            <font-awesome-icon
                :icon="['fab', 'youtube']"
                class="icon"
                @click="socialClick(social.youtube)"
            />
        </div>
    </div>
</template>

<script>
import { social } from "../constants/social.js";
export default {
    data() {
        return {
            social: social,
        };
    },
    methods: {
        socialClick(site) {
            window.open(site);
        },
    },
};
</script>

<style scoped lang="postcss">
.main {
    @apply h-full w-full text-white flex flex-col justify-between items-center pb-64 pt-44;
}
.title {
    @apply text-7xl font-medium;
}
.description {
    @apply text-lg;
}
.text {
    @apply flex flex-col items-center justify-center;
}
.btn {
    @apply px-3 py-1 rounded-lg text-xl mx-2 shadow font-medium;
}
.border {
    @apply border-2;
}
.fill {
    @apply bg-red-500 border-2 border-red-500;
}
.line {
    @apply bg-white h-1 w-2/3 my-4 rounded-full;
}
.icon {
    @apply text-4xl mx-6 cursor-pointer;
}
.icon:hover {
    @apply text-red-500;
}
</style>
