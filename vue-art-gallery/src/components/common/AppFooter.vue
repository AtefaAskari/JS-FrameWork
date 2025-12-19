<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>ArtVue Pro</h3>
        <p>Discover and manage art collections with Vue.js</p>
      </div>
      
      <div class="footer-section">
        <h4>Quick Links</h4>
        <router-link to="/">Home</router-link>
        <router-link to="/gallery">Gallery</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
      </div>
      
      <div class="footer-section">
        <h4>Statistics</h4>
        <p>Total Artworks: {{ artStore.totalArtworks }}</p>
        <p>Featured: {{ artStore.featuredArtworks.length }}</p>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2024 ArtVue Pro. Vue Mega App Project.</p>
    </div>
  </footer>
</template>

<script setup>
import { useArtStore } from '@/stores/artStore'

const artStore = useArtStore()
</script>

<style scoped>
.app-footer {
  background: #2c3e50;
  color: white;
  padding: 2rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
}

.footer-section a {
  display: block;
  color: #bdc3c7;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #34495e;
  color: #95a5a6;
}
</style>