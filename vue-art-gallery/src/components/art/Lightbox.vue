<template>
  <transition name="lightbox">
    <div v-if="isVisible" class="lightbox-overlay" @click.self="close">
      <div class="lightbox-container">
        <button class="close-btn" @click="close" aria-label="Close">
          &times;
        </button>
        
        <div class="lightbox-content">
          <div class="lightbox-image">
            <img :src="artwork.image" :alt="artwork.title" />
          </div>
          
          <div class="lightbox-info">
            <h2>{{ artwork.title }}</h2>
            <h3>{{ artwork.artist }} ({{ artwork.year }})</h3>
            <p class="genre">{{ artwork.genre }}</p>
            <p class="description">{{ artwork.description }}</p>
            
            <div class="lightbox-actions">
              <button 
                @click="toggleFavorite"
                class="favorite-action"
                :class="{ 'active': isFavorite }"
              >
                {{ isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites' }}
              </button>
              <router-link 
                :to="`/art/${artwork.id}`"
                class="detail-action"
                @click.native="close"
              >
                View Details
              </router-link>
            </div>
          </div>
        </div>
        
        <div class="lightbox-navigation">
          <button @click="previous" class="nav-btn prev-btn" :disabled="!hasPrevious">
            ← Previous
          </button>
          <button @click="next" class="nav-btn next-btn" :disabled="!hasNext">
            Next →
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  artwork: {
    type: Object,
    required: true
  },
  artworkList: {
    type: Array,
    default: () => []
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  favorites: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'next', 'previous', 'toggleFavorite'])

const close = () => {
  emit('close')
}

const next = () => {
  emit('next')
}

const previous = () => {
  emit('previous')
}

const toggleFavorite = () => {
  emit('toggleFavorite', props.artwork.id)
}

const isFavorite = computed(() => {
  return props.favorites.includes(props.artwork.id)
})

const hasNext = computed(() => {
  return props.currentIndex < props.artworkList.length - 1
})

const hasPrevious = computed(() => {
  return props.currentIndex > 0
})

const handleKeydown = (event) => {
  if (!props.isVisible) return
  
  switch (event.key) {
    case 'Escape':
      close()
      break
    case 'ArrowRight':
      if (hasNext.value) next()
      break
    case 'ArrowLeft':
      if (hasPrevious.value) previous()
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.lightbox-container {
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.lightbox-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;
}

.lightbox-image {
  overflow: hidden;
}

.lightbox-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.lightbox-info {
  padding: 2rem;
  overflow-y: auto;
  max-height: 500px;
}

.lightbox-info h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 2rem;
}

.lightbox-info h3 {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 1.2rem;
  font-weight: normal;
}

.genre {
  display: inline-block;
  background: #f1f1f1;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.description {
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
}

.lightbox-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.favorite-action,
.detail-action {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.favorite-action {
  background: #f8f9fa;
  color: #333;
  border: 2px solid #dee2e6;
}

.favorite-action.active {
  background: #ff6b6b;
  color: white;
  border-color: #ff6b6b;
}

.favorite-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.detail-action {
  background: #667eea;
  color: white;
  display: inline-block;
}

.detail-action:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

.lightbox-navigation {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.nav-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.nav-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #ccc;
  color: #ccc;
}

/* Transition animations */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox-container,
.lightbox-leave-active .lightbox-container {
  transition: transform 0.3s ease;
}

.lightbox-enter-from .lightbox-container,
.lightbox-leave-to .lightbox-container {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .lightbox-content {
    grid-template-columns: 1fr;
    max-height: 70vh;
  }
  
  .lightbox-image {
    height: 300px;
  }
  
  .lightbox-info {
    max-height: calc(70vh - 300px);
  }
}
</style>