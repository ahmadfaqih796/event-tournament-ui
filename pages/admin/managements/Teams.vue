<script setup lang="ts">
import BaseModal from "@/components/common/BaseModal.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import TablePagination from "@/components/style-components/table/TablePagination.vue";
import { useGameService } from "@/services/gameService";
import { computed, onMounted, ref, watch } from "vue";
import { useSnackbar } from "~/composables/useSnackbar";
import { useTeamService } from "~/services/teamService";
import { getErrorMessage } from "~/utils/responseMessage";

const { fetchTeams, addTeam, updateTeam, deleteTeam } = useTeamService();
const { fetchGames } = useGameService();
const { showSnackbar } = useSnackbar();

const isModalOpen = ref(false);
const isLoading = ref(false);
const form = ref({ id: null, name: "", game: "", leader_team: "", member_team: [], });
const items = ref([]);
const fetchData = reactive({
   games: [],
})
const modalType = ref<"add" | "edit" | "delete" | null>(null);
const reactiveItems = computed(() => items.value);

const openModal = (type: "add" | "edit" | "delete", rowData?: any) => {
   modalType.value = type;
   if (type === "add") {
      form.value = { id: null, name: "", game: "", leader_team: "", member_team: [] };
   } else if (rowData) {
      form.value = { ...rowData, member_team: rowData.member_team?.split(",") };
   }
   isModalOpen.value = true;
};

const formatMembers = (members: any[]) => {
   return members.join(", ");
};

const confirmAction = async () => {
   isLoading.value = true;
   try {
      const payload = {
         ...form.value,
         member_team: formatMembers(form.value.member_team),
      };

      if (modalType.value === "add") {
         await addTeam(payload);
         showSnackbar({ message: "Team berhasil ditambahkan!", color: "success" });
      } else if (modalType.value === "edit" && form.value.id !== null) {
         await updateTeam(form.value.id, payload);
         showSnackbar({ message: "Team berhasil diubah!", color: "success" });
      } else if (modalType.value === "delete" && form.value.id !== null) {
         await deleteTeam(form.value.id);
         showSnackbar({ message: "Team berhasil dihapus!", color: "success" });
      }
      isModalOpen.value = false;
      items.value = await fetchTeams();
   } catch (error) {
      console.error("Action failed:", error);
      showSnackbar({ message: getErrorMessage(error), color: "error" });
   } finally {
      isLoading.value = false;
   }
};
onMounted(async () => {
   items.value = await fetchTeams();
   const responseFetch = {
      games: await fetchGames(),

   }
   fetchData.games = responseFetch.games;
   console.log("Fetched Items:", items.value);
});

watch(items, (newItems) => {
   console.log("Updated items:", newItems);
});
</script>

<template>
   <v-row>
      <v-col cols="12">
         <UiParentCard title="Teams">
            <TablePagination :columns="[
               { title: 'No', field: 'no', sortable: true, width: 80 },
               { title: 'Name', field: 'name', sortable: true },
               { title: 'Game', field: 'game', sortable: true },
               { title: 'Leader', field: 'leader_team', sortable: true },
               {
                  title: 'Member', field: 'member_team', sortable: true,
                  // formatter: (rowData: any) => rowData.member_team ? rowData.member_team?.split(',')?.map((member: any) => `<div class='bg-primary text-white font-weight-bold text-center'>${member}</div>`) : `<p class='font-weight-bold text-center'>-</p>`
               },
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
         <v-autocomplete v-model="form.game" :items="fetchData.games" item-title="name" item-value="name" label="Game"
            clearable></v-autocomplete>
         <v-text-field v-model="form.leader_team" label="Leader"></v-text-field>
         <v-combobox v-model="form.member_team" label="Member" multiple clearable chips hide-no-data />
      </template>
      <template v-else>
         <p>Apakah Anda yakin ingin menghapus data ini?</p>
      </template>
   </BaseModal>
</template>
