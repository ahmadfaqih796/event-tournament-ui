<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import TablePagination from '@/components/style-components/table/TablePagination.vue';
import BaseModal from '@/components/common/BaseModal.vue';

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const confirmAction = () => {
  console.log("Confirmed!");
  isModalOpen.value = false;
};


const items = ref(Array.from({ length: 100 }, (_, index) => ({
   id: index + 1,
   name: `User ${index + 1}`,
   email: `user${index + 1}@example.com`,
   age: 20 + index,
   status: index % 2 === 0 ? 'Active' : 'Inactive',
   address: `Street ${index + 1}, City, Country`,
})));

const columns = [
  { title: 'ID', field: 'id', sortable: true, width: 50 },
  { title: 'Name', field: 'name', sortable: true, width: 150 },
  { title: 'Email', field: 'email' },
  { title: 'Age', field: 'age' },
  { title: 'Status', field: 'status' },
  { title: 'Address', field: 'address', width: 200 },
  { 
    title: 'Data', 
    field: 'data', 
    formatter: (rowData: any) => `
      <div>
        <p>Data here</p>
        <p>${rowData.name}</p>
        <p>${rowData.age}</p>
        <p>${rowData.status}</p>
      </div>
    `
  },
  { 
    title: 'Actions', 
    field: 'actions', 
    actions: (rowData: any, index: number) => [
      { label: 'Edit', color: 'primary', icon: 'mdi-pencil', onClick: () => {openModal()} },
      { label: 'Delete', color: 'error', icon: 'mdi-delete', onClick: () => {} }
    ]
  }
];

const buttonList = [
      { label: 'Add', color: 'primary', icon: 'mdi-plus', onClick: () => {openModal()} },
      { label: 'Filter', color: 'error', icon: 'mdi-filter', onClick: () => {console.log("ini adalah filter")} }
    ]
</script>

<template>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="User Table">
        <TablePagination
          :columns="columns"
          :items="items"
          :extraButtons="buttonList"
        />
      </UiParentCard>
    </v-col>
  </v-row>

  <BaseModal v-model="isModalOpen" title="Tambah Data" @confirm="confirmAction">
    <p>Isi form atau informasi lainnya di sini.</p>
  </BaseModal>
</template>
