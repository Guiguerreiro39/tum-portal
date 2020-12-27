<template>
  <div class="register">
        <form @submit.prevent="register"
              class="flex flex-col items-center justify-center bg-white w-1/3 h-1/3 rounded-lg bg-opacity-50">
            <label for="name">Nome Tuna</label>
            <div>
                <input
                    id="name"
                    type="text"
                    v-model="username"
                    required
                    autofocus
                />
            </div>
            <label for="name">Primeiro e Último nome</label>
            <div>
                <input type="text" v-model="fullName" required />
            </div>
            <label for="email">E-Mail</label>
            <div>
                <input id="email" type="email" v-model="email" required />
            </div>
            <label for="password">Password</label>
            <div>
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    required
                />
            </div>
            <label for="password-confirm">Confirmar Password</label>
            <div>
                <input
                    id="password-confirm"
                    type="password"
                    v-model="password_confirmation"
                    required
                />
            </div>
            <div>
                <button type="submit"
                        class="bg-red-500 rounded-lg text-white py-1 px-3 text-xl font-medium mt-2 hover:bg-red-600">
                  Registar</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            fullName: "",
        };
    },
    methods: {
        register: function() {
            let data = {
                username: this.username,
                email: this.email,
                password: this.password,
                fullName: this.fullName,
            };
            this.$store
                .dispatch("register", data)
                .then(() => this.$router.push("/"))
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style scoped lang="postcss">
.register {
    @apply w-full h-full flex flex-col items-center justify-center;
}
.input {
    @apply w-4/5 my-2 py-2 px-2 rounded-lg outline-none;
}
.input:focus {
    @apply shadow-outline;
}
</style>
