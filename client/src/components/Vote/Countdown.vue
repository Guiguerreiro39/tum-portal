<template>
    <div>
        <p v-if="!isFinished">
            Termina em <span class="font-medium">{{ countdown }}</span>
        </p>
    </div>
</template>

<script>
export default {
    props: ["time"],
    data() {
        return {
            isFinished: false,
            countdown: null,
        };
    },
    methods: {
        timeLeft: function() {
            return this.time - Date.now();
        },
        setCountdown: function() {
            var timeToFinish = this.timeLeft();

            var seconds = (timeToFinish / 1000) | 0;
            var minutes = (timeToFinish / (1000 * 60)) | 0;
            var hours = (timeToFinish / (1000 * 60 * 60)) | 0;
            var days = (timeToFinish / (1000 * 60 * 60 * 24)) | 0;

            let result;

            if (timeToFinish < 0) {
                this.isFinished = true;
                this.$emit("finish");
                clearInterval(this.interval);
            } else {
                if (seconds < 60) {
                    result = seconds + " Segundo";
                } else if (minutes < 60) {
                    result = minutes + " Minuto";
                } else if (hours < 24) {
                    result = hours + " Hora";
                } else {
                    result = days + " Dia";
                }

                if (seconds !== 1 && minutes !== 1 && hours !== 1 && days !== 1)
                    result = result + "s";
            }

            this.countdown = result;
        },
    },
    created() {
        this.interval = setInterval(this.setCountdown(), 1000);
    },
    destroyed() {
        clearInterval(this.interval);
    },
};
</script>

<style></style>
