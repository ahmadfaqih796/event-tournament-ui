<script setup lang="ts">
import BaseModal from "@/components/common/BaseModal.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import TablePagination from "@/components/style-components/table/TablePagination.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useSnackbar } from "~/composables/useSnackbar";
import { useEventService } from "~/services/eventService";
import { formatDate } from "~/utils/formatMoment";
import { getErrorMessage } from "~/utils/responseMessage";


const { fetchEvents, addEvent, updateEvent, deleteEvent } = useEventService();
const { showSnackbar } = useSnackbar();

const isModalOpen = ref(false);
const isLoading = ref(false);

const form = ref({ id: null, name: "", description: "", start_date: "", end_date: "", location: "" });
const items = ref([]);
const modalType = ref<"add" | "edit" | "delete" | null>(null);
const reactiveItems = computed(() => items.value);

const openModal = (type: "add" | "edit" | "delete", rowData?: any) => {
  modalType.value = type;
  if (type === "add") {
    form.value = { id: null, name: "", description: "", start_date: "", end_date: "", location: "" };
  } else if (rowData) {
    form.value = { ...rowData };
  }
  isModalOpen.value = true;
};

const confirmAction = async () => {
  isLoading.value = true;
  try {
    if (modalType.value === "add") {
      await addEvent(form.value);
      showSnackbar({ message: "Event berhasil ditambahkan!", color: "success" });
    } else if (modalType.value === "edit" && form.value.id !== null) {
      await updateEvent(form.value.id, form.value);
      showSnackbar({ message: "Event berhasil diubah!", color: "success" });
    } else if (modalType.value === "delete" && form.value.id !== null) {
      await deleteEvent(form.value.id);
      showSnackbar({ message: "Event berhasil dihapus!", color: "success" });
    }
    isModalOpen.value = false;
    items.value = await fetchEvents();
  } catch (error) {
    console.error("Action failed:", error);
    showSnackbar({ message: getErrorMessage(error), color: "error" });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  items.value = await fetchEvents();
  console.log("Fetched Items:", items.value);
});

watch(items, (newItems) => {
  console.log("Updated items:", newItems);
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Events">
        <TablePagination :columns="[
          { title: 'No', field: 'no', sortable: true, width: 80 },
          { title: 'Name', field: 'name', sortable: true },
          { title: 'Description', field: 'description', sortable: true },
          {
            title: 'Acara',
            field: 'start_date',
            sortable: true
          },
          { title: 'Location', field: 'location' },
          {
            title: 'Actions', field: 'actions', width: 150,
            actions: (rowData: any) => [
              { label: 'Edit', color: 'primary', icon: 'mdi-pencil', onClick: () => openModal('edit', rowData) },
              { label: 'Delete', color: 'error', icon: 'mdi-delete', onClick: () => openModal('delete', rowData) }
            ]
          }
        ]" :items="reactiveItems"
          :extraButtons="[{ label: 'Add', color: 'primary', icon: 'mdi-plus', onClick: () => openModal('add') }]">

          <template #column(start_date)="{ rowData }">
            <div class="d-flex flex-column">
              <p>{{ formatDate(rowData.start_date) }}</p>
              <p>{{ formatDate(rowData.end_date) }}</p>

              sss
            </div>
          </template>
        </TablePagination>
      </UiParentCard>
    </v-col>
  </v-row>

  <BaseModal v-model="isModalOpen" :loading="isLoading"
    :title="modalType === 'add' ? 'Tambah Data' : modalType === 'edit' ? 'Edit Data' : 'Hapus Data'"
    @confirm="confirmAction">
    <template v-if="modalType !== 'delete'">
      <v-text-field v-model="form.name" label="Name"></v-text-field>
      <v-text-field v-model="form.description" label="Description"></v-text-field>
      <v-text-field v-model="form.start_date" type="date" label="Start Date"></v-text-field>
      <v-text-field v-model="form.end_date" type="date" label="End Date"></v-text-field>
      <v-text-field v-model="form.location" label="Location"></v-text-field>
    </template>
    <template v-else>
      <p>Apakah Anda yakin ingin menghapus data ini?</p>
    </template>
  </BaseModal>
</template>
