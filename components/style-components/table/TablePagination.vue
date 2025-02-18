<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useTable } from '@/composables/useTable';

const props = defineProps<{
  columns: {
    title: string;
    field: string;
    sortable?: boolean;
    width?: number;
    formatter?:
    Function;
    actions?: Function,
  }[];
  items: any[];
  extraButtons?: { label: string; color: string; icon: string; onClick: () => void }[];
}>();

const {
  searchQuery,
  currentPage,
  pageSize,
  paginatedItems,
  totalPages,
  sortField,
  sortOrder,
  setSort
} = useTable(props.items);

const emit = defineEmits(['update:searchQuery', 'update:pageSize', 'update:currentPage']);
</script>

<template>
  <div>
    <v-container fluid class="bg-surface-variant">
      <v-row>
        <v-col cols="12" md="3">
          <v-sheet>
            <input type="text" v-model="searchQuery" @update:model-value="emit('update:searchQuery', $event)"
              class="pa-2 w-100" placeholder="Search..." clearable append-inner-icon="mdi-magnify" />
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="d-flex justify-end gap-3">
            <template v-if="extraButtons">
              <v-btn v-for="button in extraButtons" :key="button.label" :color="button.color"
                @click="button.onClick">
                <v-icon left>{{ button.icon }}</v-icon>
                {{ button.label }}
              </v-btn>
            </template>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <!-- Pagination Controls -->
    <div class="d-flex justify-space-between align-center my-4">
      <v-btn-toggle v-model="pageSize" mandatory class="border border-primary rounded">
        <v-btn value="5">5</v-btn>
        <v-btn value="10">10</v-btn>
        <v-btn value="25">25</v-btn>
        <v-btn value="50">50</v-btn>
      </v-btn-toggle>
      <!-- <v-select
        v-model="pageSize"
       @update:model-value="emit('update:pageSize', $event)"
        :items="[5, 10, 25, 50]"
        label="Items per page"
        variant="outlined"
        density="compact"
        dense
      ></v-select> -->

      <v-pagination v-model="currentPage" :length="totalPages" rounded="circle" :total-visible="5"></v-pagination>
    </div>

    <!-- Table -->
    <v-table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.field"
            :style="{ width: col.width ? col.width + 'px' : 'auto', cursor: col.sortable ? 'pointer' : 'default' }"
            @click="col.sortable ? setSort(col.field) : null">
            {{ col.title }}
            <span v-if="col.sortable">
              <v-icon v-if="sortField === col.field && sortOrder === 'asc'">mdi-arrow-up</v-icon>
              <v-icon v-if="sortField === col.field && sortOrder === 'desc'">mdi-arrow-down</v-icon>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedItems" :key="item.id">
          <td v-for="col in columns" :key="col.field">
            <template v-if="col.formatter">
              <span v-html="col.formatter(item)"></span>
            </template>
            <template v-else-if="col.field === 'actions'">
              <v-btn v-for="action in col.actions ? col.actions(item, index) : []" :key="action.label"
                :color="action.color" :icon="action.icon" @click="action.onClick" class="mr-2">
                <v-icon>{{ action.icon }}</v-icon>
              </v-btn>
            </template>
            <template v-else>
              {{ item[col.field] }}
            </template>
          </td>
        </tr>
        <tr v-if="paginatedItems.length === 0">
          <td :colspan="columns.length" class="text-center text-grey">No data found</td>
        </tr>
      </tbody>
    </v-table>

  </div>
</template>
