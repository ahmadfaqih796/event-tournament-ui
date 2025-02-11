<template>
  <div>
    <h1>Admin Dashboard</h1> {{ $route.fullPath }}
    <p>Selamat datang di panel admin!</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});
</script>