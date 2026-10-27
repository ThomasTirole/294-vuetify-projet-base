<template>
  <v-container>
    <v-btn
      class="mb-4"
      prepend-icon="mdi-arrow-left"
      variant="text"
      @click="$router.back()"
    >
      Retour
    </v-btn>

    <v-alert
      v-if="!champion"
      type="error"
      variant="tonal"
    >
      Pokémon non trouvé.
    </v-alert>

    <v-card
      v-else
      class="mx-auto"
      max-width="800"
    >
      <v-img
        :alt="champion.name"
        cover
        height="300"
        :src="getImageUrl(champion.image)"
      />

      <v-card-title class="text-h4">
        {{ champion.name }}
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script setup>
  // Import du store Pokémon
  import { useChampionStore } from '@/stores/championStore.js'
  import { getImageUrl } from '@/utils/imageUrl'

  // Récupérer l'ID depuis les paramètres de la route
  const route = useRoute()

  // Instancier le store
  const championStore = useChampionStore()

  // Utiliser le getter du store pour trouver le Pokémon
  // computed se met à jour automatiquement si l'ID change
  const champion = computed(() => {
    return championStore.getChampionById(route.params.id)
  })
</script>
