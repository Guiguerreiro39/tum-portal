<template>
    <div class="modal">
        <div>
            <button class="btn-exit" @click="$emit('closeModal')">
                <font-awesome-icon :icon="['fas', 'times']" />
            </button>
            <div class="title">
                <p class="font-bold text-xl mr-5">
                    {{ question }}
                </p>
            </div>
        </div>
        <div class="options">
            <div
                class="flex items-end mb-3"
                v-for="(option, index) in options"
                :key="index"
            >
                <input
                    type="radio"
                    v-model="picked"
                    name="option"
                    :value="option._id"
                    class="hidden"
                />
                <span class="radio" @click="picked = option._id"></span>
                <div class="w-full">
                    <div class="option-text">
                        <p class="font-medium">{{ option.text }}</p>
                        <p>{{ option.users.length }} votos</p>
                    </div>
                    <KProgress
                        :percent="percentage(option.users.length)"
                        :show-text="false"
                        class="w-full m-0"
                    />
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <button class="btn-submit" @click="handleSubmit()">
                Votar
            </button>
        </div>
    </div>
</template>

<script>
import KProgress from "k-progress";

import { updateVote } from "../../functions/Vote";

export default {
    components: {
        KProgress,
    },
    props: ["vote"],
    data() {
        return {
            picked: "",
            options: [],
        };
    },
    created() {
        this.options = this.vote.options.sort((a, b) => {
            return b.users.length - a.users.length;
        });

        this.options.forEach((o) => {
            const id = this.$store.getters.getID;
            if (o.users.indexOf(id) !== -1) this.picked = o._id;
        });
    },
    computed: {
        question: function() {
            return this.vote.question;
        },
        id: function() {
            return this.vote._id;
        },
        totalVotes: function() {
            var num = 0;
            this.options.forEach((o) => {
                num += o.users.length;
            });

            return num;
        },
    },
    methods: {
        percentage(num) {
            if (num === 0) return 0;
            return (num * 100) / this.totalVotes;
        },
        handleSubmit() {
            updateVote(this.id, this.picked)
                .then((data) => {
                    this.$emit("updateVote", data);
                    this.$emit("closeModal");
                })
                .catch((err) => {
                    console.log(err);
                    this.$emit("closeModal");
                });
        },
    },
};
</script>

<style scoped lang="postcss">
.modal {
    @apply bg-white w-1/2 absolute inset-x-0 top-20 mx-auto px-4 pb-3 pt-2 divide-solid divide-y rounded-lg shadow-md z-10;
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
.title {
    @apply flex justify-center items-center mb-3 pt-6;
}
.options {
    @apply px-10 pt-3 h-52 overflow-y-auto;
}
.radio {
    @apply w-6 h-6 inline-block mr-3 rounded-full border border-gray-300 cursor-pointer transform transition-all duration-300;
}
.radio:hover {
    @apply scale-125;
}
.option-text {
    @apply flex justify-between mb-1;
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
input[type="radio"]:checked + span {
    background-color: #3490dc;
    box-shadow: 0px 0px 0px 3px white inset;
}
</style>
