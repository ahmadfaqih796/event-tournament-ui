<script setup lang="ts">

const title = ref("Esport Padang - Nuxt3 Typescript based Free Admin Dashboard Template");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Esport Merdeka`
      : "Esport Merdeka";
  },
});
</script>

<template>
    <v-locale-provider >
        <v-app>
            <LayoutFullMain/>
            <v-main>
                <v-container fluid class="page-wrapper">
                    <div class="maxWidth">
                        <NuxtPage  />
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
