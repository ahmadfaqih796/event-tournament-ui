<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useTeamService } from '~/services/teamService';
import { useTournamentRegistrationService } from '~/services/tournamentRegistrationService';
import { useTournamentService } from '~/services/tournamentService';

definePageMeta({
   layout: "blank",
   middleware: 'auth',
});

const isLoading = ref(false);

const { showSnackbar } = useSnackbar();

const images = [
   "https://img.freepik.com/free-photo/esports-championship-background-3d-illustration_1419-2785.jpg",
   "https://wallpapercave.com/wp/wp5195928.jpg",
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTebcyrBnbm-6Qz9jy2no4LY0EFB0HNjyXG5g&s"
]

const currentImage = ref(0)

const mobileMenu = ref(false)
const items = ref({
   tournament_detail: {
      name: '',
      game: '',
      barcode: '',
      is_paid: '',
      price: '',
      close_registration: '',
      created_at: '',
      updated_at: '',
      event: {
         name: ''
      }
   },
   teams: []
});

const route = useRoute()
const tournamentId = route.params.id as string

const { fetchTournamentById } = useTournamentService();
const { addTransaction } = useTournamentRegistrationService();
const { fetchTeams } = useTeamService();


const { user } = useAuth();
const userData = computed(() => JSON.parse(user.value) || "");
const form = ref({ team_id: "", payment_proof: "" });

onMounted(async () => {
   items.value.tournament_detail = await fetchTournamentById(tournamentId);
   items.value.teams = await fetchTeams();

   setInterval(() => {
      currentImage.value = (currentImage.value + 1) % images.length
   }, 5000)
});

const confirmAction = async () => {
   isLoading.value = true;
   const payload = {
      ...form.value,
      tournament_id: tournamentId,
      payment_status: "pending"
   }
   console.log("masuk", payload)
   try {
      const formData = new FormData();
      formData.append("tournament_id", payload.tournament_id);
      formData.append("team_id", payload.team_id);
      formData.append("payment_status", payload.payment_status);
      formData.append("payment_proof", payload.payment_proof[0]);
      await addTransaction(formData);
      showSnackbar({ message: "Tournament berhasil ditambahkan!", color: "success" });
   } catch (error) {
      showSnackbar({ message: getErrorMessage(error), color: "error" });
   } finally {
      isLoading.value = false;
   }

}
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
            <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ items.tournament_detail.name }}</h1>
         </div>
         <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </section>

      <section id="game" class="bg-red-50 py-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div class="col-span-1 lg:col-span-2 bg-slate-50 rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4 text-red-600 text-center">{{ items.tournament_detail.name }}</h2>
            <article class="flex flex-col items-center mb-4">
               <a :href="`http://127.0.0.1:8000/storage/${items.tournament_detail.barcode}`" target="_blank"
                  rel="noopener noreferrer">
                  <img :if="items.tournament_detail.barcode"
                     :src="`http://127.0.0.1:8000/storage/${items.tournament_detail.barcode}`" alt="barcode"
                     class="w-[200px]">
               </a>
               <table class="mt-4">
                  <tr>
                     <td class="font-bold">Event</td>
                     <td class="px-2">:</td>
                     <td>{{ items.tournament_detail.event.name }}</td>
                  </tr>
                  <tr>
                     <td class="font-bold">Tournament</td>
                     <td class="px-2">:</td>
                     <td>{{ items.tournament_detail.name }}</td>
                  </tr>
                  <tr>
                     <td class="font-bold">Harga</td>
                     <td class="px-2">:</td>
                     <td>{{ items.tournament_detail.is_paid ? 'Rp ' + items.tournament_detail.price : 'Gratis' }}</td>
                  </tr>
                  <tr>
                     <td class="font-bold">Game</td>
                     <td class="px-2">:</td>
                     <td>{{ items.tournament_detail.game }}</td>
                  </tr>
                  <tr>
                     <td class="font-bold">Tutup Pendaftaran</td>
                     <td class="px-2">:</td>
                     <td>{{ items.tournament_detail.close_registration }}</td>
                  </tr>
               </table>
            </article>
         </div>

         <div class="col-span-1 ">
            <div class="bg-slate-50 rounded-lg p-6 ">
               <!-- {{ items.tournament_detail }} -->
               <h2 class="text-2xl font-bold mb-4 text-red-600 text-center">Daftar</h2>
               <v-autocomplete v-model="form.team_id" :items="items.teams" item-title="name" item-value="id"
                  label="Team" clearable></v-autocomplete>
               <v-file-input v-model="form.payment_proof" label="File input"></v-file-input>
               <button @click="confirmAction"
                  class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Daftar
               </button>
            </div>
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
</template>
