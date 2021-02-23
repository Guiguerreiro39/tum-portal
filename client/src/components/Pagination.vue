<template>
    <div
        class="absolute left-56 right-0 bottom-5 mx-auto flex justify-center mt-8"
    >
        <ul
            class="flex bg-white rounded-lg divide-solid divide-x-2 overflow-hidden shadow-md"
            v-if="pager.pages.length > 1"
        >
            <li class="page-item" @click="handleClick(currentPage - 1)">
                anterior
            </li>
            <li
                class="page-item"
                :class="{ selected: 1 === currentPage }"
                @click="handleClick(1)"
            >
                1
            </li>
            <li
                class="page-item"
                :class="{ selected: page === currentPage, disabled: !page }"
                @click="handleClick(page)"
                v-for="page in pages"
                :key="page"
            >
                <p v-if="page">{{ page }}</p>
                <p v-else>...</p>
            </li>
            <li
                class="page-item"
                :class="{ selected: endPage === currentPage }"
                @click="handleClick(endPage)"
            >
                {{ endPage }}
            </li>
            <li class="page-item" @click="handleClick(currentPage + 1)">
                seguinte
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["pager"],
    computed: {
        currentPage: function() {
            return this.pager.currentPage;
        },
        totalPages: function() {
            return this.pager.totalPages;
        },
        endPage: function() {
            return this.pager.endPage;
        },
        pages: function() {
            var pages = this.pager.pages;
            pages = pages.slice(1, this.endPage - 1);

            if (this.pager.pages.length > 5) {
                console.log("here");
                if (this.currentPage === 1 || this.currentPage === 2) {
                    return [2, 3, null];
                } else if (
                    this.currentPage === this.endPage ||
                    this.currentPage === this.endPage - 1
                ) {
                    return [null, this.endPage - 2, this.endPage - 1];
                } else {
                    var result = [];

                    if (this.currentPage - 1 != 2)
                        result = result.concat([null]);

                    result = result.concat([
                        this.currentPage - 1,
                        this.currentPage,
                        this.currentPage + 1,
                    ]);

                    if (this.currentPage + 1 != this.endPage - 1)
                        result = result.concat([null]);

                    return result;
                }
            } else {
                return pages;
            }
        },
    },
    methods: {
        handleClick(page) {
            if (page) this.$emit("pageChange", page);
        },
    },
};
</script>

<style scoped lang="postcss">
.page-item {
    @apply py-1 px-4 font-semibold shadow-md cursor-pointer select-none;
}
.page-item:hover:not(.disabled):not(.selected) {
    @apply bg-gray-100;
}
.page-item.selected {
    @apply bg-red-500 text-white;
}
.page-item.disabled {
    @apply cursor-not-allowed;
}
</style>
