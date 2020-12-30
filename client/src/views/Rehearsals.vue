<template>
    <div class="flex flex-col items-center h-full pt-10">
        <div
            class="bg-white h-2/3 w-1/2 rounded-lg shadow-md divide-solid divide-y px-5"
        >
            <Header
                :time="time"
                :extras="allExtra"
                @timeChange="timeChange"
                @addPresence="addPresence"
                @removePresence="removePresence"
            />
            <div class="grid grid-cols-2 divide-solid divide-x h-80">
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
        <div class="bg-white w-1/2 rounded-lg shadow-md mt-3 px-5 py-4">
            <NewDate @newExtra="newExtra" />
        </div>
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
export default {
    components: {
        Table,
        Header,
        NewDate,
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
            this.leftUsers = [];
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

                updateRehearsal(this.id, newRightUsers)
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
    created() {
        var users = [];
        this.$store.dispatch("getAllUsers").then((res) => {
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
    },
};
</script>

<style></style>