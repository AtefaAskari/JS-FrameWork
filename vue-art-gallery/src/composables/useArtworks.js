import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { useArtStore } from '@/stores/artStore'

export function useArtworks() {
  const artStore = useArtStore()
  const isLoading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')

  const fetchArtworks = async () => {
    isLoading.value = true
    error.value = null
    try {
      await artStore.fetchArtworks()
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const filteredArtworks = ref([])

  watchEffect(() => {
    if (!searchQuery.value.trim()) {
      filteredArtworks.value = artStore.artworks
    } else {
      const query = searchQuery.value.toLowerCase()
      filteredArtworks.value = artStore.artworks.filter(art =>
        art.title.toLowerCase().includes(query) ||
        art.artist.toLowerCase().includes(query) ||
        art.genre.toLowerCase().includes(query)
      )
    }
  })

  onMounted(() => {
    console.log('Artworks composable mounted')
    fetchArtworks()
    artStore.loadFavorites()
  })

  onUnmounted(() => {
    console.log('Artworks composable unmounted')
  })

  return {
    artworks: filteredArtworks,
    isLoading,
    error,
    searchQuery,
    refresh: fetchArtworks,
    favorites: artStore.favorites,
    toggleFavorite: artStore.toggleFavorite
  }
}