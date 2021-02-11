<template>
    <div class="modal">
        <div>
            <button class="btn-exit" @click="$emit('closeModal')">
                <font-awesome-icon :icon="['fas', 'times']" />
            </button>
            <h1 class="title">Adicionar nova guia</h1>
        </div>
        <div class="flex flex-col items-center">
            <div class="content content-file">
                <div class="text-center">
                    <button class="btn-upload" @click="$refs.fileInput.click()">
                        <font-awesome-icon
                            :icon="['fas', 'cloud-upload-alt']"
                            class="text-white text-3xl"
                        />
                        <p class="text-white">Seleccionar um vídeo</p>
                    </button>
                    <p v-if="fileName.length > 0" class="mt-2">
                        {{ fileName }}
                    </p>
                </div>
                <input
                    type="file"
                    ref="fileInput"
                    hidden
                    @change="handleChange()"
                />
            </div>
            <div class="content">
                <p class="label">Nome da música</p>
                <input
                    type="text"
                    placeholder="p.e. Boémia"
                    class="input"
                    maxlength="60"
                    v-model="name"
                />
            </div>
            <div class="content mb-4">
                <p class="label">Modalidade</p>
                <select v-model="instrument" class="input capitalize">
                    <option
                        v-for="(item, index) in instruments"
                        :key="index"
                        :value="item"
                        class="capitalize"
                        >{{ item }}</option
                    >
                </select>
            </div>
        </div>
        <div class="flex justify-center">
            <button @click="handleSubmit()" class="btn-submit">
                Adicionar nova guia
            </button>
        </div>
    </div>
</template>

<script>
import { createGuide } from "../../functions/Guide.js";

export default {
    props: ["instruments"],
    data() {
        return {
            name: "",
            instrument: "",
            fileName: "",
        };
    },
    methods: {
        handleSubmit() {
            const file = this.$refs.fileInput.files[0];

            if (file !== undefined) {
                createGuide(this.name, this.instrument, file)
                    .then((data) => {
                        this.$emit(
                            "newGuide",
                            this.instruments.indexOf(this.instrument)
                        );
                        this.$emit("closeModal");
                    })
                    .catch((err) => {});
            }
        },
        handleChange() {
            this.fileName = this.$refs.fileInput.files[0].name;
        },
    },
    created() {
        this.instrument = this.instruments[0];
    },
};
</script>

<style scoped lang="postcss">
.modal {
    @apply bg-white w-1/2 absolute inset-x-0 top-20 mx-auto px-4 pb-3 pt-2 divide-solid divide-y rounded-lg shadow-md;
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
.btn-upload {
    @apply bg-blue-400 py-3 px-10 rounded-lg shadow-md;
}
.btn-upload:hover {
    @apply bg-blue-500;
}
.btn-upload:focus {
    @apply outline-none;
}
.title {
    @apply flex justify-center items-center mb-3 pt-8 font-bold text-lg;
}
.content {
    @apply flex items-center w-full pt-4;
}
.content:not(.content-file) {
    @apply justify-between;
}
.content.content-file {
    @apply justify-center;
}
.label {
    @apply font-semibold mr-5 ml-2;
}
.input {
    @apply w-3/4 py-2 px-2 rounded-lg outline-none border;
}
.input:focus {
    @apply shadow-outline;
}
.btn-submit {
    @apply bg-green-500 py-2 px-10 mt-4 text-white font-medium rounded-lg;
}
.btn-submit:focus {
    @apply outline-none;
}
.btn-submit:hover {
    @apply bg-green-600;
}
</style>
