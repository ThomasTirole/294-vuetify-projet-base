<template>
  <v-card hover :to="`/pokemon/${pokemon.id}`">
    <v-img
      :alt="pokemon.name"
      cover
      height="200"
      :src="getImageUrl(pokemon.image)"
    />
    <v-card-title>{{ pokemon.name }}</v-card-title>
    <v-card-subtitle>Niveau {{ pokemon.level }}</v-card-subtitle>
  </v-card>
</template>

<script setup>
  import { getImageUrl } from '@/utils/imageUrl'

  defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })
</script>
