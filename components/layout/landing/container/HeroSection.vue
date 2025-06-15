<script setup lang="ts">

const images = [
   "https://img.freepik.com/free-photo/esports-championship-background-3d-illustration_1419-2785.jpg",
   "https://wallpapercave.com/wp/wp5195928.jpg",
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTebcyrBnbm-6Qz9jy2no4LY0EFB0HNjyXG5g&s"
]

const props = defineProps({
   title: {
      type: String,
      default: 'Welcome'
   }
})

const currentImage = ref(0)

onMounted(async () => {
   setInterval(() => {
      currentImage.value = (currentImage.value + 1) % images.length
   }, 5000)
})

</script>

<template>
   <div class="relative h-screen overflow-hidden">
      <div class="absolute inset-0 w-full h-full animate-slide bg-cover bg-center"
         :style="{ backgroundImage: `url(${images[currentImage]})` }">
      </div>
      <div class="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-4">
         <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ title }}</h1>
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
   </div>
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
