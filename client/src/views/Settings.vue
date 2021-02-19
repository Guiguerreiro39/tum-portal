<template>
    <div class="h-full w-full p-10 pt-5">
        <div
            class="w-full bg-white shadow-md rounded-lg divide-solid divide-x overflow-hidden grid grid-cols-6 p-10"
        >
            <div class="col-span-2 mr-10 divide-solid divide-y">
                <h1 class="text-2xl font-semibold pb-5">Definições</h1>
                <div class="pt-3">
                    <button
                        class="tab"
                        :class="{ selected: selectedOption == 'email' }"
                    >
                        <font-awesome-icon
                            :icon="['far', 'envelope']"
                            class="mr-2 text-2xl"
                        ></font-awesome-icon>
                        <p class="font-medium">Email</p>
                    </button>
                </div>
            </div>
            <div class="col-span-4">
                <Email />
            </div>
        </div>
    </div>
</template>

<script>
import Email from "../components/Settings/Email";

export default {
    components: {
        Email,
    },
    data() {
        return {
            selectedOption: "email",
        };
    },
};
</script>

<style lang="postcss" scoped>
.tab {
    @apply py-2 px-4 rounded-full flex items-center justify-center w-full my-2;
}
.tab:hover:not(.selected) {
    @apply bg-gray-100;
}
.tab.selected {
    @apply bg-gray-200;
}
</style>
