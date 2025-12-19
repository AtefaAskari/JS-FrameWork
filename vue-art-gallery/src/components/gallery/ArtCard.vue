<template>
  <div 
    class="art-card"
    :class="{ 'featured': artwork.featured, 'favorite': isFavorite }"
    @click="handleClick"
  >
    <div class="art-image">
      <img :src="artwork.image" :alt="artwork.title" />
      <button 
        class="favorite-btn"
        @click.stop="toggleFavorite"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        ♥
      </button>
      <span v-if="artwork.featured" class="featured-badge">Featured</span>
    </div>
    
    <div class="art-info">
      <h3>{{ artwork.title }}</h3>
      <p class="artist">{{ artwork.artist }}</p>
      <div class="art-meta">
        <span class="year">{{ artwork.year }}</span>
        <span class="genre">{{ artwork.genre }}</span>
      </div>
      <p v-show="showDescription" class="description">{{ artwork.description }}</p>
      <div class="art-actions">
        <button @click.stop="toggleDescription" class="toggle-btn">
          {{ showDescription ? 'Less' : 'More' }}
        </button>
        <router-link 
          :to="`/art/${artwork.id}`"
          class="detail-link"
          @click.stop
        >
          Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  artwork: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'toggleFavorite'])

const showDescription = ref(false)

const handleClick = () => {
  emit('select', props.artwork.id)
}

const toggleFavorite = () => {
  emit('toggleFavorite', props.artwork.id)
}

const toggleDescription = () => {
  showDescription.value = !showDescription.value
}
</script>

<style scoped>
.art-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.art-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.art-card.featured {
  border: 2px solid #ff6b6b;
}

.art-card.favorite .favorite-btn {
  color: #ff4757;
}

.art-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.art-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.art-card:hover .art-image img {
  transform: scale(1.05);
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255,255,255,0.9);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
}

.favorite-btn:hover {
  background: white;
  transform: scale(1.1);
}

.featured-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff6b6b;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.art-info {
  padding: 1rem;
}

.art-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #333;
}

.artist {
  color: #666;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.art-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #888;
}

.description {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
}

.art-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.toggle-btn,
.detail-link {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.toggle-btn {
  background: #f1f1f1;
  color: #333;
}

.detail-link {
  background: #667eea;
  color: white;
}

.toggle-btn:hover {
  background: #e0e0e0;
}

.detail-link:hover {
  background: #5a67d8;
}
</style>