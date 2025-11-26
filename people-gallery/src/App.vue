<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">👥 People Gallery</h1>
        <p class="app-subtitle">Express your opinion with likes and dislikes</p>
        <div class="controls">
          <button class="reset-btn" @click="resetAll">
            <span class="btn-icon">🔄</span>
            Reset All
          </button>
          <div class="stats">
            <span class="stat-total">Total People: {{ people.length }}</span>
          </div>
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <PeopleGallery 
        :people="people" 
        @like="handleLike" 
        @dislike="handleDislike"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PeopleGallery from './components/PeopleGallery.vue'

interface Person {
  id: number
  name: string
  likes: number
  dislikes: number
}

const people = ref<Person[]>([
  { id: 1, name: 'Alice Johnson', likes: 0, dislikes: 0 },
  { id: 2, name: 'Bob Smith', likes: 0, dislikes: 0 },
  { id: 3, name: 'Charlie Brown', likes: 0, dislikes: 0 },
  { id: 4, name: 'Diana Prince', likes: 0, dislikes: 0 },
  { id: 5, name: 'Ethan Hunt', likes: 0, dislikes: 0 },
  { id: 6, name: 'Fiona Gallagher', likes: 0, dislikes: 0 }
])

const handleLike = (personId: number) => {
  const person = people.value.find(p => p.id === personId)
  if (person) {
    person.likes++
  }
}

const handleDislike = (personId: number) => {
  const person = people.value.find(p => p.id === personId)
  if (person) {
    person.dislikes++
  }
}

const resetAll = () => {
  people.value.forEach(person => {
    person.likes = 0
    person.dislikes = 0
  })
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.app-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.app-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  font-weight: 500;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.reset-btn {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.btn-icon {
  font-size: 1.1rem;
}

.stats {
  background: rgba(102, 126, 234, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.stat-total {
  font-weight: 600;
  color: #667eea;
}

.main-content {
  flex: 1;
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .app-title {
    font-size: 2.5rem;
  }
  
  .controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .main-content {
    padding: 2rem 1rem;
  }
}
</style>