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
      v-if="!pokemon"
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
        :alt="pokemon.name"
        cover
        height="300"
        :src="getImageUrl(pokemon.image)"
      />

      <v-card-title class="text-h4">
        {{ pokemon.name }}
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script setup>
  // Import du store Pokémon
  import { usePokemonStore } from '@/stores/pokemonStore'
  import { getImageUrl } from '@/utils/imageUrl'

  // Récupérer l'ID depuis les paramètres de la route
  const route = useRoute()

  // Instancier le store
  const pokemonStore = usePokemonStore()

  // Utiliser le getter du store pour trouver le Pokémon
  // computed se met à jour automatiquement si l'ID change
  const pokemon = computed(() => {
    return pokemonStore.getPokemonById(route.params.id)
  })
</script>
