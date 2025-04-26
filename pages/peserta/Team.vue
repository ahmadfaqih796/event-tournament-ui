<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { onMounted, ref } from 'vue';
import BaseModal from '~/components/common/BaseModal.vue';
import TablePagination from '~/components/style-components/table/TablePagination.vue';
import { useGameService } from '~/services/gameService';
import { useTeamService } from '~/services/teamService';
import { useTransactionService } from '~/services/transactionService';

definePageMeta({
   layout: "blank",
   middleware: 'auth',
});

const images = [
   "https://img.freepik.com/free-photo/esports-championship-background-3d-illustration_1419-2785.jpg",
   "https://wallpapercave.com/wp/wp5195928.jpg",
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTebcyrBnbm-6Qz9jy2no4LY0EFB0HNjyXG5g&s"
]

const currentImage = ref(0)
const mobileMenu = ref(false)
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
const modalType = ref < "add" | "edit" | "delete" | null > (null);

const { user } = useAuth();
const userData = computed(() => JSON.parse(user.value) || "");

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

   setInterval(() => {
      currentImage.value = (currentImage.value + 1) % images.length
   }, 5000)
})
</script>

<template>
   <div>
      <header class="fixed top-0 left-0 w-full bg-red-600 z-50">
         <div class="container mx-auto flex justify-between items-center py-4 px-4 lg:px-[15%]">
            <div class="flex items-center">
               <img
                  src="https://e7.pngegg.com/pngimages/976/842/png-clipart-esport-logo-logo-esport-logo-leave-the-material-thumbnail.png"
                  alt="Logo" class="h-8 mr-4" />
               <nav :class="['md:flex', mobileMenu ? 'flex' : 'hidden', 'flex-col md:flex-row md:space-x-6']">
                  <a href="/peserta" class="text-white hover:text-gray-200 py-2 md:py-0">Home</a>
                  <a href="/peserta/Transaksi" class="text-white hover:text-gray-200 py-2 md:py-0">Transaksi</a>
                  <a href="/peserta/Team" class="text-white hover:text-gray-200 py-2 md:py-0">Team</a>
               </nav>
            </div>
            <div class="flex items-center space-x-4">
               <span class="text-white">Hi, {{ userData.name }}</span>
               <button @click="mobileMenu = !mobileMenu" class="md:hidden text-white focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                     <path :class="{ 'hidden': mobileMenu, 'block': !mobileMenu }" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                     <path :class="{ 'block': mobileMenu, 'hidden': !mobileMenu }" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </button>
            </div>
         </div>
      </header>

      <!-- Hero Section dengan Slider -->
      <section id="home" class="relative h-screen overflow-hidden">
         <div class="absolute inset-0 w-full h-full animate-slide bg-cover bg-center"
            :style="{ backgroundImage: `url(${images[currentImage]})` }">
         </div>
         <div class="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">Team</h1>
         </div>
         <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </section>

      <!-- Game Section -->
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
                  actions: (rowData : any) => [
                     { label: 'Edit', color: 'primary', icon: 'mdi-pencil', onClick: () => openModal('edit', rowData) },
                     { label: 'Delete', color: 'error', icon: 'mdi-delete', onClick: () => openModal('delete', rowData) }
                  ]
               }
            ]" :items="items.team"
               :extraButtons="[
                  { label: 'Add', color: 'primary', icon: 'mdi-plus', onClick: () => openModal('add') }]" />
         </div>
      </section>

      <!-- Footer -->
      <footer class="bg-red-600 py-10">
         <div class="container mx-auto lg:px-[15%] px-4 text-center">
            <div class="flex justify-center space-x-4 mb-4">
               <a href="#home" class="text-white hover:text-gray-200">Home</a>
               <a href="#game" class="text-white hover:text-gray-200">Game</a>
               <a href="#tournament" class="text-white hover:text-gray-200">Tournament</a>
            </div>
            <p class="text-white">© 2025 Esport Merdeka. All rights reserved.</p>
         </div>
      </footer>
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
