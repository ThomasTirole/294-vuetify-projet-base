<template>
  <v-card hover :to="`/champion/${champion.id}`">
    <v-img
      :alt="champion.name"
      cover
      height="200"
      :src="getImageUrl(champion.image)"
    />
    <v-card-title>{{ champion.name }}</v-card-title>
    <v-card-subtitle>
      <v-chip
        v-for="(role, index) in champion.tags"
        :key="index"
        class="ma-1"
        color="primary"
        small
        text-color="white"
      >
        {{ role }}
      </v-chip>
    </v-card-subtitle>
  </v-card>
</template>

<script setup>
  import { getImageUrl } from '@/utils/imageUrl'

  defineProps({
    champion: {
      type: Object,
      required: true,
    },
  })
</script>
