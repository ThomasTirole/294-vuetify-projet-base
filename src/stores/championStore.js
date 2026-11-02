import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useChampionStore = defineStore('champion', {
  state: () => ({
    isLoading: false,
    champions: [],
    favorites: [],
  }),

  getters: {
    totalChampions: state => state.champions.length,

    getChampionById: state => championId => {
      return state.champions.find(champion => champion.id === Number(championId))
    },

    allTags: state => {
      // flatMap fusionne tous les tableaux tags en un seul tableau plat
      // ex: [["Fighter"], ["Mage", "Assassin"]] → ["Fighter", "Mage", "Assassin"]
      const tags = state.champions.flatMap(c => c.tags)

      // Set supprime les doublons, le spread [...] recrée un tableau
      // sort() trie alphabétiquement en tenant compte des accents (français)
      return [...new Set(tags)].sort((a, b) => a.localeCompare(b, 'fr'))
    },

    totalFavorites: state => {
      return state.favorites.length
    },

    isFavorite: state => {
      return champion => {
        return state.favorites.includes(champion.id)
      }
    },

    getFavorites: state => {
      const favoriteChampions = state.favorites.map(favoriteId => {
        return state.champions.find(champion => champion.id === favoriteId)
      })
      return favoriteChampions.filter(champion => champion !== undefined)
    },

  },

  actions: {
    async init () {
      console.log('Initialisation du store Champions...')
      this.isLoading = true

      try {
        await this.fetchChampions({ withLoader: false })
        this.loadFavorites()
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
        this.cleanupFavorites()
      } catch (error) {
        console.error('Erreur lors du chargement des champions:', error.message)
        this.champions = []
      } finally {
        if (withLoader) {
          this.isLoading = false
        }
      }
    },

    loadFavorites () {
      try {
        const savedFavorites = localStorage.getItem('champion_favorites')
        if (savedFavorites) {
          this.favorites = JSON.parse(savedFavorites)
          console.log('Favoris chargés :', this.favorites.length, 'éléments')
        } else {
          this.favorites = []
          console.log('Aucun favori trouvé dans le localStorage.')
        }
      } catch (error) {
        console.error('Erreur lors du chargement des favoris depuis le localStorage:', error)
        this.favorites = []
      }
    },

    saveFavorites () {
      try {
        localStorage.setItem('champion_favorites', JSON.stringify(this.favorites))
        console.log('Favoris sauvegardés :', this.favorites.length, 'éléments')
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des favoris dans le localStorage:', error)
      }
    },

    toggleFavorite (champion) {
      const favoriteIndex = this.favorites.indexOf(
        champion.id,
      )

      if (favoriteIndex === -1) {
        this.favorites.push(champion.id)
        console.log(`Champion ${champion.name} ajouté aux favoris.`)
      } else {
        this.favorites.splice(favoriteIndex, 1)
        console.log(`Champion ${champion.name} retiré des favoris.`)
      }

      this.saveFavorites()
    },

    cleanupFavorites () {
      const initialCount = this.favorites.length

      this.favorites = this.favorites.filter(favoriteId => {
        return this.champions.some(champion => champion.id === favoriteId)
      })

      const removedCount = initialCount - this.favorites.length
      if (removedCount > 0) {
        console.log('Nettoyage des favoris :', removedCount, 'favoris supprimés car les champions correspondants n\'existent plus.')
        this.saveFavorites()
      }
    },
  },
})
