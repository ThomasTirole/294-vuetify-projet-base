<template>
  <!-- Conteneur principal — centre le contenu et limite la largeur -->
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Champions League of Legends
      <span class="text-subtitle-1">({{ championStore.totalChampions }})</span>
    </h1>

    <!--
    Barre de recherche, filtre et tri
      * v-row avec 3 colonnes pour les contrôles
    -->
    <v-row class="mb-4">
      <!--
      Champ de recherche par nom
        * v-model lie la valeur au ref searchQuery
        * clearable ajoute un bouton pour vider le champ
      -->
      <v-col cols="12" md="4" sm="6">
        <v-text-field
          v-model="searchQuery"
          clearable
          density="compact"
          hide-details
          label="Rechercher un champion"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        />
      </v-col>

      <!--
      Filtre par rôle
        * v-select affiche un menu déroulant avec les rôles disponibles
        * :items utilise le getter allTags du store (strings simples, pas d'objets)
      -->
      <v-col cols="12" md="4" sm="6">
        <v-select
          v-model="selectedTag"
          clearable
          density="compact"
          hide-details
          :items="championStore.allTags"
          label="Filtrer par rôle"
          prepend-inner-icon="mdi-filter"
          variant="outlined"
        />
      </v-col>

      <!--
      Bouton de tri
        * Alterne entre tri ascendant (A→Z) et descendant (Z→A)
        * L'icône change selon l'ordre actuel
      -->
      <v-col class="d-flex align-center" cols="12" md="4">
        <v-btn
          :prepend-icon="sortOrder === 'asc'
            ? 'mdi-sort-alphabetical-ascending'
            : 'mdi-sort-alphabetical-descending'"
          variant="outlined"
          @click="toggleSort"
        >
          Tri {{ sortOrder === 'asc' ? 'A → Z' : 'Z → A' }}
        </v-btn>
      </v-col>
    </v-row>

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
        <v-skeleton-loader height="350" type="image, article" />
      </v-col>
    </v-row>

    <!-- État 2 : Error — alerte si l'API ne répond pas -->
    <v-alert
      v-else-if="championStore.error"
      class="mb-6"
      type="error"
      variant="tonal"
    >
      Impossible de charger les champions.
    </v-alert>

    <!--
    Message si aucun résultat après filtre/recherche
      * Affiché si la recherche ou le filtre ne donne aucun résultat
    -->
    <v-alert
      v-else-if="sortedChampions.length === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      Aucun champion ne correspond à votre recherche.
    </v-alert>

    <!--
    Grille de cartes champions
      * On itère sur sortedChampions (le dernier computed de la chaîne)
      * PAS sur championStore.champions (données brutes du store)
    -->
    <v-row v-else>
      <v-col
        v-for="champion in sortedChampions"
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

  // Récupération du store champions
  const championStore = useChampionStore()

  /**
   * Variables réactives pour la recherche, le filtre et le tri
   * ref() est auto-importé grâce à unplugin-auto-import
   */
  const searchQuery = ref('')
  const selectedTag = ref(null)
  const sortOrder = ref('asc')

  /**
   * COMPUTED CHAÎNÉS : Chaque étape filtre ou transforme le résultat de la précédente
   * champions → filteredByTag → filteredBySearch → sortedChampions
   */

  /**
   * Étape 1 : Filtrer par rôle (tag)
   * Si un rôle est sélectionné, ne garder que les champions qui possèdent ce tag
   */
  const filteredByTag = computed(() => {
    if (!selectedTag.value) return championStore.champions
    return championStore.champions.filter(c => c.tags.includes(selectedTag.value))
  })

  /**
   * Étape 2 : Filtrer par recherche
   * Utilise filteredByTag comme source (chaînage)
   * La recherche est insensible à la casse (toLowerCase)
   */
  const filteredBySearch = computed(() => {
    if (!searchQuery.value) return filteredByTag.value
    const query = searchQuery.value.toLowerCase()
    return filteredByTag.value.filter(c => c.name.toLowerCase().includes(query))
  })

  /**
   * Étape 3 : Trier par nom
   * [...] crée une copie pour ne pas modifier le tableau filtré
   * localeCompare('fr') gère les accents français
   */
  const sortedChampions = computed(() => {
    return [...filteredBySearch.value].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'fr')
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
  })

  /**
   * Inverse l'ordre de tri entre ascendant et descendant
   * Si on est en ASC et qu'on clique -> on pas en desc, si on est pas en ASC quand on clique (donc
   * on est en DESC, on passe en ASC)
   */
  function toggleSort () {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }
</script>
