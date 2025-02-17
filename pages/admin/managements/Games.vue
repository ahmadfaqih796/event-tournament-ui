<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import TablePagination from '@/components/style-components/table/TablePagination.vue';
import { useTable } from '@/composables/useTable';

// Data dummy
const items = ref(Array.from({ length: 100 }, (_, index) => ({
   id: index + 1,
   name: `User ${index + 1}`,
   email: `user${index + 1}@example.com`,
   age: 20 + index,
   status: index % 2 === 0 ? 'Active' : 'Inactive',
   address: `Street ${index + 1}, City, Country`
})));

// Definisi kolom tabel
const columns = [
  { title: 'ID', field: 'id' },
  { title: 'Name', field: 'name' },
  { title: 'Email', field: 'email' },
  { title: 'Age', field: 'age' },
  { title: 'Status', field: 'status' },
  { title: 'Address', field: 'address' },
];

// Gunakan Composable untuk pagination & search
const {
  searchQuery,
  currentPage,
  pageSize,
  paginatedItems,
  totalPages
} = useTable(items.value);
</script>

<template>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="User Table">
        <TablePagination
          :columns="columns"
          :items="items"
          v-model:searchQuery="searchQuery"
          v-model:pageSize="pageSize"
          v-model:currentPage="currentPage"
          :paginatedItems="paginatedItems"
          :totalPages="totalPages"
        />
      </UiParentCard>
    </v-col>
  </v-row>
</template>
