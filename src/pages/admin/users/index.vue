<template>
   <div>
      <div class="border-2 border-gray-200 dark:border-gray-700">
         <UTable :loading="pending" :rows="rows" :columns="columns" v-model:expand="expand"
            :ui="{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: { color: 'gray' } } }">
            <template #approved-data="{ row }">
               <UBadge size="xs" :label="row.approved ? 'Approved' : 'Rejected'"
                  :color="row.approved ? 'emerald' : 'red'" variant="subtle" />
            </template>
            <template #expand="{ row }">
               <!-- Your custom expand action content -->
               <div class="p-4">
                  <pre>{{ row }}</pre>
               </div>
            </template>
            <template #tournaments-data="{ row }">
               <div v-if="row.tournaments.length" class="p-4 border-t">
                  <!-- <h3 class="font-semibold">Tournaments:</h3>
                  <ul class="list-disc pl-5">
                     <li v-for="tournament in row.tournaments" :key="tournament.event_id">
                        {{ tournament.name }} - {{ tournament.game }} ({{ tournament.status }})
                     </li>
                  </ul> -->
               </div>
            </template>
            <template #actions-data="{ row }">
               <UButton @click="openModal('edit', row)" size="sm">Edit</UButton>
               <UButton @click="deleteEvent(row.id)" color="red" size="sm">Delete</UButton>
            </template>
         </UTable>
      </div>

      <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
         <UPagination v-model="page" :page-count="pageCount" :total="data?.length || 0" />
      </div>

      <!-- Modal Component -->
      <UModal v-model="modalOpen">
         <div class="p-6">
            <h3 class="text-lg font-semibold">{{ modalType === 'edit' ? 'Edit Event' : 'Add Event' }}</h3>
            <UInput v-model="form.name" label="Event Name" class="mt-3" />
            <UInput v-model="form.location" label="Location" class="mt-3" />
            <UTextarea v-model="form.description" label="Description" class="mt-3" />
            <div class="flex justify-end space-x-2 mt-4">
               <UButton @click="saveEvent" color="blue">Save</UButton>
               <UButton @click="modalOpen = false" color="gray">Cancel</UButton>
            </div>
         </div>
      </UModal>
   </div>
</template>

<script setup>
import { useNuxtApp } from 'nuxt/app';
const { $axios } = useNuxtApp();

const { data, pending } = useAsyncData('events', async () => {
   try {
      const response = await $axios.get('/events');
      console.log("kkkkk", response.data)
      return response.data.map(event => ({
         ...event,
         disabledExpand: event.tournaments.length ? false : true,
         created_by: event.created_by || { id: null, name: 'Unknown' }
      }));
   } catch (error) {
      console.error('Error fetching events:', error);
      return [];
   }
});

const page = ref(1);
const pageCount = 5;
const modalOpen = ref(false);
const modalType = ref('add');
const form = ref({ name: '', location: '', description: '' });
const selectedEvent = ref(null);

const rows = computed(() => {
   return data.value ? data.value.map(event => ({
      ...event,
      tournaments: Array.isArray(event.tournaments) ? event.tournaments : [],
      created_by: event.created_by || { id: null, name: 'Unknown' },
      approved: event.approved || false
   })).slice((page.value - 1) * pageCount, (page.value) * pageCount) : [];
});

const expand = ref({
   openedRows: [rows.value[0]],
   row: {}
})
const columns = ref([
   { key: 'name', label: 'Event Name' },
   { key: 'tournaments', label: 'Tournaments' },
   { key: 'approved', label: 'Approved' },
   { key: 'created_by.name', label: 'Created By' },
   { key: 'created_at', label: 'Created At' },
   { key: 'actions', label: 'Actions' }
]);

const openModal = (type, event = null) => {
   modalType.value = type;
   modalOpen.value = true;
   if (event) {
      selectedEvent.value = event;
      form.value = { ...event };
   } else {
      form.value = { name: '', location: '', description: '' };
   }
};

const saveEvent = async () => {
   try {
      if (modalType.value === 'edit' && selectedEvent.value) {
         await $axios.put(`/events/${selectedEvent.value.id}`, form.value);
      } else {
         await $axios.post('/events', form.value);
      }
      modalOpen.value = false;
   } catch (error) {
      console.error('Error saving event:', error);
   }
};

const deleteEvent = async (id) => {
   try {
      await $axios.delete(`/events/${id}`);
   } catch (error) {
      console.error('Error deleting event:', error);
   }
};

definePageMeta({
   layout: 'admin',
   middleware: 'auth',
});
</script>
