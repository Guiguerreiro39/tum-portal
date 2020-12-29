<template>
    <div class="header-text">
      <h2 class="eventName">{{ eventName }}</h2>
      <div class="w-full py-4 grid grid-cols-3">
        <div class="font-medium col-span-1">
          <h3 class="options">Local</h3>
          <h3 class="options">Descrição</h3>
        </div>
        <div class="col-span-1">
          <h3 class="options">
            {{ eventLocation }}
          </h3>

          <h3 class="options">
            {{ eventDescription }}
          </h3>
        </div>
        <div class="col-span-1 float-right justify-end flex">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Events.vue"
}
</script>

<style scoped>

</style>