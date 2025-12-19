<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h2 class="hero-title">Discover Beautiful Art</h2>
        <p class="hero-subtitle">Explore our curated collection of masterpieces from around the world</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">{{ totalArtworks }}</span>
            <span class="stat-label">Artworks</span>
          </div>
          <div class="stat">
            <span class="stat-number">{{ artists }}</span>
            <span class="stat-label">Artists</span>
          </div>
          <div class="stat">
            <span class="stat-number">{{ countries }}</span>
            <span class="stat-label">Countries</span>
          </div>
        </div>
        <router-link to="/gallery" class="hero-button">
          Start Exploring →
        </router-link>
      </div>
      <div class="hero-image">
        <div class="floating-artworks">
          <div class="floating-art" v-for="art in floatingArts" :key="art.id"
               :style="{ animationDelay: art.delay, left: art.left, top: art.top }">
            {{ art.emoji }}
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <h3 class="section-title">Why Choose Art Gallery Vue?</h3>
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.id" class="feature-card">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h4>{{ feature.title }}</h4>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Recent Artworks -->
    <section class="recent-artworks">
      <div class="section-header">
        <h3 class="section-title">Recently Added</h3>
        <router-link to="/gallery" class="view-all">View All →</router-link>
      </div>
      <div class="artworks-grid">
        <div v-for="artwork in recentArtworks" :key="artwork.id" class="artwork-card">
          <div class="artwork-image" :style="{ backgroundImage: `url(${artwork.image})` }">
            <button class="favorite-btn" @click="toggleFavorite(artwork.id)"
                    :class="{ 'active': isFavorite(artwork.id) }">
              ♥
            </button>
            <span v-if="artwork.featured" class="featured-badge">Featured</span>
          </div>
          <div class="artwork-info">
            <h4>{{ artwork.title }}</h4>
            <p class="artist">{{ artwork.artist }}</p>
            <div class="artwork-meta">
              <span class="year">{{ artwork.year }}</span>
              <span class="genre">{{ artwork.genre }}</span>
            </div>
            <p v-show="showDescription[artwork.id]" class="description">{{ artwork.description }}</p>
            <button @click="toggleDescription(artwork.id)" class="toggle-btn">
              {{ showDescription[artwork.id] ? 'Show Less' : 'Show More' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta">
      <h3>Ready to Start Your Art Journey?</h3>
      <p>Join thousands of art lovers exploring our collection</p>
      <div class="cta-buttons">
        <router-link to="/gallery" class="cta-btn primary">Browse Gallery</router-link>
        <button @click="scrollToTop" class="cta-btn secondary">Scroll to Top</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// Reactive data
const totalArtworks = ref(15)
const artists = ref(8)
const countries = ref(5)
const favorites = ref([1, 3])
const showDescription = reactive({})

// Art data
const recentArtworks = ref([
  {
    id: 1,
    title: 'Starry Night',
    artist: 'Vincent Van Gogh',
    year: 1889,
    genre: 'Post-Impressionism',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    description: 'A swirling night sky over a quiet town, painted from memory during the artist\'s stay at the asylum.',
    featured: true
  },
  {
    id: 2,
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    year: 1931,
    genre: 'Surrealism',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    description: 'Melting clocks in a dreamlike landscape, symbolizing the relativity of time and space.',
    featured: false
  },
  {
    id: 3,
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    year: 1665,
    genre: 'Baroque',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    description: 'Portrait of a girl wearing an exotic dress and large pearl earring, often called the "Mona Lisa of the North".',
    featured: true
  }
])

const floatingArts = ref([
  { id: 1, emoji: '🖼️', delay: '0s', left: '10%', top: '20%' },
  { id: 2, emoji: '🎨', delay: '0.5s', left: '70%', top: '40%' },
  { id: 3, emoji: '✨', delay: '1s', left: '40%', top: '60%' },
  { id: 4, emoji: '🌟', delay: '1.5s', left: '80%', top: '20%' }
])

const features = ref([
  { id: 1, icon: '🔍', title: 'Smart Search', description: 'Find artworks by artist, genre, or year with our advanced filters' },
  { id: 2, icon: '♥', title: 'Save Favorites', description: 'Create your personal collection of favorite artworks' },
  { id: 3, icon: '📱', title: 'Mobile Friendly', description: 'Enjoy our gallery on any device with responsive design' },
  { id: 4, icon: '🆓', title: 'Free Access', description: 'Explore all artworks completely free of charge' }
])

// Computed properties
const featuredArtworks = computed(() => {
  return recentArtworks.value.filter(art => art.featured)
})

// Methods
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

const toggleDescription = (id) => {
  showDescription[id] = !showDescription[id]
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Lifecycle hook
onMounted(() => {
  console.log('HomeView mounted')
  // Initialize showDescription for each artwork
  recentArtworks.value.forEach(art => {
    showDescription[art.id] = false
  })
})
</script>

<style scoped>
.home {
  padding: 0 1rem;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;
  padding: 3rem 0;
}

.hero-content {
  animation: fadeInLeft 0.8s ease;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #718096;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.hero-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.hero-image {
  position: relative;
  height: 400px;
  animation: fadeInRight 0.8s ease;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.floating-artworks {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-art {
  position: absolute;
  font-size: 4rem;
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* Features */
.features {
  margin-bottom: 6rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border-color: #cbd5e0;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-card h4 {
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #718096;
  line-height: 1.6;
}

/* Recent Artworks */
.recent-artworks {
  margin-bottom: 6rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.view-all {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.view-all:hover {
  color: #764ba2;
}

.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.artwork-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.artwork-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.artwork-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
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
}

.favorite-btn:hover {
  background: white;
  transform: scale(1.1);
}

.favorite-btn.active {
  color: #fc8181;
}

.featured-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.artwork-info {
  padding: 1.5rem;
}

.artwork-info h4 {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.artist {
  color: #667eea;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.artwork-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #718096;
}

.description {
  color: #4a5568;
  line-height: 1.6;
  margin: 1rem 0;
  font-size: 0.95rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.3s;
}

.toggle-btn:hover {
  color: #764ba2;
}

/* Call to Action */
.cta {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  color: white;
  margin-bottom: 4rem;
}

.cta h3 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.cta-btn.primary {
  background: white;
  color: #667eea;
}

.cta-btn.primary:hover {
  background: #f7fafc;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
}

.cta-btn.secondary {
  background: transparent;
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.cta-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  border-color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .hero-image {
    height: 300px;
  }
  
  .floating-art {
    font-size: 3rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .artworks-grid {
    grid-template-columns: 1fr;
  }
  
  .cta h3 {
    font-size: 2rem;
  }
}
</style>