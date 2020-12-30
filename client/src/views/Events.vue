<template>
    <div class="header-text">
      <div
          v-for="(event, index) in allEvents"
          :key="index"
          >
      <h2 class="eventName">{{ event.eventName }}</h2>
      <div class="w-full py-4 grid grid-cols-3">
        <div class="font-medium col-span-1">
          <h3 class="options">Local</h3>
          <h3 class="options">Descrição</h3>
        </div>
        <div class="col-span-1">
          <h3 class="options">
            {{ event.eventLocation }}
          </h3>

          <h3 class="options">
            {{ event.eventDescription }}
          </h3>
        </div>
        <div class="col-span-1 float-right justify-end flex">
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: "Events.vue",

  data() {
    return {
      allEvents: [],
      events: [],
    };
  },
  created() {
    let events = [];
    this.$store.dispatch("getAllEvents").then((res) => {
      res.forEach((event) => {
        events.push({
          eventName: event.eventName,
          eventLocation: event.eventLocation,
          eventDescription: event.eventDescription,
        });
      });
      this.allEvents = events;
    });
  },
}
</script>

<style scoped>

</style>