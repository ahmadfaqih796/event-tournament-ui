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
         <HeroSection :title="'Welcome Komunitas'" />
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
