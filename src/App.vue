<template>
  <div class="app-container" :class="{ dark: isDarkMode }">
    <header class="header">
      <h1 class="logo">Mini<span>YouTube</span></h1>
      <div class="controls">
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="🔍 Search videos..."
          />
          <p class="results">🎥 {{ filteredVideos.length }} found</p>
        </div>
        <button class="theme-toggle" @click="toggleTheme">
          {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
        </button>
      </div>
    </header>

    <main>
      <div v-if="loading" class="loading">⏳ Loading videos…</div>
      <div v-else>
        <div v-if="filteredVideos.length === 0" class="no-videos">
          🚫 No videos found.
        </div>
        <div class="video-grid">
          <VideoCard
            v-for="(video, index) in filteredVideos"
            :key="index"
            :title="video.title"
            :channel="video.channel"
            :views="video.views"
            :thumbnail="video.thumbnail"
            @liked="addLike"
          />
        </div>
      </div>
    </main>

    <footer>
      <p>Total Likes ❤️ {{ totalLikes }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVideos } from './composables/useVideos.js'
import VideoCard from './components/VideoCard.vue'

const { videos, filteredVideos, searchQuery, totalLikes, loading, addLike } = useVideos()
const isDarkMode = ref(false)

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
}
</script>

<style scoped>
/* 🌈 Gradient background */
.app-container {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #ff4b2b, #ff416c, #7f00ff);
  color: #fff;
  min-height: 100vh;
  padding: 0 2rem;
  transition: all 0.3s ease;
}

/* 🌙 Dark mode */
.dark {
  background: linear-gradient(135deg, #1e1e2f, #2b2b40);
  color: #eee;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
}

.logo {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.logo span {
  color: #ffe600;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.search-bar input {
  padding: 0.6rem 1rem;
  width: 280px;
  border-radius: 20px;
  border: none;
  outline: none;
  transition: 0.3s;
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.2);
}

.search-bar input:focus {
  box-shadow: 0 2px 8px rgba(255, 230, 0, 0.8);
}

.results {
  font-size: 0.85rem;
  margin-top: 5px;
  color: #ffe;
}

.theme-toggle {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.35);
}

.loading, .no-videos {
  text-align: center;
  font-size: 1.3rem;
  color: #fff;
  margin-top: 2rem;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

footer {
  text-align: center;
  margin-top: 3rem;
  padding: 1rem;
  font-size: 1rem;
  color: #fff;
  opacity: 0.8;
}
</style>
