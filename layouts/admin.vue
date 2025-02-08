<template>
  <div class="admin-layout">
    <aside>
      <nav>
        <NuxtLink to="/admin">Dashboard</NuxtLink>
        <NuxtLink to="/admin/settings">Settings</NuxtLink>
      </nav>
    </aside>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.admin-layout {
  display: flex;
}

aside {
  width: 200px;
  background-color: #f5f5f5;
}

main {
  flex: 1;
  padding: 20px;
}
</style>