<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script setup>
  import AppFooter from '@/components/AppFooter.vue'
  // Imports des composants de layout
  import AppHeader from '@/components/AppHeader.vue'

  // Import du store Champions
  import { useChampionStore } from '@/stores/championStore.js'

  // Initialisation du store au montage de l'application
  // onMounted est auto-importé grâce à unplugin-auto-import
  onMounted(async () => {
    const championStore = useChampionStore()
    // init() charge les Champions
    await championStore.init()
  })
</script>
