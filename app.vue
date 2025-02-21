<script setup lang="ts">
import { provideSnackbar } from "@/composables/useSnackbar";

const { snackbar, hideSnackbar } = provideSnackbar();
</script>

<template>
  <NuxtExampleLayout>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn text @click="hideSnackbar">Tutup</v-btn>
      </template>
    </v-snackbar>
  </NuxtExampleLayout>
</template>