<script setup lang="ts">
import BaseModal from "@/components/common/BaseModal.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import TablePagination from "@/components/style-components/table/TablePagination.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useSnackbar } from "~/composables/useSnackbar";
import { useTournamentService } from "~/services/tournamentService";
import { formatDate } from "~/utils/formatMoment";
import { getErrorMessage } from "~/utils/responseMessage";


const { fetchTournaments, addTournament, updateTournament, deleteTournament } = useTournamentService();
const { showSnackbar } = useSnackbar();

const isModalOpen = ref(false);
const isLoading = ref(false);

const form = ref({ id: null, name: "", description: "", close_registration: "", end_date: "", location: "" });
const items = ref([]);
const modalType = ref<"add" | "edit" | "delete" | null>(null);
const reactiveItems = computed(() => items.value);

const openModal = (type: "add" | "edit" | "delete", rowData?: any) => {
  modalType.value = type;
  if (type === "add") {
    form.value = { id: null, name: "", description: "", close_registration: "", end_date: "", location: "" };
  }
  else if (type === "edit") {
    form.value = { ...rowData, close_registration: formatDate(rowData.close_registration), end_date: formatDate(rowData.end_date) };
  }
  else if (rowData) {
    form.value = { ...rowData };
  }
  isModalOpen.value = true;
};

const confirmAction = async () => {
  isLoading.value = true;
  try {
    if (modalType.value === "add") {
      await addTournament(form.value);
      showSnackbar({ message: "Event berhasil ditambahkan!", color: "success" });
    } else if (modalType.value === "edit" && form.value.id !== null) {
      await updateTournament(form.value.id, form.value);
      showSnackbar({ message: "Event berhasil diubah!", color: "success" });
    } else if (modalType.value === "delete" && form.value.id !== null) {
      await deleteTournament(form.value.id);
      showSnackbar({ message: "Event berhasil dihapus!", color: "success" });
    }
    isModalOpen.value = false;
    items.value = await fetchTournaments();
  } catch (error) {
    console.error("Action failed:", error);
    showSnackbar({ message: getErrorMessage(error), color: "error" });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  items.value = await fetchTournaments();
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
          { title: 'Game', field: 'game', sortable: true },
          {
            title: 'Event', field: 'event', sortable: true,
            formatter: (rowData: any) => `
              <div>
                <p class='font-weight-bold text-center'>${rowData.event.name}</p>
              </div>`
          },
          {
            title: 'Status', field: 'is_paid', sortable: true,
            formatter: (rowData: any) => rowData.is_paid ? `
              <div><p class='font-weight-bold text-error text-center'>${rowData.price}</p></div>` : `
              <div>
                <p class='font-weight-bold text-${rowData.is_paid ? 'error' : 'success'} text-center'>${rowData.is_paid ? 'Paid' : 'Free'}</p>
              </div>`
          },
          {
            title: 'Tutup Pendaftaran',
            field: 'close_registration',
            sortable: true
          },
          {
            title: 'Actions', field: 'actions', width: 150,
            actions: (rowData: any) => [
              { label: 'Edit', color: 'primary', icon: 'mdi-pencil', onClick: () => openModal('edit', rowData) },
              { label: 'Delete', color: 'error', icon: 'mdi-delete', onClick: () => openModal('delete', rowData) }
            ]
          }
        ]" :items="reactiveItems"
          :extraButtons="[{ label: 'Add', color: 'primary', icon: 'mdi-plus', onClick: () => openModal('add') }]">

          <template #column(close_registration)="{ rowData }">
            <div class="d-flex flex-column">
              <p>{{ formatDate(rowData.close_registration) }}</p>
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
      <v-text-field v-model="form.close_registration" type="date" label="Start Date"></v-text-field>
      <v-text-field v-model="form.end_date" type="date" label="End Date"></v-text-field>
      <v-text-field v-model="form.location" label="Location"></v-text-field>
    </template>
    <template v-else>
      <p>Apakah Anda yakin ingin menghapus data ini?</p>
    </template>
  </BaseModal>
</template>
