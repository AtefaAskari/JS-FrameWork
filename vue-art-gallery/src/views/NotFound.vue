<template>
  <div class="not-found">
    <div class="error-content">
      <div class="error-code">404</div>
      <h1 class="error-title">Page Not Found</h1>
      <p class="error-message">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <div class="error-actions">
        <router-link to="/" class="action-btn primary-btn">
          Go to Homepage
        </router-link>
        <button @click="goBack" class="action-btn secondary-btn">
          Go Back
        </button>
      </div>
      <div class="error-search">
        <p>Or try searching for what you need:</p>
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search artworks..."
            @keyup.enter="performSearch"
          />
          <button @click="performSearch" class="search-btn">Search</button>
        </div>
      </div>
    </div>
    
    <div class="error-artworks">
      <h3>Explore Our Gallery Instead</h3>
      <div class="artworks-grid">
        <ArtCard
          v-for="artwork in featuredArtworks"
          :key="artwork.id"
          :artwork="artwork"
          @select="viewArtwork"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useArtStore } from '@/stores/artStore'
import ArtCard from '@/components/gallery/ArtCard.vue'

const router = useRouter()
const artStore = useArtStore()
const searchQuery = ref('')

const featuredArtworks = computed(() => {
  return artStore.featuredArtworks.slice(0, 3)
})

const goBack = () => {
  router.go(-1)
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/gallery',
      query: { search: searchQuery.value }
    })
  }
}

const viewArtwork = (id) => {
  router.push(`/art/${id}`)
}
</script>

<style scoped>
.not-found {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  text-align: center;
}

.error-content {
  margin-bottom: 4rem;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem auto;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.primary-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.secondary-btn {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.secondary-btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.error-search {
  max-width: 500px;
  margin: 0 auto;
}

.error-search p {
  color: #666;
  margin-bottom: 1rem;
}

.search-box {
  display: flex;
  gap: 0.5rem;
}

.search-box input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background: #5a67d8;
}

.error-artworks {
  padding-top: 3rem;
  border-top: 1px solid #eee;
}

.error-artworks h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action-btn {
    width: 100%;
    max-width: 300px;
  }
  
  .search-box {
    flex-direction: column;
  }
}
</style>