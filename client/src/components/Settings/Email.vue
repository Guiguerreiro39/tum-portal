<template>
    <div class="pl-10 divide-solid divide-y">
        <div class="pb-5 flex justify-between">
            <h1 class="text-2xl font-semibold">Ativar ou desativar emails</h1>
            <button class="btn-submit" v-if="changed" @click="handleSubmit">
                Guardar
            </button>
        </div>
        <div class="pt-3">
            <div class="flex my-4">
                <input
                    type="checkbox"
                    name="checked-demo"
                    class="checkbox"
                    :checked="onEvent"
                    @click="onEvent = !onEvent"
                    @change="changed = true"
                />
                <h2>Receber email quando um evento é criado</h2>
            </div>
            <div class="flex my-4">
                <input
                    type="checkbox"
                    name="checked-demo"
                    class="checkbox"
                    :checked="onGuide"
                    @click="onGuide = !onGuide"
                    @change="changed = true"
                />
                <h2>Receber email quando uma guia é criada</h2>
            </div>
            <div class="flex my-4">
                <input
                    type="checkbox"
                    name="checked-demo"
                    class="checkbox"
                    :checked="onVote"
                    @click="onVote = !onVote"
                    @change="changed = true"
                />
                <h2>Receber email quando uma votação é criada</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            onEvent: Boolean,
            onVote: Boolean,
            onGuide: Boolean,
            changed: false,
        };
    },
    created() {
        const configurations = this.$store.getters.getConfigurations;
        this.onEvent = configurations.email.eventCreate;
        this.onVote = configurations.email.voteCreate;
        this.onGuide = configurations.email.guideCreate;
    },
    methods: {
        handleSubmit() {
            this.changed = false;
            this.$store
                .dispatch("updateUser", {
                    configurations: {
                        email: {
                            eventCreate: this.onEvent,
                            voteCreate: this.onVote,
                            guideCreate: this.onGuide,
                        },
                    },
                })
                .catch((err) => {
                    console.log("Something went wrong", err);
                });
        },
    },
};
</script>

<style scoped lang="postcss">
.checkbox {
    @apply border-2 rounded-lg w-6 h-6 border-gray-200 mr-3;
}
.checkbox:focus {
    @apply outline-none ring-transparent;
}
.checkbox:checked {
    @apply text-red-500;
}
.btn-submit {
    @apply px-3 py-1 bg-green-500 text-white rounded-lg font-medium;
}
.btn-submit:hover {
    @apply bg-green-600;
}
.btn-submit:focus {
    @apply outline-none;
}
</style>
