<template>
    <div class="vote" v-if="isMounted">
        <div class="content">
            <div class="card" v-if="pager.currentPage === 1">
                <div class="new">
                    <button class="btn-new" @click="openModalNew()">
                        <div>
                            <font-awesome-icon :icon="['fas', 'plus']" />
                        </div>
                    </button>
                    <h3 class="font-bold mt-16">Criar nova votação</h3>
                </div>
            </div>
            <div class="card" v-for="(vote, index) in votes" :key="index">
                <Card @vote="openModalVote(index)" :vote="vote" />
            </div>
        </div>
        <button
            v-if="isOpen"
            @click="closeModals"
            tabindex="-1"
            class="modal-bg"
        ></button>
        <New v-if="isNewOpen" @closeModal="closeModals()" @newVote="newVote" />
        <Voting
            v-if="isVoteOpen"
            @closeModal="closeModals()"
            @updateVote="updateVote"
            :vote="votes[modalIndex]"
        />
        <Pagination :pager="pager" @pageChange="handlePageChange" />
    </div>
</template>

<script>
import Card from "../components/Vote/Card.vue";
import New from "../components/Vote/New.vue";
import Voting from "../components/Vote/Voting.vue";
import Pagination from "../components/Pagination.vue";

import { getAllVotes } from "../functions/Vote";

export default {
    components: {
        Card,
        New,
        Voting,
        Pagination,
    },
    data() {
        return {
            isOpen: false,
            isVoteOpen: false,
            isNewOpen: false,
            votes: [],
            modalIndex: Number,
            isMounted: false,
            pager: null,
        };
    },
    async created() {
        await this.requestVotes(1);
    },
    methods: {
        openModalVote(index) {
            this.modalIndex = index;
            this.isOpen = true;
            this.isVoteOpen = true;
        },
        openModalNew() {
            this.isOpen = true;
            this.isNewOpen = true;
        },
        closeModals() {
            this.isOpen = false;
            this.isVoteOpen = false;
            this.isNewOpen = false;
        },
        updateVote(data) {
            this.votes.forEach((v, i) => {
                if (v._id === data._id) {
                    this.votes[i] = data;
                }
            });
        },
        async newVote(data) {
            await this.requestVotes(1);
        },
        async handlePageChange(page) {
            await this.requestVotes(page);
        },
        requestVotes(page) {
            this.votes = [];
            getAllVotes(page)
                .then((res) => {
                    this.pager = res.pager;
                    this.votes = res.data;
                    this.isMounted = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped lang="postcss">
.vote {
    @apply px-10 pt-5 pb-20 w-full h-full;
}
.content {
    @apply h-full grid grid-cols-4 grid-rows-2 gap-3;
}
.card {
    @apply bg-white shadow-md px-4 py-2 divide-solid divide-y col-span-1 rounded-lg overflow-hidden;
}
.new {
    @apply flex flex-col justify-center items-center h-full relative;
}
.btn-new {
    @apply w-16 h-16 border-dashed border-2 border-red-300 rounded-full flex items-center justify-center mb-10 absolute transform transition-all duration-500 outline-none;
}
.btn-new:hover {
    @apply w-20 h-20;
}
.btn-new div {
    @apply rounded-full w-12 h-12 flex items-center justify-center bg-red-500 text-white text-xl shadow;
}
.modal-bg {
    @apply fixed inset-0 h-full w-full cursor-default bg-gray-500 bg-opacity-30;
}
.modal-bg:focus {
    @apply outline-none;
}
</style>
