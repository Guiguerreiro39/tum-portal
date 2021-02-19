<template>
    <div class="header">
        <DatePicker
            v-model="date"
            format="DD/MM/YYYY"
            :disabled-date="disabledDate"
            input-class="text-input w-full"
        />
        <div class="mt-2">
            <font-awesome-icon
                :icon="['fas', 'arrow-left']"
                class="arrow"
                @click="$emit('removePresence')"
            />
            <font-awesome-icon
                :icon="['fas', 'arrow-right']"
                class="arrow"
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
    props: ["time", "extras"],
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
            const extraDates = this.extras.map((d) => new Date(d).getTime());
            return (
                (date.getDay() !== 2 &&
                    date.getDay() !== 4 &&
                    !extraDates.includes(new Date(date).getTime())) ||
                date > new Date()
            );
        },
    },
};
</script>

<style scoped lang="postcss">
.header {
    @apply flex flex-col items-center mt-4 row-span-1;
}
.arrow {
    @apply mx-6 text-2xl text-gray-600 cursor-pointer;
}
</style>
