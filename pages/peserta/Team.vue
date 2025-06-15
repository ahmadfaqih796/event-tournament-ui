<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseModal from '~/components/common/BaseModal.vue';
import FooterSection from '~/components/layout/landing/container/FooterSection.vue';
import HeroSection from '~/components/layout/landing/container/HeroSection.vue';
import NavbarSection from '~/components/layout/landing/container/NavbarSection.vue';
import TablePagination from '~/components/style-components/table/TablePagination.vue';
import { useGameService } from '~/services/gameService';
import { useTeamService } from '~/services/teamService';
import { useTransactionService } from '~/services/transactionService';

definePageMeta({
   layout: "blank",
   middleware: 'auth',
});

const items = ref({
   transaction: [],
   team: [],
   game: []
});

const { fetchTransactions } = useTransactionService();
const { fetchTeams, addTeam, updateTeam, deleteTeam } = useTeamService();
const { fetchGames } = useGameService();
const { showSnackbar } = useSnackbar();


const isModalOpen = ref(false);
const isLoading = ref(false);
const form = ref({ id: null, name: "", game: "", leader_team: "", member_team: [], });
const modalType = ref<"add" | "edit" | "delete" | null>(null);

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
      items.value.team = await fetchTeams();
   } catch (error) {
      console.error("Action failed:", error);
      showSnackbar({ message: getErrorMessage(error), color: "error" });
   } finally {
      isLoading.value = false;
   }
};

onMounted(async () => {
   items.value.transaction = await fetchTransactions();
   items.value.team = await fetchTeams();
   items.value.game = await fetchGames();
})
</script>

<template>
   <div>
      <!-- Navbar -->
      <NavbarSection />

      <!-- Hero Section dengan Slider -->
      <section id="home">
         <HeroSection :title="'Team'" />
      </section>

      <!-- Team Section -->
      <section id="game" class="bg-red-50 py-10">
         <div class="container mx-auto lg:px-[15%] px-4">
            <h2 class="text-2xl font-bold mb-4 text-red-600 text-center">Data Team</h2>

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
            ]" :items="items.team" :extraButtons="[
               { label: 'Add', color: 'primary', icon: 'mdi-plus', onClick: () => openModal('add') }]" />
         </div>
      </section>

      <!-- Footer -->
      <FooterSection />
   </div>

   <BaseModal v-model="isModalOpen" :loading="isLoading"
      :title="modalType === 'add' ? 'Tambah Data' : modalType === 'edit' ? 'Edit Data' : 'Hapus Data'"
      @confirm="confirmAction">
      <template v-if="modalType !== 'delete'">
         <v-text-field v-model="form.name" label="Name"></v-text-field>
         <v-autocomplete v-model="form.game" :items="items.game" item-title="name" item-value="name" label="Game"
            clearable></v-autocomplete>
         <v-text-field v-model="form.leader_team" label="Leader"></v-text-field>
         <v-combobox v-model="form.member_team" label="Member" multiple clearable chips hide-no-data />
      </template>
      <template v-else>
         <p>Apakah Anda yakin ingin menghapus data ini?</p>
      </template>
   </BaseModal>

</template>

<style scoped>
html {
   scroll-behavior: smooth;
}

.animate-slide {
   transition: background-image 1s ease-in-out;
}
</style>
