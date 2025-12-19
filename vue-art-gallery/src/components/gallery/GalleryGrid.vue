<template>
  <div class="gallery-grid">
    <div v-if="isLoading">
      <LoadingSpinner message="Loading artworks..." />
    </div>
    
    <div v-else-if="error" class="error-state">
      <p>Error: {{ error }}</p>
      <button @click="$emit('retry')">Retry</button>
    </div>
    
    <div v-else-if="artworks.length === 0" class="empty-state">
      <p>No artworks found.</p>
    </div>
    
    <template v-else>
      <ArtCard
        v-for="artwork in artworks"
        :key="artwork.id"
        :artwork="artwork"
        :is-favorite="isFavorite(artwork.id)"
        @select="handleSelect"
        @toggle-favorite="toggleFavorite"
      />
    </template>
  </div>
</template>

<script setup>
import ArtCard from './ArtCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const props = defineProps({
  artworks: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  favorites: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['select', 'toggleFavorite', 'retry'])

const handleSelect = (id) => {
  emit('select', id)
}

const toggleFavorite = (id) => {
  emit('toggleFavorite', id)
}

const isFavorite = (id) => {
  return props.favorites.includes(id)
}
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}

.error-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  background: #ffebee;
  border-radius: 8px;
  color: #c62828;
}

.error-state button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #c62828;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: #666;
}
</style>