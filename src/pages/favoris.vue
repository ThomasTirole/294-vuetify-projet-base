<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Mes favoris ({{ championStore.totalFavorites }})
    </h1>

    <v-alert
      v-if="championStore.totalFavorites === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      Vous n'avez pas encore de champions favoris. Ajoutez-en en cliquant sur le cœur dans la carte d'un champion.
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="champion in championStore.getFavorites"
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
  import { useChampionStore } from '@/stores/championStore'

  const championStore = useChampionStore()
</script>
