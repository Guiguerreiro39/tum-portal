<template>
    <div class="header">
        <div
            class="image"
            :class="{ editable: isOwner }"
            @mouseover="isOwner ? (showIcon = true) : ''"
            @mouseout="isOwner ? (showIcon = false) : ''"
            @click="triggerUpload"
        >
            <img
                :class="{ 'opacity-50': showIcon }"
                class="profile-image"
                :src="profileImageURL"
                alt="Profile Image"
            />
            <input
                type="file"
                ref="fileInput"
                @change="uploadImage"
                v-if="isOwner"
            />
            <div v-if="isOwner">
                <font-awesome-icon
                    :icon="['fas', 'camera-retro']"
                    class="camera-icon"
                    v-show="showIcon"
                />
            </div>
        </div>
        <div class="header-text">
            <h2 class="username">{{ username }}</h2>
            <div class="w-full py-4 grid grid-cols-3">
                <div class="font-medium col-span-1">
                    <h3 class="options">Instrumento</h3>
                    <h3 class="options">Naipe</h3>
                </div>
                <div class="col-span-1">
                    <select
                        v-if="isEdit && isOwner"
                        v-model="instrument"
                        class="options"
                    >
                        <option :value="null" class="capitalize"
                            >não definido</option
                        >
                        <option
                            v-for="(item, index) in instrumentOptions"
                            :key="index"
                            :v-model="instrument"
                            class="capitalize"
                            >{{ item }}</option
                        >
                    </select>
                    <h3 v-else class="options">
                        {{ instrument !== null ? instrument : "Não definido" }}
                    </h3>
                    <select
                        v-if="isEdit && isOwner"
                        v-model="voice"
                        class="options"
                    >
                        <option :value="null" class="capitalize"
                            >não definido</option
                        >
                        <option
                            v-for="(item, index) in voiceOptions"
                            :key="index"
                            :value="item"
                            class="capitalize"
                            >{{ item }}</option
                        >
                    </select>
                    <h3 v-else class="options">
                        {{ voice !== null ? voice : "Não definido" }}
                    </h3>
                </div>
                <div class="col-span-1 float-right justify-end flex">
                    <button
                        class="save btn"
                        @click="submitChange"
                        v-if="isEdit && isOwner"
                    >
                        <font-awesome-icon :icon="['fas', 'save']" />
                        <p class="ml-1 inline-block">Guardar</p>
                    </button>
                    <button
                        class="edit btn"
                        @click="isEdit = true"
                        v-if="!isEdit && isOwner"
                    >
                        <font-awesome-icon :icon="['fas', 'edit']" />
                        <p class="ml-1 inline-block">Editar</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { instrumentType, voiceType } from "../../constants/types.js";
export default {
    props: ["user", "isOwner"],
    data() {
        return {
            showIcon: false,
            isEdit: false,
            now: Date.now(),
            voice: "",
            instrument: "",
            profileImage: null,
            username: "",
        };
    },
    created() {
        this.voice = this.user.voice;
        this.instrument = this.user.instrument;
        this.username = this.user.username;
        this.profileImage = this.user.profileImage;
    },
    computed: {
        profileImageURL: function() {
            return `${this.profileImage}?rnd=${this.now}`;
        },
        instrumentOptions: function() {
            return instrumentType;
        },
        voiceOptions: function() {
            return voiceType;
        },
    },
    methods: {
        triggerUpload() {
            if (this.isOwner) {
                this.$refs.fileInput.click();
            }
        },
        uploadImage() {
            const file = this.$refs.fileInput.files[0];

            if (file !== undefined && this.isOwner) {
                this.$store
                    .dispatch("fileUpload", file)
                    .then((res) => {
                        this.profileImage = res;
                        this.now = Date.now();
                    })
                    .catch((err) => {
                        console.log("Something went wrong!");
                    });
            }
        },
        submitChange() {
            this.isEdit = false;
            if (this.isOwner) {
                this.$store
                    .dispatch("updateUser", {
                        instrument: this.instrument,
                        voice: this.voice,
                    })
                    .catch((err) => {
                        console.log("Something went wrong");
                    });
            }
        },
    },
};
</script>

<style scoped lang="postcss">
.header {
    @apply bg-white w-2/3 h-60 flex items-center rounded-lg shadow-md;
}
.options {
    @apply py-1 mt-2 capitalize rounded-lg;
}
h3.options {
    @apply ml-3 border-2 border-transparent;
}
select.options {
    @apply rounded-lg border-2 border-gray-200;
}
select.options:focus {
    @apply border-red-300 ring-1 ring-red-500 ring-opacity-30 outline-none;
}
.btn {
    @apply cursor-pointer h-6;
}
.btn:focus {
    @apply outline-none;
}
.edit {
    @apply text-red-500 border-b border-red-500 border-opacity-0;
}
.edit:hover {
    @apply border-opacity-100;
}
.save {
    @apply text-green-500 border-b border-green-500 border-opacity-0;
}
.save:hover {
    @apply border-opacity-100;
}
.image {
    @apply h-48 w-48 rounded-full overflow-hidden ml-5 relative shadow-md;
}
.image.editable:hover {
    @apply bg-gray-500 cursor-pointer;
}
.profile-image {
    @apply w-full h-full object-cover;
}
.camera-icon {
    @apply absolute text-4xl text-gray-200 text-opacity-30 align-middle inset-x-0 top-20 mx-auto;
}
.header-text {
    @apply w-2/3 flex flex-col ml-8 divide-y divide-solid;
}
.username {
    @apply text-3xl font-bold capitalize py-4;
}
</style>
