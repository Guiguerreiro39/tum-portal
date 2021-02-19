<template>
    <div class="flex justify-between items-center">
        <h1 class="font-medium">Ensaio Extraordinário</h1>
        <div>
            <DatePicker
                v-model="date"
                format="DD/MM/YYYY"
                input-class="text-input w-full"
            />
            <button class="create-btn" @click="createExtra()">
                Criar
            </button>
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
    data() {
        return {
            date: new Date(),
        };
    },
    methods: {
        createExtra() {
            this.$emit("newExtra", this.date);
            this.date = new Date();
            this.date.setHours(0, 0, 0, 0);
        },
    },
    created() {
        this.date.setHours(0, 0, 0, 0);
    },
};
</script>

<style scoped lang="postcss">
.create-btn {
    @apply bg-green-500 py-1 px-3 rounded-lg text-white inline-block ml-4 font-medium;
}
.create-btn:hover {
    @apply bg-green-600;
}
</style>
