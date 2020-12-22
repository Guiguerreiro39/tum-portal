<template>
  <div>
    <h4>Registar</h4>
    <form @submit.prevent="register">
      <label for="username">Username</label>
      <div>
        <input id="username" type="text" v-model="username" required autofocus>
      </div>
      <label for="email" >E-Mail</label>
      <div>
        <input id="email" type="email" v-model="email" required>
      </div>
      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required>
      </div>
      <label for="password-confirm">Confirmar Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>
      <div>
        <button type="submit">Registar</button>
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
    };
  },
  methods: {
    register: function() {
      let data = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.$store
          .dispatch("register", data)
          .then(() => this.$router.push("/"))
          .catch(err => console.log(err));
    }
  }
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