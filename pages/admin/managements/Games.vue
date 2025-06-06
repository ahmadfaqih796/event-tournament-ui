<script setup lang="ts">
import BaseModal from "@/components/common/BaseModal.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import TablePagination from "@/components/style-components/table/TablePagination.vue";
import { useGameService } from "@/services/gameService";
import { computed, onMounted, ref, watch } from "vue";
import { useSnackbar } from "~/composables/useSnackbar";
import { getErrorMessage } from "~/utils/responseMessage";

const { fetchGames, addGame, updateGame, deleteGame } = useGameService();
const { showSnackbar } = useSnackbar();

const isModalOpen = ref(false);
const isLoading = ref(false);
const form = ref({ id: null, name: "", link_image : "" });
const items = ref([]);
const modalType = ref<"add" | "edit" | "delete" | null>(null);
const reactiveItems = computed(() => items.value);

const openModal = (type: "add" | "edit" | "delete", rowData?: any) => {
  modalType.value = type;
  if (type === "add") {
    form.value = { id: null, name: "", link_image : "" };
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
      showSnackbar({ message: "Game berhasil ditambahkan!", color: "success" } );
    } else if (modalType.value === "edit" && form.value.id !== null) {
      await updateGame(form.value.id, form.value);
      showSnackbar({ message: "Game berhasil diubah!", color: "success" });
    } else if (modalType.value === "delete" && form.value.id !== null) {
      await deleteGame(form.value.id);
      showSnackbar({ message: "Game berhasil dihapus!", color: "success" });
    }
    isModalOpen.value = false;
    items.value = await fetchGames();
  } catch (error) {
    console.error("Action failed:", error);
    showSnackbar({ message: getErrorMessage(error), color: "error" });
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
        <TablePagination :columns="[
          { title: 'No', field: 'no', sortable: true, width: 80 },
          { title: 'Name', field: 'name', sortable: true },
          {
            title: 'Actions', field: 'actions', width: 150,
            actions: (rowData: any) => [
              { label: 'Edit', color: 'primary', icon: 'mdi-pencil', onClick: () => openModal('edit', rowData) },
              { label: 'Delete', color: 'error', icon: 'mdi-delete', onClick: () => openModal('delete', rowData) }
            ]
          }
        ]" :items="reactiveItems"
          :extraButtons="[{ label: 'Add', color: 'primary', icon: 'mdi-plus', onClick: () => openModal('add') }]" />
      </UiParentCard>
    </v-col>
  </v-row>

  <BaseModal v-model="isModalOpen" :loading="isLoading"
    :title="modalType === 'add' ? 'Tambah Data' : modalType === 'edit' ? 'Edit Data' : 'Hapus Data'"
    @confirm="confirmAction">
    <template v-if="modalType !== 'delete'">
      <v-text-field v-model="form.name" label="Name"></v-text-field>
      <v-text-field v-model="form.link_image" label="Link Gambar"></v-text-field>
    </template>
    <template v-else>
      <p>Apakah Anda yakin ingin menghapus data ini?</p>
    </template>
  </BaseModal>
</template>
