<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import TablePagination from "@/components/style-components/table/TablePagination.vue";
import BaseModal from "@/components/common/BaseModal.vue";
import { useGameService } from "@/services/gameService";

const { fetchGames, addGame, updateGame, deleteGame } = useGameService();

const isModalOpen = ref(false);
const isLoading = ref(false);
const form = ref({ id: null, name: "" });
const items = ref([]);
const modalType = ref<"add" | "edit" | "delete" | null>(null);
const reactiveItems = computed(() => items.value);

const openModal = (type: "add" | "edit" | "delete", rowData?: any) => {
  modalType.value = type;
  if (type === "add") {
    form.value = { id: null, name: "" };
  } else if (rowData) {
    form.value = { ...rowData };
  }
  isModalOpen.value = true;
};

const confirmAction = async () => {
  isLoading.value = true;
  try {
    if (modalType.value === "add") {
      await addGame(form.value);
    } else if (modalType.value === "edit" && form.value.id !== null) {
      await updateGame(form.value.id, form.value);
    } else if (modalType.value === "delete" && form.value.id !== null) {
      await deleteGame(form.value.id);
    }
    isModalOpen.value = false;
    items.value = await fetchGames();
  } catch (error) {
    console.error("Action failed:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  items.value = await fetchGames();
  console.log("Fetched Items:", items.value);
});

watch(items, (newItems) => {
  console.log("Updated items:", newItems);
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Games">
        <TablePagination
          :columns="[
            { title: 'No', field: 'no', sortable: true, width: 80},
            { title: 'Name', field: 'name', sortable: true },
            { title: 'Actions', field: 'actions', width: 150, 
              actions: (rowData: any) => [
                { label: 'Edit', color: 'primary', icon: 'mdi-pencil', onClick: () => openModal('edit', rowData) },
                { label: 'Delete', color: 'error', icon: 'mdi-delete', onClick: () => openModal('delete', rowData) }
              ] 
            }
          ]"
          :items="reactiveItems"
          :extraButtons="[{ label: 'Add', color: 'primary', icon: 'mdi-plus', onClick: () => openModal('add') }]"
        />
      </UiParentCard>
    </v-col>
  </v-row>

  <BaseModal v-model="isModalOpen" :loading="isLoading" :title="modalType === 'add' ? 'Tambah Data' : modalType === 'edit' ? 'Edit Data' : 'Hapus Data'" @confirm="confirmAction">
    <template v-if="modalType !== 'delete'">
      <v-text-field v-model="form.name" label="Name"></v-text-field>
    </template>
    <template v-else>
      <p>Apakah Anda yakin ingin menghapus data ini?</p>
    </template>
  </BaseModal>
</template>
