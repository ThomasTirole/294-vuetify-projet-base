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

  // Import du store Pokémon
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Initialisation du store au montage de l'application
  // onMounted est auto-importé grâce à unplugin-auto-import
  onMounted(async () => {
    const pokemonStore = usePokemonStore()
    // init() charge les Pokémon et les types en parallèle
    await pokemonStore.init()
  })
</script>
