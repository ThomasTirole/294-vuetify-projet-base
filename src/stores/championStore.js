import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useChampionStore = defineStore('champion', {
  state: () => ({
    isLoading: false,
    champions: [],
  }),

  getters: {
    totalChampions: state => state.champions.length,

    getChampionById: state => championId => {
      return state.champions.find(champion => champion.id === Number(championId))
    },

    allTags: (state) => {
      // flatMap fusionne tous les tableaux tags en un seul tableau plat
      // ex: [["Fighter"], ["Mage", "Assassin"]] → ["Fighter", "Mage", "Assassin"]
      const tags = state.champions.flatMap(c => c.tags)

      // Set supprime les doublons, le spread [...] recrée un tableau
      // sort() trie alphabétiquement en tenant compte des accents (français)
      return [...new Set(tags)].sort((a, b) => a.localeCompare(b, 'fr'))
    },
  },

  actions: {
    async init () {
      console.log('Initialisation du store Champions...')
      this.isLoading = true

      try {
        await Promise.all([
          this.fetchChampions({ withLoader: false }),
        ])
        console.log('Store Champions initialisé')
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchChampions ({ withLoader = true } = {}) {
      if (withLoader) {
        this.isLoading = true
      }

      try {
        const response = await api.get('/api/lol/champions')

        this.champions = response.data.data
      } catch (error) {
        console.error('Erreur lors du chargement des champions:', error.message)
        this.champions = []
      } finally {
        if (withLoader) {
          this.isLoading = false
        }
      }
    },
  },
})
