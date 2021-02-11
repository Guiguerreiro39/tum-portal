<template>
    <div class="text-center">
        <div
            class="fixed inset-0 h-full w-full flex items-center justify-center z-10"
            v-show="isOpen"
        >
            <ModalBackground @closeModal="handleClose()" />
            <div class="video">
                <video
                    ref="video"
                    class="video-js z-20"
                    data-setup='{"fluid": true}'
                ></video>
            </div>
            <button class="btn-exit" @click="handleClose()">
                <font-awesome-icon :icon="['fas', 'times']" />
            </button>
        </div>
        <div
            class="image"
            @mouseover="isHover = true"
            @mouseout="isHover = false"
            @click="handleClick"
        >
            <canvas ref="canvas" class="thumbnail"></canvas>
            <font-awesome-icon
                v-show="isHover"
                :icon="['far', 'play-circle']"
                class="play-icon"
            />
        </div>
        <h1 class="title">{{ name }}</h1>
    </div>
</template>

<script>
import videojs from "video.js";
import "!style-loader!css-loader!video.js/dist/video-js.min.css";

import ModalBackground from "../ModalBackground.vue";

export default {
    components: {
        ModalBackground,
    },
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
        name: {
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            player: null,
            isOpen: false,
            isMounted: false,
            isHover: false,
            videoReady: false,
        };
    },
    methods: {
        handleClick() {
            const video = this.$refs.video;
            this.isOpen = true;
            video.currentTime = 0;
            video.play();
        },
        handleClose() {
            this.isOpen = false;
            this.$refs.video.pause();
        },
    },
    async mounted() {
        const video = this.$refs.video;
        const canvas = this.$refs.canvas;

        while (!this.videoReady) {
            try {
                this.player = await videojs(video, this.options);
                this.videoReady = true;
            } catch {
                continue;
            }
        }

        video.addEventListener(
            "canplay",
            function() {
                canvas
                    .getContext("2d")
                    .drawImage(video, 0, 0, canvas.width, canvas.height);

                this.isMounted = true;
            }.bind(this)
        );
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    },
};
</script>

<style scoped lang="postcss">
.video {
    @apply w-2/3 h-auto shadow-md;
}
.thumbnail {
    @apply w-full rounded-xl;
}
.image {
    @apply relative;
}
canvas {
    @apply shadow-md h-48;
}
.image:hover {
    @apply cursor-pointer;
}
.play-icon {
    @apply absolute inset-0 m-auto text-5xl text-white text-opacity-50;
}
.title {
    @apply font-medium text-lg pt-2 capitalize;
}
.btn-exit {
    @apply text-white text-3xl z-10 absolute right-10 top-10;
}
.btn-exit:focus {
    @apply outline-none;
}
.btn-exit:hover {
    @apply text-red-500;
}
</style>
