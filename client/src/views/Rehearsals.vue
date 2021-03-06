<template>
    <div class="h-full w-full flex items-center justify-center">
        <div class="rehearsals" v-if="isMounted">
            <div class="list">
                <Header
                    :time="time"
                    :extras="allExtra"
                    @timeChange="timeChange"
                    @addPresence="addPresence"
                    @removePresence="removePresence"
                />
                <div class="tables">
                    <Table
                        :users="leftUsers"
                        :selectedUsers="leftSelected"
                        side="left"
                    />
                    <Table
                        :users="rightUsers"
                        :selectedUsers="rightSelected"
                        side="right"
                    />
                </div>
            </div>
            <div class="w-full flex justify-center">
                <div class="extras">
                    <NewDate @newExtra="newExtra" />
                </div>
            </div>
        </div>
        <RotateLoader v-else color="rgba(239, 68, 68, 1)" size="2rem" />
    </div>
</template>

<script>
import Header from "../components/Rehearsals/Header.vue";
import Table from "../components/Rehearsals/Table.vue";
import NewDate from "../components/Rehearsals/NewDate.vue";
import {
    getRehearsal,
    getAllExtra,
    updateRehearsal,
    createRehearsal,
} from "../functions/Rehearsals.js";

import RotateLoader from "vue-spinner/src/PulseLoader.vue";

export default {
    components: {
        Table,
        Header,
        NewDate,
        RotateLoader,
    },
    data() {
        return {
            time: null,
            leftUsers: [],
            rightUsers: [],
            leftSelected: [],
            rightSelected: [],
            allUsers: [],
            allExtra: [],
            id: null,
            isMounted: false,
        };
    },
    methods: {
        newExtra(value) {
            const aux = this.allExtra.map((d) => new Date(d).getTime());
            if (!aux.includes(new Date(value).getTime()))
                createRehearsal(value);
            this.allExtra.push(value);
        },
        timeChange(value) {
            this.leftSelected = [];
            this.rightSelected = [];
            this.rightUsers = [];
            getRehearsal(value)
                .then((res) => {
                    res.users.forEach((user) => {
                        const index = this.allUsers
                            .map((u) => u.id)
                            .indexOf(user);
                        this.rightUsers.push(this.allUsers[index]);
                    });
                    this.leftUsers = this.allUsers.filter(
                        (user) =>
                            this.rightUsers
                                .map((u) => u.id)
                                .indexOf(user.id) === -1
                    );
                    this.time = value;
                    this.id = res._id;
                })
                .catch((err) => {
                    console.log(err);
                    this.time = null;
                });
        },
        addPresence() {
            if (this.leftSelected.length > 0) {
                const users = this.leftSelected.map(
                    (user) => this.leftUsers[user]
                );

                updateRehearsal(this.id, [...this.rightUsers, ...users])
                    .then((res) => {
                        this.rightUsers = [];
                        res.users.forEach((user) => {
                            const index = this.allUsers
                                .map((u) => u.id)
                                .indexOf(user);
                            this.rightUsers.push(this.allUsers[index]);
                        });
                        this.leftUsers = this.leftUsers.filter(
                            (user, index) => !this.leftSelected.includes(index)
                        );
                        this.leftSelected = [];
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        removePresence() {
            if (this.rightSelected.length > 0) {
                const users = this.rightSelected.map(
                    (user) => this.rightUsers[user]
                );
                const newRightUsers = this.rightUsers.filter(
                    (u, index) => !this.rightSelected.includes(index)
                );

                updateRehearsal(this.id, newRightUsers, users)
                    .then((res) => {
                        this.leftUsers = [...this.allUsers];
                        res.users.forEach((user) => {
                            const index = this.leftUsers
                                .map((u) => u.id)
                                .indexOf(user);
                            this.leftUsers.splice(index, 1);
                        });
                        this.rightUsers = newRightUsers;
                        this.rightSelected = [];
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
    },
    async created() {
        if (this.$store.getters.authStatus.length === 0) return;

        var users = [];
        await this.$store.dispatch("getAllUsers").then((res) => {
            res.forEach((user) => {
                users.push({
                    id: user.id,
                    username: user.username,
                    profileImage: user.profileImage,
                });
            });
            this.allUsers = users;
        });

        getAllExtra().then((res) => {
            this.allExtra = res.rehearsals;
        });

        var now = new Date();
        now.setHours(0, 0, 0, 0);
        var currentMs = now.getTime();
        if (now.getDay() === 2 || now.getDay() === 4) {
            this.time = now;
        } else if (now.getDay() < 2) {
            var daysAfterLastThursday = -7 + 4 - now.getDay();
            this.time = new Date(
                currentMs + daysAfterLastThursday * 24 * 60 * 60 * 1000
            );
        } else if (now.getDay() < 4) {
            var daysAfterLastTuesday = 2 - now.getDay();
            this.time = new Date(
                currentMs + daysAfterLastTuesday * 24 * 60 * 60 * 1000
            );
        } else {
            var daysAfterLastThursday = 4 - now.getDay();
            this.time = new Date(
                currentMs + daysAfterLastThursday * 24 * 60 * 60 * 1000
            );
        }

        this.isMounted = true;
    },
};
</script>

<style scoped lang="postcss">
.rehearsals {
    @apply grid grid-rows-5 items-center h-full p-10 pt-5 w-2/3 mx-auto;
}
.list {
    @apply bg-white row-span-4 rounded-lg shadow-md divide-solid divide-y px-5 h-full overflow-hidden grid grid-rows-5 gap-5;
}
.tables {
    @apply grid grid-cols-2 divide-solid divide-x h-full row-span-4;
}
.extras {
    @apply bg-white row-span-1 rounded-lg shadow-md px-5 py-4 w-2/3;
}
</style>
