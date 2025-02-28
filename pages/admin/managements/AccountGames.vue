<script setup lang="ts">
import BaseModal from "@/components/common/BaseModal.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import TablePagination from "@/components/style-components/table/TablePagination.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useSnackbar } from "~/composables/useSnackbar";
import { useAccountGameService } from "~/services/accountGameService";
import { useGameService } from "~/services/gameService";
import { getErrorMessage } from "~/utils/responseMessage";

const { fetchAccountGames, addAccountGame, updateAccountGame, deleteAccountGame } = useAccountGameService();
const { fetchGames } = useGameService();
const { showSnackbar } = useSnackbar();

const isModalOpen = ref(false);
const isLoading = ref(false);

const form = ref({ id: null, name: "", account: "", game_id: null});
const items = ref([]);
const fetchData = reactive({
  games: [],
})
const modalType = ref<"add" | "edit" | "delete" | null>(null);
const reactiveItems = computed(() => items.value);

const openModal = (type: "add" | "edit" | "delete", rowData?: any) => {
   modalType.value = type;
   if (type === "add") {
      form.value = { id: null, name: "", account: "", game_id: null};
   }
   else if (type === "edit") {
      form.value = { ...rowData};
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
         await addAccountGame(form.value);
         showSnackbar({ message: "Account Game berhasil ditambahkan!", color: "success" });
      } else if (modalType.value === "edit" && form.value.id !== null) {
         await updateAccountGame(form.value.id, form.value);
         showSnackbar({ message: "Account Game berhasil diubah!", color: "success" });
      } else if (modalType.value === "delete" && form.value.id !== null) {
         await deleteAccountGame(form.value.id);
         showSnackbar({ message: "Account Game berhasil dihapus!", color: "success" });
      }
      isModalOpen.value = false;
      items.value = await fetchAccountGames();
   } catch (error) {
      console.error("Action failed:", error);
      showSnackbar({ message: getErrorMessage(error), color: "error" });
   } finally {
      isLoading.value = false;
   }
};

onMounted(async () => {
   items.value = await fetchAccountGames();
   console.log("Fetched Items:", items.value);
   const responseFetch = {
      games: await fetchGames(),
   }
   fetchData.games = responseFetch.games;
});

watch(items, (newItems) => {
   console.log("Updated items:", newItems);
});
</script>

<template>
   <v-row>
      <v-col cols="12">
         <UiParentCard title="Account Game">
            <TablePagination :columns="[
               { title: 'No', field: 'no', sortable: true, width: 80 },
               { title: 'Name', field: 'name', sortable: true },
               { title: 'Account ID', field: 'account', sortable: true },
               {
                  title: 'Game', field: 'game',
                  formatter: (rowData: any) => `
                     <div class='pa-1 bg-primary rounded'>
                     <p class='font-weight-bold text-center'>${rowData.game.name}</p>
                     </div>
                  `
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
            </TablePagination>
         </UiParentCard>
      </v-col>
   </v-row>

   <BaseModal v-model="isModalOpen" :loading="isLoading"
      :title="modalType === 'add' ? 'Tambah Data' : modalType === 'edit' ? 'Edit Data' : 'Hapus Data'"
      @confirm="confirmAction">
      <template v-if="modalType !== 'delete'">
         <v-autocomplete v-model="form.game_id" :items="fetchData.games" item-title="name" item-value="id"
         label="Games" clearable></v-autocomplete>
         <v-text-field v-model="form.name" label="Name"></v-text-field>
         <v-text-field v-model="form.account" label="Account"></v-text-field>
      </template>
      <template v-else>
         <p>Apakah Anda yakin ingin menghapus data ini?</p>
      </template>
   </BaseModal>
</template>
