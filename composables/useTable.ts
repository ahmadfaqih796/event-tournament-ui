export function useTable(items: any[]) {
  const itemsRef = ref(items);
  const searchQuery = ref("");
  const currentPage = ref(1);
  const pageSize = ref(5);
  const sortField = ref<string | null>(null);
  const sortOrder = ref<"asc" | "desc" | null>(null);

  const setSort = (field: string) => {
    if (sortField.value === field) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortField.value = field;
      sortOrder.value = "asc";
    }
  };

  const filteredItems = computed(() => {
    return itemsRef.value.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  });

  const sortedItems = computed(() => {
    if (!sortField.value) return filteredItems.value;
    return [...filteredItems.value].sort((a, b) => {
      const valA = a[sortField.value!];
      const valB = b[sortField.value!];

      if (valA < valB) return sortOrder.value === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    });
  });

  // 🔹 Paginasi
  const totalPages = computed(() =>
    Math.ceil(sortedItems.value.length / pageSize.value)
  );

  watchEffect(() => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value || 1;
    }
  });

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    return sortedItems.value.slice(start, start + pageSize.value);
  });

  return {
    searchQuery,
    currentPage,
    pageSize,
    sortField,
    sortOrder,
    paginatedItems,
    totalPages,
    setSort,
  };
}
