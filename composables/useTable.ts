// ~/composables/useTable.ts
import { ref, computed } from "vue";

export function useTable<T>(items: T[], defaultPageSize = 5) {
  const searchQuery = ref("");
  const currentPage = ref(1);
  const pageSize = ref(defaultPageSize);

  // Filter data berdasarkan pencarian
  const filteredItems = computed(() => {
    return items.filter((item) =>
      Object.values(item as Object).some((val) =>
        String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  });

  // Hitung total halaman
  const totalPages = computed(() =>
    Math.ceil(filteredItems.value.length / pageSize.value)
  );

  // Data yang ditampilkan berdasarkan halaman
  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredItems.value.slice(start, end);
  });

  return {
    searchQuery,
    currentPage,
    pageSize,
    filteredItems,
    paginatedItems,
    totalPages,
  };
}
