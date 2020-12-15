<template>
    <div class="home">
        <h1>This is the home page</h1>
        <p v-if="username.length > 0">Hello {{ username }}</p>
    </div>
</template>

<script>
import "es6-promise/auto";
export default {
    name: "home",
    computed: {
        username: function() {
            const user = this.$store.getters.getUser;
            return user.username;
        },
    },
};
</script>
