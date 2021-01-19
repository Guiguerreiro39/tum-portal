<template>
    <div class="modal">
        <div>
            <button class="btn-exit" @click="$emit('closeModal')">
                <font-awesome-icon :icon="['fas', 'times']" />
            </button>
            <div class="title">
                <p class="font-semibold mr-5">Questão</p>
                <input
                    type="text"
                    placeholder="p.e. Quem vem ao Carpé?"
                    class="input"
                    maxlength="60"
                    v-model="question"
                />
            </div>
        </div>
        <div class="pt-3 text-center">
            <p class="mb-3">Adicione as opções da votação</p>
            <div class="options">
                <div class="flex w-full justify-center">
                    <input
                        type="text"
                        placeholder="Insira nova opção"
                        class="input"
                        v-model="newOption"
                    />
                    <button class="btn-add" @click="addOption()">
                        Adicionar
                    </button>
                </div>
                <div class="options-box">
                    <div
                        class="flex justify-between py-2"
                        v-for="(option, index) in options"
                        :key="index"
                    >
                        <p>{{ option }}</p>
                        <button class="btn-remove" @click="removeOption(index)">
                            <font-awesome-icon :icon="['fas', 'times']" />
                        </button>
                    </div>
                    <div
                        v-if="options.length === 0"
                        class="flex h-full items-center justify-center"
                    >
                        <p class="text-gray-300 font-medium select-none">
                            Não existem opções ainda
                        </p>
                    </div>
                </div>
                <DatePicker
                    v-model="dateTime"
                    type="datetime"
                    placeholder="Data final da votação"
                    :default-value="new Date()"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledTime"
                    format="DD/MM/YYYY HH:mm"
                />
            </div>
        </div>
        <div class="flex justify-center">
            <button class="btn-submit" @click="handleSubmit()">
                Criar nova votação
            </button>
        </div>
    </div>
</template>

<script>
import { createVote } from "../../functions/Vote";
import DatePicker from "vue2-datepicker";

export default {
    components: {
        DatePicker,
    },
    data() {
        return {
            options: [],
            question: "",
            newOption: "",
            dateTime: null,
        };
    },
    methods: {
        addOption() {
            if (this.newOption.length > 0) {
                this.options.push(this.newOption);
                this.newOption = "";
            }
        },
        removeOption(index) {
            this.options.splice(index, 1);
        },
        handleSubmit() {
            if (
                this.options.length > 0 &&
                this.question.length > 0 &&
                this.dateTime
            ) {
                createVote(this.question, this.options, this.dateTime)
                    .then((data) => {
                        this.$emit("newVote", data);
                        this.$emit("closeModal");
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$emit("closeModal");
                    });
            }
        },
        disabledDate(date) {
            var today = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
            );
            return date.getTime() < today.getTime();
        },
        disabledTime(date) {
            if (date.getHours() < new Date().getHours()) return true;
            else if (date.getHours() == new Date().getHours())
                return date.getMinutes() < new Date().getMinutes();
            else return false;
        },
    },
};
</script>

<style scoped lang="postcss">
.modal {
    @apply bg-white w-1/2 absolute inset-x-0 top-20 mx-auto px-4 pb-3 pt-2 divide-solid divide-y rounded-lg shadow-md;
}
.input {
    @apply w-3/4 py-2 px-2 rounded-lg outline-none border;
}
.input:focus {
    @apply shadow-outline;
}
.btn-exit {
    @apply ml-4 text-gray-300 float-right text-2xl;
}
.btn-exit:focus {
    @apply outline-none;
}
.btn-exit:hover {
    @apply text-red-500;
}
.title {
    @apply flex justify-center items-center mb-3 pt-8;
}
.btn-add {
    @apply py-2 px-3 bg-green-500 rounded-lg shadow text-white font-medium ml-3;
}
.btn-add:focus {
    @apply outline-none;
}
.btn-add:hover {
    @apply bg-green-600;
}
.options {
    @apply flex flex-col justify-center items-center mb-3;
}
.options-box {
    @apply py-2 px-4 border w-1/2 divide-solid divide-y rounded-lg my-3 h-48 overflow-y-auto;
}
.btn-remove {
    @apply ml-4 text-red-500;
}
.btn-remove:focus {
    @apply outline-none;
}
.btn-submit {
    @apply bg-green-500 py-2 px-10 mt-3 text-white font-medium rounded-lg;
}
.btn-submit:focus {
    @apply outline-none;
}
.btn-submit:hover {
    @apply bg-green-600;
}
</style>
