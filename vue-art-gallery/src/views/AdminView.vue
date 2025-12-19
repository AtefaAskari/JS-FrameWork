 <template>
  <div class="admin-view">
    <div v-if="!userStore.isAuthenticated || !userStore.isAdmin" class="access-denied">
      <h2>Access Denied</h2>
      <p>You need administrator privileges to access this page.</p>
      <router-link to="/" class="home-link">Return to Home</router-link>
    </div>
    
    <div v-else class="admin-content">
      <div class="admin-header">
        <h1>Admin Panel</h1>
        <div class="admin-info">
          <span>Logged in as: {{ userStore.user.name }}</span>
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
      </div>
      
      <div class="admin-nav">
        <router-link 
          to="/admin/artworks" 
          class="nav-link"
          :class="{ 'active': $route.path.includes('artworks') }"
        >
          Manage Artworks
        </router-link>
        <router-link 
          to="/admin/users" 
          class="nav-link"
          :class="{ 'active': $route.path.includes('users') }"
        >
          Manage Users
        </router-link>
      </div>
      
      <div class="admin-main">
        <router-view />
      </div>
      
      <div class="admin-stats">
        <h3>Quick Stats</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">{{ artStore.totalArtworks }}</span>
            <span class="stat-label">Artworks</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ artStore.favorites.length }}</span>
            <span class="stat-label">Favorites</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ artStore.featuredArtworks.length }}</span>
            <span class="stat-label">Featured</span>
          </div>
        </div>
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
</script>

<style scoped>
.admin-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.access-denied {
  text-align: center;
  padding: 4rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.access-denied h2 {
  color: #c62828;
  margin-bottom: 1rem;
}

.access-denied p {
  color: #666;
  margin-bottom: 2rem;
}

.home-link {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background: #5a67d8;
}

.admin-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
}

.admin-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-header h1 {
  margin: 0;
  font-size: 2rem;
}

.admin-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.2);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background: rgba(255,255,255,0.3);
}

.admin-nav {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.nav-link {
  padding: 1rem 2rem;
  text-decoration: none;
  color: #495057;
  font-weight: 500;
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
}

.nav-link:hover {
  background: #e9ecef;
  color: #333;
}

.nav-link.active {
  color: #667eea;
  border-bottom-color: #667eea;
  background: white;
}

.admin-main {
  padding: 2rem;
  min-height: 500px;
}

.admin-stats {
  background: #f8f9fa;
  padding: 1.5rem 2rem;
  border-top: 1px solid #dee2e6;
}

.admin-stats h3 {
  margin: 0 0 1rem 0;
  color: #495057;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .admin-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .admin-nav {
    flex-direction: column;
  }
  
  .nav-link {
    text-align: center;
    border-bottom: 1px solid #dee2e6;
    border-right: none;
  }
  
  .nav-link.active {
    border-right: none;
    border-bottom: 3px solid #667eea;
  }
}
</style>