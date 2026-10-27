<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Champions League of Legends
      <span class="text-subtitle-1">({{ championStore.totalChampions }})</span>
    </h1>

    <!-- État 1 : Loading — squelettes de chargement -->
    <v-row v-if="championStore.isLoading">
      <v-col
        v-for="n in 8"
        :key="n"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-skeleton-loader
          height="350"
          type="image, article"
        />
      </v-col>
    </v-row>

    <!-- État 2 : Error — alerte si aucun Pokémon chargé -->
    <v-alert
      v-else-if="championStore.champions.length === 0"
      class="mb-6"
      type="error"
      variant="tonal"
    >
      Impossible de charger les champions. Vérifiez que l'API tourne sur
      {{ apiUrl }}.
    </v-alert>

    <!-- État 3 : Data — grille de cartes Pokémon -->
    <v-row v-else>
      <v-col
        v-for="champion in championStore.champions"
        :key="champion.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <champion-card :champion="champion" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import ChampionCard from '@/components/ChampionCard.vue'
  import { useChampionStore } from '@/stores/championStore.js'

  const championStore = useChampionStore()

  // URL de l'API pour le message d'erreur
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3535'
</script>
