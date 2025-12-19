<template>
  <div class="user-profile">
    <div v-if="!userStore.isAuthenticated" class="not-logged-in">
      <p>Please log in to view your profile.</p>
      <button @click="$emit('login')" class="login-btn">Login</button>
    </div>
    
    <div v-else class="profile-content">
      <div class="profile-header">
        <h1>Your Profile</h1>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
      
      <div class="profile-info">
        <div class="info-card">
          <h3>Account Information</h3>
          <div class="info-item">
            <span class="label">Username:</span>
            <span class="value">{{ userStore.user.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">Email:</span>
            <span class="value">{{ userStore.user.email }}</span>
          </div>
          <div class="info-item">
            <span class="label">Account Type:</span>
            <span class="value badge" :class="{ 'admin': userStore.isAdmin }">
              {{ userStore.isAdmin ? 'Administrator' : 'Standard User' }}
            </span>
          </div>
        </div>
        
        <div class="stats-card">
          <h3>Your Statistics</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">{{ artStore.totalArtworks }}</span>
              <span class="stat-label">Total Artworks</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ artStore.featuredArtworks.length }}</span>
              <span class="stat-label">Featured</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ artStore.favorites.length }}</span>
              <span class="stat-label">Favorites</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="artStore.favorites.length > 0" class="favorites-section">
        <h3>Your Favorites</h3>
        <div class="favorites-grid">
          <div 
            v-for="artId in artStore.favorites" 
            :key="artId"
            class="favorite-item"
            @click="viewArtwork(artId)"
          >
            <div class="favorite-image">
              <img :src="getArtworkImage(artId)" alt="Favorite artwork" />
            </div>
            <div class="favorite-info">
              <h4>{{ getArtworkTitle(artId) }}</h4>
              <p>{{ getArtworkArtist(artId) }}</p>
              <button 
                @click.stop="removeFavorite(artId)"
                class="remove-favorite"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="no-favorites">
        <p>You haven't added any artworks to favorites yet.</p>
        <router-link to="/gallery" class="browse-link">Browse Gallery</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { useArtStore } from '@/stores/artStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const artStore = useArtStore()
const router = useRouter()

const logout = () => {
  userStore.logout()
  router.push('/')
}

const viewArtwork = (id) => {
  router.push(`/art/${id}`)
}

const removeFavorite = (id) => {
  artStore.toggleFavorite(id)
}

const getArtworkImage = (id) => {
  const artwork = artStore.artworks.find(a => a.id === id)
  return artwork ? artwork.image : ''
}

const getArtworkTitle = (id) => {
  const artwork = artStore.artworks.find(a => a.id === id)
  return artwork ? artwork.title : 'Unknown Artwork'
}

const getArtworkArtist = (id) => {
  const artwork = artStore.artworks.find(a => a.id === id)
  return artwork ? artwork.artist : 'Unknown Artist'
}
</script>

<style scoped>
.user-profile {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.not-logged-in {
  text-align: center;
  padding: 4rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.not-logged-in p {
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 1.1rem;
}

.login-btn {
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
}

.profile-header h1 {
  margin: 0;
  color: #333;
}

.logout-btn {
  padding: 0.5rem 1.5rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: #ff5252;
  transform: translateY(-2px);
}

.profile-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-card,
.stats-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.info-card h3,
.stats-card h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f1f1;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  color: #666;
  font-weight: 500;
}

.value {
  color: #333;
  font-weight: 600;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge.admin {
  background: #ff6b6b;
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.favorites-section {
  margin-top: 3rem;
}

.favorites-section h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.favorite-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.favorite-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.favorite-image {
  height: 150px;
  overflow: hidden;
}

.favorite-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-info {
  padding: 1rem;
}

.favorite-info h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1rem;
}

.favorite-info p {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.remove-favorite {
  padding: 0.25rem 0.75rem;
  background: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
}

.remove-favorite:hover {
  background: #ffcdd2;
}

.no-favorites {
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 12px;
  color: #666;
}

.no-favorites p {
  margin-bottom: 1.5rem;
}

.browse-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s;
}

.browse-link:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .profile-info {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .favorites-grid {
    grid-template-columns: 1fr;
  }
}
</style>