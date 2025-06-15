<script setup>
import { onMounted, ref } from 'vue';
import FooterSection from '~/components/layout/landing/container/FooterSection.vue';
import HeroSection from '~/components/layout/landing/container/HeroSection.vue';
import NavbarSection from '~/components/layout/landing/container/NavbarSection.vue';
import { useGameService } from '~/services/gameService';
import { useTournamentRegistrationService } from '~/services/tournamentRegistrationService';

definePageMeta({
   layout: "blank",
   middleware: 'auth',
});


const items = ref({
   game: [],
   tournament: []
});
const { fetchGames } = useGameService();
const { fetchTournaments } = useTournamentRegistrationService();

onMounted(async () => {
   items.value.game = await fetchGames();
   items.value.tournament = await fetchTournaments();
})
</script>

<template>
   <div>
      <!-- Navbar -->
      <NavbarSection />

      <!-- Hero Section dengan Slider -->
      <section id="home">
         <HeroSection :title="'Welcome'" />
      </section>

      <!-- Tournament Section -->
      <section id="tournament" class="bg-white py-10">
         <div class="container mx-auto lg:px-[15%] px-4">
            <h2 class="text-2xl font-bold mb-6 text-red-600 text-center">Informasi Registrasi Tournament</h2>
            <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
               <a v-for="(item, index) in items.tournament" :key="index" class="bg-red-100 p-4 rounded-lg"
                  :href="`/peserta/tournament/${item.id}`">
                  <h3 class="text-lg font-bold text-red-600">{{ item.name }}</h3>
                  <p class="text-gray-500">{{ item.game }}</p>
                  <p class="text-gray-700">{{ item.price ? `Rp ${item.price}` : 'Gratis' }}</p>
               </a>
            </div>
         </div>
      </section>

      <!-- Footer -->
      <FooterSection />
   </div>
</template>

<style scoped>
html {
   scroll-behavior: smooth;
}

.animate-slide {
   transition: background-image 1s ease-in-out;
}
</style>
