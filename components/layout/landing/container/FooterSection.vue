<script setup lang="ts">

const images = [
   "https://img.freepik.com/free-photo/esports-championship-background-3d-illustration_1419-2785.jpg",
   "https://wallpapercave.com/wp/wp5195928.jpg",
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTebcyrBnbm-6Qz9jy2no4LY0EFB0HNjyXG5g&s"
]

defineProps({
   title: {
      type: String,
      default: 'Welcome'
   }
})

</script>

<template>
   <footer class="bg-red-600 py-10">
      <div class="container mx-auto lg:px-[15%] px-4 text-center">
         <p class="text-white">© 2025 Esport Merdeka. All rights reserved.</p>
      </div>
   </footer>
</template>


<style scoped>
html {
   scroll-behavior: smooth;
}

.animate-slide {
   transition: background-image 1s ease-in-out;
}

@keyframes fade-in {
   from {
      opacity: 0;
      transform: translateY(20px);
   }

   to {
      opacity: 1;
      transform: translateY(0);
   }
}

.animate-fade-in {
   animation: fade-in 1s ease-out;
}
</style>
