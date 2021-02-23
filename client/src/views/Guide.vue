<template>
    <div class="px-10 pt-5 h-full w-full relative">
        <div class="flex w-full overflow-hidden ">
            <div class="mr-5">
                <button class="btn-add" @click="isNewOpen = true">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </button>
            </div>
            <div class="topics">
                <button
                    class="btn-topic"
                    v-for="(instrument, index) in instruments"
                    :key="index"
                    @click="handleInstrumentChange(index)"
                    :class="{ selected: selectedInstrument == index }"
                >
                    {{ instrument }}
                </button>
            </div>
        </div>
        <div>
            <div
                class="grid grid-cols-3 grid-rows-2 gap-x-4 gap-y-5 items-center justify-center mt-5 w-full h-full"
                v-if="isMounted"
            >
                <Video
                    :options="videoOptions(guide.video)"
                    class="row-span-1"
                    v-for="(guide, index) in guides"
                    :key="index"
                    :name="guide.name"
                />
                <p
                    class="font-bold text-xl row-span-2 col-span-3 text-center mt-20 text-gray-400"
                    v-if="guides.length === 0"
                >
                    Não existem vídeos ainda!
                </p>
            </div>
            <RotateLoader
                v-else
                color="rgba(239, 68, 68, 1)"
                size="2rem"
                class="absolute right-1/2 top-1/2"
            />
        </div>
        <ModalBackground @closeModal="isNewOpen = false" v-if="isNewOpen" />
        <New
            v-if="isNewOpen"
            @closeModal="isNewOpen = false"
            @newGuide="newGuide"
            :instruments="instruments"
        />
        <Pagination
            :pager="pager"
            @pageChange="handlePageChange"
            v-if="pager"
        />
    </div>
</template>

<script>
import New from "../components/Guide/New.vue";
import Video from "../components/Guide/Video.vue";
import ModalBackground from "../components/ModalBackground";
import Pagination from "../components/Pagination";

import { instrumentType } from "../constants/types";
import { getAllGuides } from "../functions/Guide";

import RotateLoader from "vue-spinner/src/PulseLoader.vue";

export default {
    components: {
        New,
        Video,
        ModalBackground,
        Pagination,
        RotateLoader,
    },
    data() {
        return {
            selectedInstrument: 0,
            isNewOpen: false,
            isMounted: false,
            pager: null,
            guides: [],
        };
    },
    async created() {
        await this.requestGuides(1);
    },
    computed: {
        instruments: function() {
            return instrumentType;
        },
    },
    methods: {
        videoOptions(url) {
            const type = url.split(".");
            return {
                autoplay: false,
                controls: true,
                sources: [
                    {
                        src: `${url}#t=0.1`,
                        type: `video/${type[type.length - 1]}`,
                    },
                ],
            };
        },
        async handleInstrumentChange(index) {
            this.selectedInstrument = index;
            this.pager = null;
            this.isMounted = false;
            await this.requestGuides(1);
        },
        async newGuide(index) {
            this.selectedInstrument = index;
            await this.requestGuides(1);
        },
        async handlePageChange(page) {
            this.isMounted = false;
            await this.requestGuides(page);
        },
        requestGuides(page) {
            this.guides = [];
            const instrument = this.instruments[this.selectedInstrument];

            getAllGuides(instrument, page)
                .then((res) => {
                    this.pager = res.pager;
                    this.guides = res.data;
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
.btn-add {
    @apply rounded-full w-8 h-8 flex items-center justify-center bg-green-500 text-white shadow;
}
.btn-add:hover {
    @apply bg-green-600;
}
.btn-add:focus {
    @apply outline-none;
}
.topics {
    @apply flex overflow-x-auto box-border pb-2;
}
.topics::-webkit-scrollbar-thumb {
    @apply bg-transparent;
}
.btn-topic {
    @apply rounded-full bg-white shadow px-4 py-1 mx-2 font-medium capitalize;
}
.btn-topic:focus {
    @apply outline-none;
}
.btn-topic:hover:not(.selected) {
    @apply bg-gray-100;
}
.btn-topic.selected {
    @apply bg-red-500 text-white;
}
</style>
