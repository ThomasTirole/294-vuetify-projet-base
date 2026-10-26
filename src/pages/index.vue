<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Pokédex
      <span class="text-subtitle-1">({{ pokemonStore.totalPokemons }})</span>
    </h1>

    <!-- État 1 : Loading — squelettes de chargement -->
    <v-row v-if="pokemonStore.isLoading">
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
      v-else-if="pokemonStore.pokemons.length === 0"
      class="mb-6"
      type="error"
      variant="tonal"
    >
      Impossible de charger les Pokémon. Vérifiez que l'API tourne sur
      {{ apiUrl }}.
    </v-alert>

    <!-- État 3 : Data — grille de cartes Pokémon -->
    <v-row v-else>
      <v-col
        v-for="pokemon in pokemonStore.pokemons"
        :key="pokemon.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <pokemon-card :pokemon="pokemon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import PokemonCard from '@/components/PokemonCard.vue'
  import { usePokemonStore } from '@/stores/pokemonStore'

  const pokemonStore = usePokemonStore()

  // URL de l'API pour le message d'erreur
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3535'
</script>
