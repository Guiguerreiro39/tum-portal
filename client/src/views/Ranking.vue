<template>
    <div class="h-full w-full p-10 pt-5">
        <div
            class="h-full w-full bg-white shadow-md rounded-lg divide-solid divide-y overflow-hidden"
        >
            <table
                class="w-full h-full flex flex-col rounded-lg"
                v-if="users.length > 0"
            >
                <colgroup>
                    <col span="1" style="width: 10%;" />
                    <col span="1" style="width: 60%;" />
                    <col span="1" style="width: 10%;" />
                    <col span="1" style="width: 10%;" />
                    <col span="1" style="width: 10%;" />
                </colgroup>
                <thead class="table-fixed table">
                    <tr class="w-full pr-2">
                        <th class="rank pl-4" style="width: 10%;">Posição</th>
                        <th class="name" style="width: 60%;">Nome</th>
                        <th class="rehearsal pr-4" style="width: 10%;">
                            Ensaios
                        </th>
                        <th class="event pr-4" style="width: 10%;">Eventos</th>
                        <th class="total pr-4" style="width: 10%;">Pontos</th>
                    </tr>
                </thead>
                <tbody class="overflow-scroll ml-2">
                    <tr
                        v-for="(user, index) in rankUsers"
                        :key="index"
                        class="table-fixed table w-full"
                    >
                        <td class="rank" style="width: 10%;">
                            {{ index + 1 }}
                            <font-awesome-icon
                                :icon="['fas', 'medal']"
                                v-if="index < 3"
                                :class="{
                                    'text-yellow-400': index === 0,
                                    'text-gray-400': index === 1,
                                    'text-yellow-800': index === 2,
                                }"
                            ></font-awesome-icon>
                        </td>
                        <td class="name" style="width: 60%;">
                            <router-link :to="'/profile/' + user.id">
                                <img
                                    :src="profileImageURL(user)"
                                    alt="User Profile Image"
                                    class="user-image"
                                />
                                <p class="username">{{ user.username }}</p>
                            </router-link>
                        </td>
                        <td class="rehearsal" style="width: 10%;">
                            {{ user.rehearsals }}
                        </td>
                        <td class="event" style="width: 10%;">
                            {{ user.events }}
                        </td>
                        <td class="total" style="width: 10%;">
                            {{ calculatePoints(user.rehearsals, user.events) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Table from "../components/Rehearsals/Table.vue";

import { rehearsalPoints, eventPoints } from "../constants/rank";
export default {
    components: { Table },
    data() {
        return {
            users: [],
            isMounted: false,
        };
    },
    computed: {
        rankUsers: function() {
            return this.users.sort((a, b) => {
                const aValue = this.calculatePoints(a.rehearsals, a.events);
                const bValue = this.calculatePoints(b.rehearsals, b.events);

                return bValue - aValue;
            });
        },
    },
    methods: {
        calculatePoints(rehearsals, events) {
            return rehearsals * rehearsalPoints + events * eventPoints;
        },
        profileImageURL(user) {
            return `${user.profileImage}?rnd=${Date.now()}`;
        },
    },
    created() {
        this.$store.dispatch("getAllUsers").then((data) => {
            this.users = data;
            this.isMounted = true;
        });
    },
};
</script>

<style scoped lang="postcss">
th,
td {
    @apply py-2;
}
th {
    @apply text-white bg-red-500;
}
tbody {
    @apply divide-solid divide-y;
}
.user-image {
    @apply h-6 w-6 object-cover rounded-full inline;
}
.username {
    @apply inline capitalize font-medium pl-2;
}
.rehearsal,
.event,
.total,
.rank {
    @apply text-center;
}
.name {
    @apply pl-5 text-left;
}
th.name {
    @apply pl-8;
}
tbody {
    @apply font-medium;
}
</style>
