<template>
    <div class="flex flex-col items-center mt-4 mb-2">
        <DatePicker
            v-model="date"
            format="DD/MM/YYYY"
            :disabled-date="disabledDate"
        />
        <div class="mt-2">
            <font-awesome-icon
                :icon="['fas', 'arrow-left']"
                class="mx-6 text-2xl text-gray-600 cursor-pointer"
                @click="$emit('removePresence')"
            />
            <font-awesome-icon
                :icon="['fas', 'arrow-right']"
                class="mx-6 text-2xl text-gray-600 cursor-pointer"
                @click="$emit('addPresence')"
            />
        </div>
    </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/pt";
export default {
    components: {
        DatePicker,
    },
    props: ["time"],
    data() {
        return {
            date: null,
        };
    },
    created() {
        this.date = this.time;
    },
    watch: {
        date: function() {
            this.$emit("timeChange", this.date);
        },
        time: function() {
            this.date = this.time;
        },
    },
    methods: {
        disabledDate(date) {
            return (
                (date.getDay() !== 2 && date.getDay() !== 4) ||
                date > new Date()
            );
        },
    },
};
</script>

<style></style>
