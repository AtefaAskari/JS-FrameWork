import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import artApi from '@/api/artApi'

export const useArtStore = defineStore('art', () => {
  // State
  const artworks = ref([])
  const favorites = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Getters (computed)
  const featuredArtworks = computed(() => {
    return artworks.value.filter(art => art.featured)
  })

  const totalArtworks = computed(() => artworks.value.length)

  const artworksByGenre = computed(() => {
    return (genre) => artworks.value.filter(art => art.genre === genre)
  })

  const favoriteArtworks = computed(() => {
    return artworks.value.filter(art => favorites.value.includes(art.id))
  })

  // Actions
  async function fetchArtworks() {
    isLoading.value = true
    error.value = null
    try {
      const data = await artApi.getArtworks()
      artworks.value = data
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch artworks:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchArtwork(id) {
    isLoading.value = true
    try {
      const data = await artApi.getArtwork(id)
      const index = artworks.value.findIndex(a => a.id === id)
      if (index > -1) {
        artworks.value[index] = data
      } else {
        artworks.value.push(data)
      }
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function addArtwork(artwork) {
    isLoading.value = true
    try {
      const newArtwork = await artApi.createArtwork(artwork)
      artworks.value.push(newArtwork)
      return newArtwork
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function toggleFavorite(artworkId) {
    const index = favorites.value.indexOf(artworkId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(artworkId)
    }
    // Save to localStorage
    localStorage.setItem('artFavorites', JSON.stringify(favorites.value))
  }

  function loadFavorites() {
    const saved = localStorage.getItem('artFavorites')
    if (saved) {
      favorites.value = JSON.parse(saved)
    }
  }

  return {
    // State
    artworks,
    favorites,
    isLoading,
    error,
    
    // Getters
    featuredArtworks,
    totalArtworks,
    artworksByGenre,
    favoriteArtworks,
    
    // Actions
    fetchArtworks,
    fetchArtwork,
    addArtwork,
    toggleFavorite,
    loadFavorites
  }
})