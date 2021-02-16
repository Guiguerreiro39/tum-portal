<template>
    <div class="header-text">
      <div class="extras">
        <div class="row justify-content-center">
          <div class="col-md-8">
              <div class="flex justify-between items-center">
                  <input
                      type="text"
                      placeholder="Evento"
                      autocomplete="Event-name"
                      v-model="events.eventName"
                      class="input"
                      autofocus
                  />
                <input
                    type="date"
                    placeholder="Evento"
                    autocomplete="Event-date"
                    v-model="events.date"
                    format="DD/MM/YYYY"
                    class="input"
                    autofocus
                />
                  <input
                      type="text"
                      placeholder="Local"
                      autocomplete="event-Location"
                      v-model="events.eventLocation"
                      class="input"
                      autofocus
                  />
                  <input
                      type="text"
                      placeholder="Descrição"
                      autocomplete="event-Description"
                      v-model="events.eventDescription"
                      class="input"
                      autofocus
                  />
                  <button class="create-btn" @click="createEvent()">
                    Adicionar Evento
                  </button>
              </div>
          </div>
        </div>
      </div>
      <div class="h-full w-full p-10">
        <div
            class="h-full w-full bg-white shadow-md rounded-lg divide-solid divide-y overflow-hidden"
        >
  <table
    class="w-full h-full flex flex-col rounded-lg"
      v-if="events.length > 0"
  >
    <colgroup>
      <col span="1" style="width: 15%;" />
      <col span="1" style="width: 15%;" />
      <col span="1" style="width: 15%;" />
      <col span="1" style="width: 55%;" />
    </colgroup>
    <thead class="table-fixed table">
    <tr class="w-full pr-2">
      <th class="event pl-4" style="width: 15%;">Evento</th>
      <th class="date pr-4" style="width: 15%;">Data</th>
      <th class="location pr-4" style="width: 15%;">Local</th>
      <th class="description pr-4" style="width: 55%;">Descrição</th>
    </tr>
    </thead>
    <tbody class="overflow-scroll ml-2">
    <tr
        v-for="(event, index) in events"
        :key="index"
        class="table-fixed table w-full"
    >
      <td class="name" style="width: 15%;">
        {{ event.eventName}}
      </td>
      <td class="date" style="width: 15%;">
        {{ format_date(event.eventDate)}}
      </td>
      <td class="rehearsal" style="width: 15%;">
        {{ event.eventLocation }}
      </td>
      <td class="event" style="width: 55%;">
        {{ event.eventDescription }}
      </td>
    </tr>
    </tbody>
  </table>
    </div>
      </div>
    </div>
</template>

<script>
import {
  createEvent
} from "../functions/Events";
import Table from "@/components/Rehearsals/Table";
import moment from 'moment'
export default {
  name: "Events.vue",
  components: { Table },
  data() {
    return {
      events: [],
    };
  },
  methods: {
    createEvent() {
      if (
          this.events.eventName.length > 0
      ) {
        createEvent(this.events.eventName, this.events.date, this.events.eventLocation, this.events.eventDescription)
            .catch((err) => {
              console.log(err);
            });
      }
    },
    format_date(data){
      if (data) {
        return moment(String(data)).format('DD/MM/YYYY')
      }
    },
  },
    created() {
      this.$store.dispatch("getAllEvents").then((res) => {
        this.events = res;
      });
    },
};
</script>

<style scoped lang="postcss">
.create-btn {
  @apply bg-green-500 py-1 px-2 rounded-lg text-white inline-block ml-4;
}

.create-btn:hover {
  @apply bg-green-600;
}

th,
td {
  @apply py-2;
}
th {
  @apply text-white bg-red-600;
}
tbody {
  @apply divide-solid divide-y;
}
.extras {
  @apply bg-white row-span-1 rounded-lg shadow-md px-5 py-4;
}
.rehearsal,
.event,
.name,
.date {
  @apply text-center;

}
</style>