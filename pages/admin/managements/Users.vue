<script setup lang="ts">
import BaseModal from "@/components/common/BaseModal.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import TablePagination from "@/components/style-components/table/TablePagination.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useUserService } from "~/services/userService";
import { useSnackbar } from "~/composables/useSnackbar";
import { getErrorMessage } from "~/utils/responseMessage";

const STATUS_ACTIVE = [
   { label: 'Active', value: 1 },
   { label: 'Inactive', value: 0 },
]

const { fetchUsers, addUser, updateUser, deleteUser } = useUserService();
const { showSnackbar } = useSnackbar();

const isModalOpen = ref(false);
const isLoading = ref(false);
const form = ref({ id: null, name: "", username: "", is_active: 1, role: "peserta" });
const items = ref([]);
const modalType = ref<"add" | "edit" | "delete" | null>(null);
const reactiveItems = computed(() => items.value);

const openModal = (type: "add" | "edit" | "delete", rowData?: any) => {
  modalType.value = type;
  if (type === "add") {
    form.value = { id: null, name: "", username: "", is_active: 1, role: "peserta" };
  } else if (rowData) {
    form.value = { ...rowData };
  }
  isModalOpen.value = true;
};

const confirmAction = async () => {
  isLoading.value = true;
  try {
    if (modalType.value === "add") {
      await addUser(form.value);
      showSnackbar({ message: "User berhasil ditambahkan!", color: "success" });
    } else if (modalType.value === "edit" && form.value.id !== null) {
      await updateUser(form.value.id, form.value);
      showSnackbar({ message: "User berhasil diubah!", color: "success" });
    } else if (modalType.value === "delete" && form.value.id !== null) {
      await deleteUser(form.value.id);
      showSnackbar({ message: "User berhasil dihapus!", color: "success" });
    }
    isModalOpen.value = false;
    items.value = await fetchUsers();
  } catch (error ) {
    console.error("Action failed:", error);
    showSnackbar({ message: getErrorMessage(error), color: "error" });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  items.value = await fetchUsers();
  console.log("Fetched Items:", items.value);
});

watch(items, (newItems) => {
  console.log("Updated items:", newItems);
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Users">
        <TablePagination
          :columns="[
            { title: 'No', field: 'no', sortable: true, width: 80},
            { title: 'Name', field: 'name', sortable: true },
            { title: 'Role', field: 'role', sortable: true },
            { title: 'Status', field: 'is_active', sortable: true,
              formatter: (rowData: any) => `
                <div>
                  <p class='font-weight-bold text-${rowData.is_active ? 'success' : 'error'} text-center'>${rowData.is_active ? 'Active' : 'Inactive'}</p>
                </div>`
             },
            { title: 'Actions', field: 'actions', width: 150, 
              actions: (rowData: any) => [
                { label: 'Edit', color: 'primary', icon: 'mdi-pencil', onClick: () => openModal('edit', rowData) },
                { label: 'Delete', color: 'error', icon: 'mdi-delete', onClick: () => openModal('delete', rowData) }
              ] 
            }
          ]"
          :items="reactiveItems"
        />
      </UiParentCard>
    </v-col>
  </v-row>

  <BaseModal v-model="isModalOpen" :loading="isLoading" :title="modalType === 'add' ? 'Tambah Data' : modalType === 'edit' ? 'Edit Data' : 'Hapus Data'" @confirm="confirmAction">
    <template v-if="modalType !== 'delete'">
      <v-text-field v-model="form.name" label="Name"></v-text-field>
      <v-select v-model="form.role" :items="['peserta', 'komunitas']" label="Role"></v-select>
      <v-select v-model="form.is_active" :items="STATUS_ACTIVE" item-title="label" item-value="value"
      label="Status"></v-select>
    </template>
    <template v-else>
      <p>Apakah Anda yakin ingin menghapus data ini?</p>
    </template>
  </BaseModal>
</template>
