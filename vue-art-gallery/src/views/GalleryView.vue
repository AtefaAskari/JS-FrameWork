<template>
  <div class="gallery">
    <!-- Gallery Header -->
    <div class="gallery-header">
      <h2 class="gallery-title">Art Gallery</h2>
      <p class="gallery-subtitle">Browse our collection of {{ filteredArtworks.length }} artworks</p>
      
      <!-- Filter Controls -->
      <div class="filter-controls">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search artworks..."
            @input="applyFilters"
          />
          <span class="search-icon">🔍</span>
        </div>
        
        <div class="filter-group">
          <select v-model="selectedGenre" @change="applyFilters">
            <option value="">All Genres</option>
            <option v-for="genre in genres" :key="genre">{{ genre }}</option>
          </select>
        </div>
        
        <div class="filter-group">
          <select v-model="selectedYear" @change="applyFilters">
            <option value="">All Years</option>
            <option v-for="year in years" :key="year">{{ year }}</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="showFeaturedOnly" @change="applyFilters" />
            <span>Featured Only</span>
          </label>
        </div>
        
        <button @click="resetFilters" class="reset-btn">Reset Filters</button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading artworks...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error">
      <p>Error: {{ error }}</p>
      <button @click="fetchArtworks">Retry</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredArtworks.length === 0" class="empty">
      <p>No artworks found matching your criteria.</p>
      <button @click="resetFilters">Show All Artworks</button>
    </div>

    <!-- Artworks Grid -->
    <div v-else class="artworks-grid">
      <div v-for="artwork in filteredArtworks" :key="artwork.id" class="artwork-item">
        <div class="artwork-card" @click="viewArtwork(artwork.id)">
          <div class="artwork-image" :style="{ backgroundImage: `url(${artwork.image})` }">
            <button 
              class="favorite-btn" 
              @click.stop="toggleFavorite(artwork.id)"
              :class="{ 'active': isFavorite(artwork.id) }"
            >
              {{ isFavorite(artwork.id) ? '♥' : '♡' }}
            </button>
            <span v-if="artwork.featured" class="featured-tag">⭐ Featured</span>
            <div class="artwork-overlay">
              <span class="view-details">View Details →</span>
            </div>
          </div>
          <div class="artwork-info">
            <h3>{{ artwork.title }}</h3>
            <p class="artist">{{ artwork.artist }}</p>
            <div class="artwork-meta">
              <span class="year">{{ artwork.year }}</span>
              <span class="genre">{{ artwork.genre }}</span>
              <span class="price" v-if="artwork.price">${{ formatPrice(artwork.price) }}</span>
            </div>
            <p class="description">{{ truncateDescription(artwork.description) }}</p>
            <div class="artwork-actions">
              <button @click.stop="toggleDescription(artwork.id)" class="more-btn">
                {{ showFullDescription[artwork.id] ? 'Less' : 'More' }}
              </button>
              <span class="likes">👍 {{ artwork.likes || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && !error && filteredArtworks.length > 0" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">← Previous</button>
      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next →</button>
    </div>

    <!-- Stats -->
    <div class="gallery-stats">
      <div class="stat-card">
        <span class="stat-number">{{ totalArtworks }}</span>
        <span class="stat-label">Total Artworks</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ featuredCount }}</span>
        <span class="stat-label">Featured</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ favoriteCount }}</span>
        <span class="stat-label">Your Favorites</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// State
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const selectedGenre = ref('')
const selectedYear = ref('')
const showFeaturedOnly = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(6)
const favorites = ref([1, 3, 5])
const showFullDescription = reactive({})

// Artworks data
const artworks = ref([
  {
    id: 1,
    title: 'Starry Night',
    artist: 'Vincent Van Gogh',
    year: 1889,
    genre: 'Post-Impressionism',
    description: 'A swirling night sky over a quiet town, painted from memory during the artist\'s stay at the asylum in Saint-Rémy.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    featured: true,
    price: 45000000,
    likes: 2450
  },
  {
    id: 2,
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    year: 1931,
    genre: 'Surrealism',
    description: 'Melting clocks in a dreamlike landscape, symbolizing the relativity of time and space in the subconscious mind.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    featured: false,
    price: 35000000,
    likes: 1890
  },
  {
    id: 3,
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    year: 1665,
    genre: 'Baroque',
    description: 'Portrait of a girl wearing an exotic dress and large pearl earring, often called the "Mona Lisa of the North".',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    featured: true,
    price: 30000000,
    likes: 3120
  },
  {
    id: 4,
    title: 'The Scream',
    artist: 'Edvard Munch',
    year: 1893,
    genre: 'Expressionism',
    description: 'An agonized figure against a blood-red sky, representing human anxiety and existential dread.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop',
    featured: false,
    price: 120000000,
    likes: 2780
  },
  {
    id: 5,
    title: 'Guernica',
    artist: 'Pablo Picasso',
    year: 1937,
    genre: 'Cubism',
    description: 'Powerful anti-war painting depicting the suffering of people and animals during the bombing of Guernica.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
    featured: true,
    price: 200000000,
    likes: 4150
  },
  {
    id: 6,
    title: 'The Night Watch',
    artist: 'Rembrandt',
    year: 1642,
    genre: 'Baroque',
    description: 'Militia company marching out, led by Captain Frans Banninck Cocq and his lieutenant.',
    image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=300&fit=crop',
    featured: false,
    price: 50000000,
    likes: 1920
  },
  {
    id: 7,
    title: 'Water Lilies',
    artist: 'Claude Monet',
    year: 1916,
    genre: 'Impressionism',
    description: 'Series of approximately 250 oil paintings depicting Monet\'s flower garden at Giverny.',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=300&fit=crop',
    featured: true,
    price: 55000000,
    likes: 3280
  },
  {
    id: 8,
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    year: 1486,
    genre: 'Renaissance',
    description: 'Depicts the goddess Venus arriving at the shore after her birth, when she had emerged from the sea fully-grown.',
    image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=400&h=300&fit=crop',
    featured: false,
    price: 85000000,
    likes: 2670
  }
])

