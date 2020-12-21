<template>
  <div class="home">
    <div class="text">
      <h1 class="title">Os Vermelhinhos</h1>
      <div class="line"></div>
      <h2 class="description">
        O cantinho da Tuna Universitária do Minho
      </h2>
      <div class="mt-8">
        <router-link
            to="/login"
            class="btn border hover:border-red-500 hover:text-red-500"
        >Entrar</router-link
        >
        <router-link
            to="/register"
            class="btn fill hover:bg-red-600 hover:border-red-600"
        >Registar</router-link
        >
      </div>
    </div>
    <div class="social">
      <v-btn small outline @click="btnClick('facebook')">
        <font-awesome-icon :icon="['fab', 'facebook']" class="icon"/>
      </v-btn>
      <v-btn small outline @click="btnClick('instagram')">
        <font-awesome-icon :icon="['fab', 'instagram']" class="icon"/>
      </v-btn>
      <v-btn small outline @click="btnClick('spotify')">
        <font-awesome-icon :icon="['fab', 'spotify']" class="icon"/>
      </v-btn>
      <v-btn small outline @click="btnClick('youtube')">
        <font-awesome-icon :icon="['fab', 'youtube']" class="icon"/>
      </v-btn>
    </div>
  </div>
</template>

<script>
import "es6-promise/auto";

export default {
  name: "home",
  methods : {
    btnClick: function (site) {
      switch (site) {
        case "facebook":
          window.open("https://www.facebook.com/tunauniversitariaminho");
          break;
        case "instagram":
          window.open("https://www.instagram.com/tunauniversitariadominho/");
          break;
        case "spotify":
          window.open("https://open.spotify.com/artist/7nEqs0isAyEONxQbPrVRgb?si=kkKOA8T5SKy_R-lPx3NpIg");
          break;
        case "youtube":
          window.open("https://www.youtube.com/user/tunaminho");
      }
    }
  }
};


</script>

<style lang="postcss" scoped>
.home {
  @apply h-full w-full text-white flex flex-col justify-between items-center pb-64 pt-44;
}
.title {
  @apply text-7xl font-medium;
}
.description {
  @apply text-lg;
}
.text {
  @apply flex flex-col items-center justify-center;
}
.btn {
  @apply px-3 py-1 rounded-lg text-xl mx-2 shadow font-medium;
}
.border {
  @apply border-2;
}
.fill {
  @apply bg-red-500 border-2 border-red-500;
}
.line {
  @apply bg-white h-1 w-2/3 my-4 rounded-full;
}
.icon {
  @apply text-4xl mx-6 cursor-pointer;
}
.icon:hover {
  @apply text-red-500;
}
</style>
