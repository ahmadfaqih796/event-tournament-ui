<script setup lang="ts">
import BaseModal from "@/components/common/BaseModal.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import TablePagination from "@/components/style-components/table/TablePagination.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useSnackbar } from "~/composables/useSnackbar";
import { useBeritaService } from "~/services/beritaService";
import { formatDate } from "~/utils/formatMoment";
import { getErrorMessage } from "~/utils/responseMessage";

const CATEGORY_LIST = [
  { label: 'Game', value: "game" },
  { label: 'Event', value: "event" },
  { label: 'Sponsor', value: "sponsor" },
]

const { fetchBerita, addBerita, updateBerita, deleteBerita } = useBeritaService();
const { showSnackbar } = useSnackbar();

const isModalOpen = ref(false);
const isLoading = ref(false);

const form = ref({ id: null, title: "", content: "", category: "", image: "" });
const items = ref([]);
const modalType = ref<"add" | "edit" | "delete" | null>(null);
const reactiveItems = computed(() => items.value);

const openModal = (type: "add" | "edit" | "delete", rowData?: any) => {
  modalType.value = type;
  if (type === "add") {
    form.value = { id: null, title: "", content: "", category: "", image: "" };
  }
  else if (type === "edit") {
    form.value = { ...rowData, image: "" };
  }
  else if (rowData) {
    form.value = { ...rowData };
  }
  isModalOpen.value = true;
};

const confirmAction = async () => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    const payload = {
      ...form.value,
    };
    formData.append("title", payload.title);
    formData.append("content", payload.content);
    formData.append("category", payload.category);
    formData.append("image", payload.image[0]);
    if (modalType.value === "add") {
      console.log("rerereer", formData)
      await addBerita(formData);
      showSnackbar({ message: "Berita berhasil ditambahkan!", color: "success" });
    } else if (modalType.value === "edit" && form.value.id !== null) {
      await updateBerita(form.value.id, formData);
      showSnackbar({ message: "Berita berhasil diubah!", color: "success" });
    } else if (modalType.value === "delete" && form.value.id !== null) {
      await deleteBerita(form.value.id);
      showSnackbar({ message: "Berita berhasil dihapus!", color: "success" });
    }
    isModalOpen.value = false;
    items.value = await fetchBerita();
  } catch (error) {
    console.error("Action failed:", error);
    showSnackbar({ message: getErrorMessage(error), color: "error" });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  items.value = await fetchBerita();
  console.log("Fetched Items:", items.value);
});

watch(items, (newItems) => {
  console.log("Updated items:", newItems);
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Berita">
        <TablePagination :columns="[
          { title: 'No', field: 'no', sortable: true, width: 80 },
          { title: 'Judul', field: 'title', sortable: true },
          { title: 'Deskripsi', field: 'content' },
          { title: 'Kategori', field: 'category' },
          {
            title: 'Bukti', field: 'bukti', sortable: true,
            formatter: (rowData: any) => {
              return rowData.image
                ? `<div>
                        <a href='http://127.0.0.1:8000/storage/${rowData.image}' target='_blank'>
                        <img src='http://127.0.0.1:8000/storage/${rowData.image}' style='width: 100px; height: 100px; object-fit: cover;'' />
                        </a>
            </div>`
                : '';
            }
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

          <template #column(start_date)="{ rowData }">
            <div class="d-flex flex-column">
              <p>Tanggal Mulai</p>
              <p>{{ formatDate(rowData.start_date) }}</p>
              <p>Tanggal Akhir</p>
              <p>{{ formatDate(rowData.end_date) }}</p>
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
      <v-text-field v-model="form.title" label="Judul"></v-text-field>
      <v-text-field v-model="form.content" label="Description"></v-text-field>
      <v-select v-model="form.category" :items="CATEGORY_LIST" item-title="label" item-value="value"
        label="Kategori"></v-select>
      <v-file-input v-model="form.image" label="Upload Gambar"></v-file-input>
    </template>
    <template v-else>
      <p>Apakah Anda yakin ingin menghapus data ini?</p>
    </template>
  </BaseModal>
</template>
