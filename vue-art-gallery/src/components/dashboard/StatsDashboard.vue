<template>
  <div class="stats-dashboard">
    <div class="dashboard-header">
      <h1>Gallery Analytics Dashboard</h1>
      <div class="last-updated">
        Last updated: {{ lastUpdated }}
      </div>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon total-icon">🖼️</div>
        <div class="stat-content">
          <div class="stat-number">{{ totalArtworks }}</div>
          <div class="stat-label">Total Artworks</div>
          <div class="stat-trend">
            <span class="trend-up">+{{ newArtworks }} new</span>
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon featured-icon">⭐</div>
        <div class="stat-content">
          <div class="stat-number">{{ featuredCount }}</div>
          <div class="stat-label">Featured Artworks</div>
          <div class="stat-percentage">{{ featuredPercentage }}% of total</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon favorite-icon">♥</div>
        <div class="stat-content">
          <div class="stat-number">{{ favoriteCount }}</div>
          <div class="stat-label">Total Favorites</div>
          <div class="stat-change">
            <span v-if="favoritesChange > 0" class="trend-up">+{{ favoritesChange }}%</span>
            <span v-else-if="favoritesChange < 0" class="trend-down">{{ favoritesChange }}%</span>
            <span v-else class="trend-neutral">No change</span>
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon genre-icon">🎨</div>
        <div class="stat-content">
          <div class="stat-number">{{ genresCount }}</div>
          <div class="stat-label">Art Genres</div>
          <div class="stat-detail">Most popular: {{ mostPopularGenre }}</div>
        </div>
      </div>
    </div>
    
    <div class="charts-grid">
      <div class="chart-card">
        <h3>Artworks by Year</h3>
        <div class="year-chart">
          <div 
            v-for="item in yearDistribution" 
            :key="item.year"
            class="year-bar"
            :style="{ height: item.count * 20 + 'px' }"
            :title="`${item.year}: ${item.count} artworks`"
          >
            <span class="year-label">{{ item.year }}</span>
            <span class="bar-count">{{ item.count }}</span>
          </div>
        </div>
      </div>
      
      <div class="chart-card">
        <h3>Artworks by Genre</h3>
        <div class="genre-chart">
          <div 
            v-for="item in genreDistribution" 
            :key="item.genre"
            class="genre-item"
          >
            <span class="genre-name">{{ item.genre }}</span>
            <div class="genre-bar-container">
              <div 
                class="genre-bar"
                :style="{ width: item.percentage + '%' }"
              ></div>
              <span class="genre-count">{{ item.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="recent-activity">
      <h3>Recent Activity</h3>
      <div class="activity-list">
        <div 
          v-for="(activity, index) in recentActivities" 
          :key="index"
          class="activity-item"
          :class="activity.type"
        >
          <span class="activity-icon">{{ getActivityIcon(activity.type) }}</span>
          <div class="activity-content">
            <p class="activity-text">{{ activity.text }}</p>
            <span class="activity-time">{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useArtStore } from '@/stores/artStore'

const artStore = useArtStore()
const lastUpdated = ref(new Date().toLocaleTimeString())

const totalArtworks = computed(() => artStore.totalArtworks)
const featuredCount = computed(() => artStore.featuredArtworks.length)
const favoriteCount = computed(() => artStore.favorites.length)

const genresCount = computed(() => {
  const genres = [...new Set(artStore.artworks.map(art => art.genre))]
  return genres.length
})

const featuredPercentage = computed(() => {
  if (totalArtworks.value === 0) return 0
  return Math.round((featuredCount.value / totalArtworks.value) * 100)
})

const mostPopularGenre = computed(() => {
  const genreCount = {}
  artStore.artworks.forEach(art => {
    genreCount[art.genre] = (genreCount[art.genre] || 0) + 1
  })
  
  let mostPopular = ''
  let maxCount = 0
  for (const genre in genreCount) {
    if (genreCount[genre] > maxCount) {
      maxCount = genreCount[genre]
      mostPopular = genre
    }
  }
  return mostPopular || 'N/A'
})

const yearDistribution = computed(() => {
  const yearCount = {}
  artStore.artworks.forEach(art => {
    yearCount[art.year] = (yearCount[art.year] || 0) + 1
  })
  
  return Object.entries(yearCount)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => a.year - b.year)
    .slice(-5) // Last 5 years
})

const genreDistribution = computed(() => {
  const genreCount = {}
  artStore.artworks.forEach(art => {
    genreCount[art.genre] = (genreCount[art.genre] || 0) + 1
  })
  
  const total = artStore.artworks.length
  return Object.entries(genreCount)
    .map(([genre, count]) => ({
      genre,
      count,
      percentage: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.count - a.count)
})

const recentActivities = ref([
  { type: 'add', text: 'New artwork "Sunflowers" added', time: '10 min ago' },
  { type: 'favorite', text: 'User favorited "Starry Night"', time: '25 min ago' },
  { type: 'update', text: 'Artwork details updated', time: '1 hour ago' },
  { type: 'view', text: 'Gallery viewed 150 times today', time: '2 hours ago' },
  { type: 'feature', text: '"Guernica" marked as featured', time: '3 hours ago' }
])

const newArtworks = ref(2)
const favoritesChange = ref(12)

const getActivityIcon = (type) => {
  const icons = {
    add: '➕',
    favorite: '♥',
    update: '✏️',
    view: '👁️',
    feature: '⭐'
  }
  return icons[type] || '⚡'
}

onMounted(() => {
  // Simulate real-time updates
  setInterval(() => {
    lastUpdated.value = new Date().toLocaleTimeString()
  }, 60000) // Update every minute
})
</script>

<style scoped>
.stats-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
}

.dashboard-header h1 {
  margin: 0;
  color: #333;
  font-size: 2rem;
}

.last-updated {
  color: #666;
  font-size: 0.9rem;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.stat-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.total-icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.featured-icon {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
}

.favorite-icon {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
}

.genre-icon {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.stat-trend,
.stat-percentage,
.stat-change,
.stat-detail {
  font-size: 0.85rem;
  font-weight: 500;
}

.trend-up {
  color: #4caf50;
}

.trend-down {
  color: #f44336;
}

.trend-neutral {
  color: #666;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.chart-card h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  text-align: center;
}

.year-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.year-bar {
  width: 50px;
  background: linear-gradient(to top, #667eea, #764ba2);
  border-radius: 6px 6px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  transition: height 0.3s;
}

.year-label {
  position: absolute;
  bottom: -25px;
  font-size: 0.8rem;
  color: #666;
}

.bar-count {
  color: white;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.genre-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.genre-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.genre-name {
  width: 150px;
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
}

.genre-bar-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.genre-bar {
  height: 20px;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  border-radius: 10px;
  transition: width 0.5s;
}

.genre-count {
  font-size: 0.9rem;
  color: #666;
  min-width: 30px;
  text-align: right;
}

.recent-activity {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.recent-activity h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
  transition: background-color 0.3s;
}

.activity-item:hover {
  background: #e9ecef;
}

.activity-item.add {
  border-left: 4px solid #4caf50;
}

.activity-item.favorite {
  border-left: 4px solid #f44336;
}

.activity-item.update {
  border-left: 4px solid #2196f3;
}

.activity-item.view {
  border-left: 4px solid #ff9800;
}

.activity-item.feature {
  border-left: 4px solid #9c27b0;
}

.activity-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.activity-content {
  flex: 1;
}

.activity-text {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-weight: 500;
}

.activity-time {
  font-size: 0.8rem;
  color: #666;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .year-chart {
    height: 150px;
  }
  
  .year-bar {
    width: 40px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>