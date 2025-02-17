<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  columns: { title: string; field: string }[];
  items: any[];
  searchQuery: string;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  paginatedItems: any[];
}>();

const emit = defineEmits(['update:searchQuery', 'update:pageSize', 'update:currentPage']);
</script>

<template>
  <div>
    <!-- Search Input -->
    <v-text-field 
      :model-value="searchQuery"
      @update:model-value="emit('update:searchQuery', $event)"
      label="Search..."
      variant="outlined"
      dense
      clearable
      class="mb-4"
    ></v-text-field>

    <!-- Table -->
    <v-table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.title" class="text-subtitle-1 font-weight-bold">
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedItems" :key="item.id">
          <td v-for="col in columns" :key="col.field">{{ item[col.field] }}</td>
        </tr>
        <tr v-if="paginatedItems.length === 0">
          <td :colspan="columns.length" class="text-center text-grey">No data found</td>
        </tr>
      </tbody>
    </v-table>

    <!-- Pagination Controls -->
    <div class="d-flex justify-space-between align-center mt-4">
      <!-- Select Page Size -->
      <v-select
        :model-value="pageSize"
        @update:model-value="emit('update:pageSize', $event)"
        :items="[5, 10, 25, 50]"
        label="Items per page"
        variant="outlined"
        dense
        class="w-25"
      ></v-select>

      <!-- Pagination Buttons -->
      <v-pagination 
        :model-value="currentPage"
        @update:model-value="emit('update:currentPage', $event)"
        :length="totalPages"
        rounded="circle"
        :total-visible="5"
      ></v-pagination>
    </div>
  </div>
</template>
