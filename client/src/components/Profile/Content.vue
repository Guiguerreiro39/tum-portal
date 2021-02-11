<template>
    <div class="content">
        <div class="card">
            <div class="head">
                <h2 class="card-title">Sobre</h2>
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
            <div class="flex pt-4">
                <div class="mr-8 font-medium">
                    <h3 class="options">Nome</h3>
                    <h3 class="options">Contacto</h3>
                    <h3 class="options">Email</h3>
                    <h3 class="options">Residência</h3>
                </div>
                <div>
                    <h3 class="options">{{ fullName }}</h3>
                    <input
                        type="text"
                        v-if="isEdit && isOwner"
                        autofocus
                        v-model="contact"
                        class="options"
                    />
                    <h3 v-else class="capitalize options">
                        {{ contact === null ? "não definido" : contact }}
                    </h3>
                    <input
                        type="email"
                        v-if="isEdit && isOwner"
                        v-model="email"
                        class="options"
                    />
                    <h3 v-else class="options">{{ email }}</h3>
                    <input
                        type="text"
                        v-if="isEdit && isOwner"
                        v-model="residence"
                        class="options"
                    />
                    <h3 v-else class="capitalize options">
                        {{ residence === null ? "não definido" : residence }}
                    </h3>
                </div>
            </div>
        </div>
        <div class="card">
            <h2 class="card-title">
                Timeline
            </h2>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: ["user", "isOwner"],
    data() {
        return {
            isEdit: false,
            contact: "",
            email: "",
            residence: "",
            fullName: "",
        };
    },
    created() {
        this.contact = this.user.contact;
        this.email = this.user.email;
        this.residence = this.user.residence;
        this.fullName = this.user.fullName;
    },
    methods: {
        submitChange() {
            this.isEdit = false;
            this.$store
                .dispatch("updateUser", {
                    contact: this.contact,
                    email: this.email,
                    residence: this.residence,
                })
                .catch((err) => {
                    console.log("Something went wrong");
                });
        },
    },
};
</script>

<style scoped lang="postcss">
.content {
    @apply grid grid-cols-2 gap-4 w-2/3 mt-5;
}
.card {
    @apply col-span-1 bg-white rounded-lg divide-y divide-solid p-5 shadow-md;
}
.head {
    @apply flex items-center mb-3 justify-between;
}
.card-title {
    @apply font-medium text-xl;
}
.btn {
    @apply cursor-pointer;
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
.options {
    @apply py-1 mt-2 border border-transparent px-1 rounded-lg;
}
input.options {
    @apply border-gray-300 w-full;
}
input.options:focus {
    @apply shadow-outline outline-none;
}
</style>
