<template>
    <div class="vote">
        <div class="content" v-if="isMounted">
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
                <Card
                    @vote="openModalVote(index)"
                    @users="(users) => openModalUsers(users)"
                    :vote="vote"
                />
            </div>
            <Pagination :pager="pager" @pageChange="handlePageChange" />
        </div>
        <RotateLoader v-else color="rgba(239, 68, 68, 1)" size="2rem" />
        <ModalBackground
            v-if="isVoteOpen || isNewOpen || isUsersOpen"
            @closeModal="closeModals()"
        />
        <Users
            v-if="isUsersOpen"
            @closeModal="closeModals()"
            :users="optionUsers"
        />
        <New v-if="isNewOpen" @closeModal="closeModals()" @newVote="pageOne" />
        <Voting
            v-if="isVoteOpen"
            @closeModal="closeModals()"
            @updateVote="updateVote"
            :vote="votes[modalIndex]"
        />
    </div>
</template>

<script>
import Card from "../components/Vote/Card.vue";
import New from "../components/Vote/New.vue";
import Voting from "../components/Vote/Voting.vue";
import Users from "../components/Vote/Users.vue";
import Pagination from "../components/Pagination.vue";
import ModalBackground from "../components/ModalBackground.vue";

import { getAllVotes } from "../functions/Vote";

import RotateLoader from "vue-spinner/src/PulseLoader.vue";

export default {
    components: {
        Card,
        New,
        Voting,
        Users,
        Pagination,
        ModalBackground,
        RotateLoader,
    },
    data() {
        return {
            isVoteOpen: false,
            isNewOpen: false,
            isUsersOpen: false,
            votes: [],
            modalIndex: Number,
            optionUsers: [],
            isMounted: false,
            pager: null,
        };
    },
    async created() {
        await this.pageOne();
    },
    methods: {
        openModalUsers(users) {
            this.optionUsers = users;
            this.isUsersOpen = true;
        },
        openModalVote(index) {
            this.modalIndex = index;
            this.isVoteOpen = true;
        },
        openModalNew() {
            this.isNewOpen = true;
        },
        closeModals() {
            this.isVoteOpen = false;
            this.isNewOpen = false;
            this.isUsersOpen = false;
        },
        updateVote(data) {
            this.votes.forEach((v, i) => {
                if (v._id === data._id) {
                    this.votes[i] = data;
                }
            });
        },
        async pageOne() {
            await this.requestVotes(1);
        },
        async handlePageChange(page) {
            await this.requestVotes(page);
        },
        requestVotes(page) {
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
    @apply px-10 pt-5 pb-20 w-full h-full flex justify-center items-center;
}
.content {
    @apply h-full w-full grid grid-cols-4 grid-rows-2 gap-3;
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
</style>
