<template>
   <div>
      <h1>Admin Settings</h1>
      <p>Selamat datang di panel admin!</p>
   </div>
</template>

<script setup>
definePageMeta({
   layout: 'admin',
   middleware: 'auth',
});
</script>