<template>
   <div>
      <div class="flex justify-between items-center mb-3">
         <h3 class="text-lg font-semibold">Users</h3>
         <!-- <UButton @click="openModal('add')">Add</UButton> -->
      </div>
      <div class="border-2 border-gray-200 dark:border-gray-700">
         <UTable :loading="pending" :rows="rows" :columns="columns"
            :ui="{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: { color: 'gray' } } }">
            <template #actions-data="{ row }">
               <UButton @click="openModal('edit', row)" size="sm">Edit</UButton>
               <UButton @click="deleteData(row.id)" color="red" size="sm">Delete</UButton>
            </template>
         </UTable>
      </div>

      <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
         <UPagination v-model="page" :page-count="pageCount" :total="data?.length || 0" />
      </div>

      <UModal v-model="modalOpen">
         <div class="p-6">
            <h3 class="text-lg font-semibold">{{ modalType === 'edit' ? 'Edit User' : 'Add User' }}</h3>
            <UFormGroup label="Name" name="name" class="my-3">
               <UInput v-model="form.name" label="Name" />
            </UFormGroup>
            <UFormGroup name="role" label="Role">
               <UInputMenu v-model="form.role" :options="roleOptions" />
            </UFormGroup>
            <div class="flex justify-end space-x-2 mt-4">
               <UButton @click="saveData" color="blue">Save</UButton>
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
const roleOptions = [
   { label: 'Admin', value: 'admin' },
   { label: 'Komunitas', value: 'komunitas' },
   { label: 'Peserta', value: 'peserta' }
]

const { data, pending, refresh } = useAsyncData('users', async () => {
   try {
      const response = await $axios.get('/users');
      return response.data.map(field => ({
         ...field,
      }));
   } catch (error) {
      console.error('Error fetching users:', error);
      return [];
   }
});

const page = ref(1);
const pageCount = 5;
const modalOpen = ref(false);
const modalType = ref('add');
const form = ref({ name: '', role: '' });
const selectedData = ref(null);

const rows = computed(() => {
   return data.value ? data.value.map(field => ({
      ...field,
      created_at: moment(field.created_at).format('YYYY-MM-DD HH:mm:ss'),
   })).slice((page.value - 1) * pageCount, (page.value) * pageCount) : [];
});

const columns = ref([
   { key: 'name', label: 'Name' },
   { key: 'username', label: 'Username' },
   { key: 'role', label: 'Role' },
   { key: 'created_at', label: 'Created At' },
   { key: 'actions', label: 'Actions' }
]);

const openModal = (type, data = null) => {
   modalType.value = type;
   modalOpen.value = true;
   if (data) {
      selectedData.value = data;
      form.value = { ...data };
   } else {
      form.value = { name: '', role: '' };
   }
};

const saveData = async () => {
   try {
      if (modalType.value === 'edit' && selectedData.value) {
         const payloadEdit = {
            name: form.value.name,
            role: form.value.role
         }
         await $axios.put(`/users/${selectedData.value.id}`, payloadEdit);
      } else {
         await $axios.post('/users', {
            ...form.value,
         });
      }
      modalOpen.value = false;
      alert('Data saved successfully!');
      refresh();
   } catch (error) {
      console.error('Error saving data:', error);
   }
};

const deleteData = async (id) => {
   try {
      await $axios.delete(`/users/${id}`);
      alert('data deleted successfully!');
      refresh();
   } catch (error) {
      alert("Gagal menghapus data");
      console.error('Error deleting :', error);
   }
};

definePageMeta({
   layout: 'admin',
   middleware: 'auth',
});
</script>
