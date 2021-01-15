<template>
    <div class="body">
        <div class="header">
            <h3 class="font-bold">{{ question }}</h3>
        </div>
        <div class="row-span-4 py-2 overflow-y-auto">
            <div class="mb-1" v-for="(option, index) in options" :key="index">
                <div class="flex justify-between mb-1 text-sm">
                    <p class="font-medium break-all">
                        {{ option.text }}
                    </p>
                    <p class="whitespace-nowrap ml-2">
                        {{ option.users.length }} votos
                    </p>
                </div>
                <KProgress
                    :percent="percentage(option.users.length)"
                    :show-text="false"
                    class="w-full m-0"
                />
            </div>
        </div>
        <div class="footer">
            <Countdown :time="date.getTime()" @finish="isFinished = true" />
            <button
                class="btn-vote"
                @click="$emit('vote')"
                v-if="!hasVoted && !isFinished"
            >
                Votar
            </button>
            <span class="btn-pending" v-if="hasVoted && !isFinished">
                Pendente
            </span>
            <span class="btn-finish" v-if="isFinished">
                Terminado
            </span>
        </div>
    </div>
</template>

<script>
import KProgress from "k-progress";

import Countdown from "./Countdown";

export default {
    components: {
        KProgress,
        Countdown,
    },
    props: ["vote"],
    data() {
        return {
            isFinished: false,
        };
    },
    computed: {
        question: function() {
            return this.vote.question;
        },
        options: function() {
            return this.vote.options;
        },
        date: function() {
            return new Date(this.vote.date);
        },
        totalVotes: function() {
            var num = 0;
            this.vote.options.forEach((o) => {
                num += o.users.length;
            });

            return num;
        },
        hasVoted: function() {
            var result = false;
            this.vote.options.forEach((o) => {
                var id = this.$store.getters.getID;
                if (o.users.indexOf(id) !== -1) result = true;
            });
            return result;
        },
    },
    methods: {
        percentage(num) {
            if (num === 0) return 0;
            return (num * 100) / this.totalVotes;
        },
    },
};
</script>

<style scoped lang="postcss">
.body {
    @apply grid grid-rows-6 divide-solid divide-y h-full;
}
.header {
    @apply row-span-1 flex items-center break-all leading-5 mb-1;
}
.footer {
    @apply text-sm flex justify-between items-center row-span-1;
}
.btn-vote {
    @apply bg-green-500 px-2 py-1 rounded-lg text-white font-medium;
}
.btn-vote:focus {
    @apply outline-none;
}
.btn-vote:hover {
    @apply bg-green-600;
}
.btn-pending {
    @apply bg-yellow-500 px-2 py-1 rounded-lg text-white font-medium select-none;
}
.btn-finish {
    @apply bg-red-500 px-2 py-1 rounded-lg text-white font-medium select-none;
}
</style>
