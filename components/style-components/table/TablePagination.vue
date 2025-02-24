<script setup lang="ts">
import { defineProps, defineEmits, computed, watch } from "vue";
import { useTable } from "@/composables/useTable";

const props = defineProps<{
  columns: {
    title: string;
    field: string;
    sortable?: boolean;
    width?: number;
    formatter?: Function;
    actions?: Function;
  }[];
  items: any[];
  extraButtons?: { label: string; color: string; icon: string; onClick: () => void }[];
}>();



const reactiveItems = computed(() => props.items);

const {
  searchQuery,
  currentPage,
  pageSize,
  paginatedItems,
  totalPages,
  sortField,
  sortOrder,
  setSort
} = useTable(reactiveItems as any);

const emit = defineEmits(['update:searchQuery', 'update:pageSize', 'update:currentPage']);

watch(paginatedItems, (newPaginatedItems) => {
  console.log("Paginated items:", newPaginatedItems);
});
</script>

<template>
  <div class="my-4 mx-4">
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12" md="3">
          <v-sheet>
            <input type="text" v-model="searchQuery" @update:model-value="emit('update:searchQuery', $event)"
              class="pa-2 w-100 rounded border border-primary" placeholder="Search..." clearable
              append-inner-icon="mdi-magnify" />
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="d-flex justify-end gap-3">
            <template v-if="extraButtons">
              <v-btn v-for="button in extraButtons" :key="button.label" :color="button.color" @click="button.onClick">
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
            <template v-if="$slots[`column(${col.field})`]">
              <slot :name="`column(${col.field})`" :rowData="item"></slot>
            </template>
            <template v-else-if="col.formatter">
              <span v-html="col.formatter(item)"></span>
            </template>
            <template v-else-if="col.field === 'actions'">
              <div class="d-flex align-center justify-center">
                <v-btn v-for="action in col.actions ? col.actions(item) : []" :key="action.label" :color="action.color"
                  :icon="action.icon" @click="action.onClick" density="comfortable">
                  <v-icon>{{ action.icon }}</v-icon>
                </v-btn>
              </div>
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
