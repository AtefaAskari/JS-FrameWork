<template>
  <div v-if="loading" class="loading-container">
    <LoadingSpinner />
  </div>
  
  <div v-else-if="error" class="error-container">
    <h2>Error</h2>
    <p>{{ error }}</p>
    <router-link to="/gallery" class="back-link">Back to Gallery</router-link>
  </div>
  
  <div v-else-if="artwork" class="art-detail">
    <div class="detail-header">
      <h1>{{ artwork.title }}</h1>
      <div class="header-actions">
        <button 
          @click="toggleFavorite"
          class="favorite-btn"
          :class="{ 'active': isFavorite }"
        >
          {{ isFavorite ? '♥ Favorited' : '♡ Add to Favorites' }}
        </button>
        <router-link to="/gallery" class="back-btn">← Back</router-link>
      </div>
    </div>
    
    <div class="detail-content">
      <div class="image-container">
        <img :src="artwork.image" :alt="artwork.title" />
      </div>
      
      <div class="info-container">
        <div class="info-section">
          <h3>Artist</h3>
          <p class="artist-name">{{ artwork.artist }}</p>
        </div>
        
        <div class="info-section">
          <h3>Details</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">Year:</span>
              <span class="value">{{ artwork.year }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Genre:</span>
              <span class="value">{{ artwork.genre }}</span>
            </div>
            <div v-if="artwork.price" class="detail-item">
              <span class="label">Estimated Value:</span>
              <span class="value">${{ formatPrice(artwork.price) }}</span>
            </div>
          </div>
        </div>
        
        <div class="info-section">
          <h3>Description</h3>
          <p class="description">{{ artwork.description }}</p>
        </div>
        
        <div class="action-buttons">
          <button @click="showEditForm = true" class="edit-btn" v-if="isAdmin">
            Edit Artwork
          </button>
          <button @click="shareArtwork" class="share-btn">
            Share
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Form Modal -->
  <div v-if="showEditForm" class="modal-overlay" @click.self="showEditForm = false">
    <div class="modal-content">
      <ArtForm 
        :artwork="artwork"
        @submit="handleUpdate"
        @cancel="showEditForm = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArtStore } from '@/stores/artStore'
import { useUserStore } from '@/stores/userStore'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ArtForm from './ArtForm.vue'

const props = defineProps(['id'])

const route = useRoute()
const artStore = useArtStore()
const userStore = useUserStore()
const loading = ref(false)
const error = ref(null)
const artwork = ref(null)
const showEditForm = ref(false)

const isFavorite = computed(() => {
  return artStore.favorites.includes(artwork.value?.id)
})

const isAdmin = computed(() => userStore.isAdmin)

const fetchArtwork = async (id) => {
  loading.value = true
  error.value = null
  try {
    const data = await artStore.fetchArtwork(id)
    artwork.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const toggleFavorite = () => {
  if (artwork.value) {
    artStore.toggleFavorite(artwork.value.id)
  }
}

const handleUpdate = async (updatedData) => {
  try {
    // In a real app, call API to update
    artwork.value = { ...artwork.value, ...updatedData }
    showEditForm.value = false
  } catch (err) {
    error.value = err.message
  }
}

const shareArtwork = () => {
  if (navigator.share) {
    navigator.share({
      title: artwork.value.title,
      text: `Check out "${artwork.value.title}" by ${artwork.value.artist}`,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}

const formatPrice = (price) => {
  return price.toLocaleString('en-US')
}

onMounted(() => {
  const id = props.id || route.params.id
  if (id) {
    fetchArtwork(parseInt(id))
  }
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchArtwork(parseInt(newId))
    }
  }
)
</script>

<style scoped>
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.error-container {
  text-align: center;
  color: #c62828;
}

.art-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
}

.detail-header h1 {
  margin: 0;
  color: #333;
  font-size: 2.5rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.favorite-btn {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.favorite-btn.active {
  background: #ff6b6b;
  color: white;
  border-color: #ff6b6b;
}

.favorite-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.back-btn {
  padding: 0.5rem 1rem;
  background: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background: #545b62;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.image-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s;
}

.image-container:hover img {
  transform: scale(1.02);
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section h3 {
  margin: 0 0 1rem 0;
  color: #495057;
  font-size: 1.2rem;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 0.5rem;
}

.artist-name {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.detail-grid {
  display: grid;
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f1f1;
}

.label {
  font-weight: 500;
  color: #666;
}

.value {
  font-weight: 600;
  color: #333;
}

.description {
  line-height: 1.6;
  color: #555;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.edit-btn,
.share-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.edit-btn {
  background: #4dabf7;
  color: white;
}

.share-btn {
  background: #51cf66;
  color: white;
}

.edit-btn:hover,
.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
  }
  
  .detail-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>