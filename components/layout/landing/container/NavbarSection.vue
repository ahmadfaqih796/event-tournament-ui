<script setup lang="ts">
import MenuNavbar from './MenuNavbar.vue';
import ProfileLandingDD from './ProfileLandingDD.vue';

const { user } = useAuth();
const userData = computed(() => JSON.parse(user.value) || "");
const mobileMenu = ref(false)

</script>

<template>
   <header class="fixed top-0 left-0 w-full bg-red-600 z-50">
      <div
         :class="['block md:hidden absolute top-16 p-3 left-0 w-full bg-red-600 z-50', mobileMenu ? 'block' : 'hidden']">
         <MenuNavbar :role="userData.role" />
      </div>
      <div class="container mx-auto flex justify-between items-center py-4 px-4 lg:px-[15%]">
         <div class="flex items-center">
            <img
               src="https://e7.pngegg.com/pngimages/976/842/png-clipart-esport-logo-logo-esport-logo-leave-the-material-thumbnail.png"
               alt="Logo" class="h-8 mr-4" />
            <nav :class="['hidden md:flex', 'flex-col md:flex-row md:space-x-6']">
               <MenuNavbar :role="userData.role" />
            </nav>
         </div>
         <div class="flex items-center space-x-4">
            <span class="text-white">Hi, {{ userData.name }}</span>
            <ProfileLandingDD />
            <button @click=" mobileMenu = !mobileMenu" class="md:hidden text-white focus:outline-none">
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

</template>
