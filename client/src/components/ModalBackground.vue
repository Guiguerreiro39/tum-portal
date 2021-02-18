<template>
    <button
        @click="$emit('closeModal')"
        tabindex="-1"
        class="modal-bg"
    ></button>
</template>

<script>
export default {};
</script>

<style scoped lang="postcss">
.modal-bg {
    @apply fixed inset-0 h-full w-full cursor-default bg-gray-700 bg-opacity-50 z-10;
}
.modal-bg:focus {
    @apply outline-none;
}
</style>