// Computed properties
const genres = computed(() => {
  const uniqueGenres = [...new Set(artworks.value.map(art => art.genre))]
  return uniqueGenres.sort()
})

const years = computed(() => {
  const uniqueYears = [...new Set(artworks.value.map(art => art.year))]
  return uniqueYears.sort((a, b) => b - a)
})

const filteredArtworks = computed(() => {
  let result = artworks.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(art =>
      art.title.toLowerCase().includes(query) ||
      art.artist.toLowerCase().includes(query) ||
      art.genre.toLowerCase().includes(query) ||
      art.description.toLowerCase().includes(query)
    )
  }

  // Apply genre filter
  if (selectedGenre.value) {
    result = result.filter(art => art.genre === selectedGenre.value)
  }

  // Apply year filter
  if (selectedYear.value) {
    result = result.filter(art => art.year === parseInt(selectedYear.value))
  }

  // Apply featured filter
  if (showFeaturedOnly.value) {
    result = result.filter(art => art.featured)
  }

  return result
})

const totalArtworks = computed(() => artworks.value.length)
const featuredCount = computed(() => artworks.value.filter(art => art.featured).length)
const favoriteCount = computed(() => favorites.value.length)

const totalPages = computed(() => {
  return Math.ceil(filteredArtworks.value.length / itemsPerPage.value)
})

const paginatedArtworks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredArtworks.value.slice(start, end)
})

// Methods
const fetchArtworks = async () => {
  loading.value = true
  error.value = null
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Artworks are already loaded
  } catch (err) {
    error.value = 'Failed to load artworks. Please try again.'
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  currentPage.value = 1 // Reset to first page when filters change
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedGenre.value = ''
  selectedYear.value = ''
  showFeaturedOnly.value = false
  currentPage.value = 1
}

const toggleFavorite = (id) => {
  const index = favorites.value.indexOf(id)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(id)
  }
}

const isFavorite = (id) => {
  return favorites.value.includes(id)
}

const viewArtwork = (id) => {
  router.push(`/artwork/${id}`)
}

const toggleDescription = (id) => {
  showFullDescription[id] = !showFullDescription[id]
}

const formatPrice = (price) => {
  return price.toLocaleString('en-US')
}

const truncateDescription = (description) => {
  return description.length > 100 ? description.substring(0, 100) + '...' : description
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Lifecycle hook
onMounted(() => {
  fetchArtworks()
  // Initialize showFullDescription for each artwork
  artworks.value.forEach(art => {
    showFullDescription[art.id] = false
  })
})

// Watch for filter changes
watch([searchQuery, selectedGenre, selectedYear, showFeaturedOnly], () => {
  applyFilters()
})
</script>

<style scoped>
.gallery {
  padding: 2rem 1rem;
}

/* Gallery Header */
.gallery-header {
  text-align: center;
  margin-bottom: 3rem;
}

.gallery-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.gallery-subtitle {
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 2rem;
}

/* Filter Controls */
.filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 300px;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.filter-group select {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  min-width: 150px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
}

.filter-group select:focus {
  outline: none;
  border-color: #667eea;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-label span {
  color: #4a5568;
  font-weight: 500;
}

.reset-btn {
  padding: 0.75rem 1.5rem;
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.reset-btn:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}

/* Loading State */
.loading {
  text-align: center;
  padding: 4rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error {
  text-align: center;
  padding: 4rem;
  background: #fed7d7;
  border-radius: 16px;
  color: #c53030;
}

.error button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #c53030;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* Empty State */
.empty {
  text-align: center;
  padding: 4rem;
  background: #f7fafc;
  border-radius: 16px;
  color: #4a5568;
}

.empty button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* Artworks Grid */
.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.artwork-item {
  transition: transform 0.3s;
}

.artwork-item:hover {
  transform: translateY(-5px);
}

.artwork-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.artwork-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.artwork-image {
  height: 250px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.artwork-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.artwork-card:hover .artwork-overlay {
  opacity: 1;
}

.view-details {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  background: rgba(102, 126, 234, 0.8);
  border-radius: 8px;
}

.favorite-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 2;
}

.favorite-btn:hover {
  background: white;
  transform: scale(1.1);
}

.favorite-btn.active {
  color: #fc8181;
}

.featured-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
}

.artwork-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.artwork-info h3 {
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.artist {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
}

.artwork-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.9rem;
}

.year {
  color: #718096;
  background: #f7fafc;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.genre {
  color: #4a5568;
  font-weight: 500;
}

.price {
  color: #38a169;
  font-weight: 600;
  background: #f0fff4;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

.artwork-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.more-btn {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.3s;
}

.more-btn:hover {
  color: #764ba2;
}

.likes {
  color: #718096;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0;
}

.pagination button {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination button:hover:not(:disabled) {
  background: #667eea;
  color: white;
  border-color: #667eea;
  transform: translateY(-2px);
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #4a5568;
  font-weight: 500;
}

/* Gallery Stats */
.gallery-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 4rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #718096;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Responsive */
@media (max-width: 768px) {
  .gallery-title {
    font-size: 2.5rem;
  }
  
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
  }
  
  .filter-group select {
    width: 100%;
  }
  
  .artworks-grid {
    grid-template-columns: 1fr;
  }
  
  .gallery-stats {
    grid-template-columns: 1fr;
  }
}
</style>