<template>
   <div>
      <div class="flex justify-between items-center mb-3">
         <h3 class="text-lg font-semibold">Users</h3>
         <UButton @click="openModal('add')">Add</UButton>
      </div>
      <div class="border-2 border-gray-200 dark:border-gray-700">
         <UTable :loading="pending" :rows="rows" :columns="columns"
            :ui="{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: { color: 'gray' } } }">
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
            <UFormGroup label="Event Name" name="name" class="my-3">
               <UInput v-model="form.name" label="Event Name" />
            </UFormGroup>
            <UFormGroup label="Location" name="location" class="my-3">
               <UInput v-model="form.location" label="Location" />
            </UFormGroup>
            <UFormGroup label="Description" name="description" class="my-3">
               <UTextarea v-model="form.description" label="Description" />
            </UFormGroup>
            <div class="flex justify-end space-x-2 mt-4">
               <UButton @click="saveEvent" color="blue">Save</UButton>
               <UButton @click="modalOpen = false" color="gray">Cancel</UButton>
            </div>
         </div>
      </UModal>
   </div>
</template>

<script setup>
import moment from 'moment';
import { useNuxtApp } from 'nuxt/app';
const { $axios } = useNuxtApp();

const { data, pending, refresh } = useAsyncData('users', async () => {
   try {
      const response = await $axios.get('/users');
      console.log("kkkkk", response.data)
      return response.data.map(field => ({
         ...field,
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
const form = ref({ name: '', username: '', role: '' });
const selectedEvent = ref(null);

const rows = computed(() => {
   return data.value ? data.value.map(field => ({
      ...field,
      created_at: moment(field.created_at).format('YYYY-MM-DD HH:mm:ss'),
   })).slice((page.value - 1) * pageCount, (page.value) * pageCount) : [];
});

const expand = ref({
   openedRows: [rows.value[0]],
   row: {}
})
const columns = ref([
   { key: 'name', label: 'Name' },
   { key: 'username', label: 'Username' },
   { key: 'role', label: 'Role' },
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
         await $axios.post('/events', {
            ...form.value,
            "start_date": "2025-05-01 10:00:00",
            "end_date": "2025-05-05 18:00:00",
         });
      }
      modalOpen.value = false;
      alert('Event saved successfully!');
      refresh();
   } catch (error) {
      console.error('Error saving event:', error);
   }
};

const deleteEvent = async (id) => {
   try {
      await $axios.delete(`/events/${id}`);
      alert('Event deleted successfully!');
      refresh();
   } catch (error) {
      console.error('Error deleting event:', error);
   }
};

definePageMeta({
   layout: 'admin',
   middleware: 'auth',
});
</script>
