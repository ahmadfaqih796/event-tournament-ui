<script setup lang="ts">
import { ref, computed } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// Data dummy untuk tabel
const items = ref(Array.from({ length: 100 }, (_, index) => ({
   id: index + 1,
   name: `User ${index + 1}`,
   email: `user${index + 1}@example.com`,
   age: 20 + index,
   status: index % 2 === 0 ? 'Active' : 'Inactive',
   address: `Street ${index + 1}, City, Country`
})));

const columns = [
  { title: 'ID', field: 'id', sortable: true, width: 50 },
  { title: 'Name', field: 'name', sortable: true, width: 150 },
  { title: 'Email', field: 'email' },
  { title: 'Age', field: 'age' },
  { title: 'Status', field: 'status' },
  { title: 'Address', field: 'address' },
];

const searchQuery = ref('');  // Input pencarian
const currentPage = ref(1);   // Halaman saat ini
const pageSize = ref(5);      // Jumlah item per halaman

// Filter data berdasarkan pencarian
const filteredItems = computed(() => {
  return items.value.filter(item => 
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

// Hitung total halaman
const totalPages = computed(() => Math.ceil(filteredItems.value.length / pageSize.value));

// Data yang ditampilkan berdasarkan halaman
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredItems.value.slice(start, end);
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Sample Page">
        <div class="pa-7 pt-1">
          <p class="text-body-1 mb-4">This is a sample page with table, pagination & search</p>

          <!-- Search Input -->
          <v-text-field 
            v-model="searchQuery"
            label="Search..."
            variant="outlined"
            dense
            clearable
            class="mb-4"
          ></v-text-field>

          <!-- Table -->
          <v-table>
            <thead>
              <tr v-for="col in columns" :key="col.title">
                <th class="text-subtitle-1 font-weight-bold">{{ col.title }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedItems" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
              </tr>
              <tr v-if="paginatedItems.length === 0">
                <td colspan="3" class="text-center text-grey">No data found</td>
              </tr>
            </tbody>
          </v-table>

          <!-- Pagination Controls -->
          <div class="d-flex justify-space-between align-center mt-4">
            <!-- Select Page Size -->
            <v-select
              v-model="pageSize"
              :items="[5, 10, 25, 50]"
              label="Items per page"
              variant="outlined"
              dense
              class="w-25"
            ></v-select>

            <!-- Pagination Buttons -->
            <v-pagination 
              v-model="currentPage"
              :length="totalPages"
              rounded="circle"
              :total-visible="5"
            ></v-pagination>
          </div>

        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
