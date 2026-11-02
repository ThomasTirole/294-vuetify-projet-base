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
    <v-card-actions>
      <v-spacer />
      <v-btn
        :class="{ 'favorite-active': championStore.isFavorite(champion) }"
        :color="championStore.isFavorite(champion) ? 'red' : ''"
        :icon="championStore.isFavorite(champion) ? 'mdi-heart' : 'mdi-heart-outline'"
        variant="text"
        @click.stop.prevent="handleToggleFavorite()"
      />
    </v-card-actions>
    <v-snackbar
      v-model="showSnackbar"
      color="primary"
      :timeout="2000"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-card>
</template>

<script setup>
  import { useChampionStore } from '@/stores/championStore'
  import { getImageUrl } from '@/utils/imageUrl'

  const championStore = useChampionStore()

  const showSnackbar = ref(false)
  const snackbarMessage = ref('')

  const { champion } = defineProps({
    champion: {
      type: Object,
      required: true,
    },
  })

  function handleToggleFavorite () {
    const wasFavorite = championStore.isFavorite(champion)
    championStore.toggleFavorite(champion)
    snackbarMessage.value = wasFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris !'
    showSnackbar.value = true
  }
</script>
<style scoped>
.favorite-active {
  animation: heartbeat 0.6s ease-in-out;
}
</style>
