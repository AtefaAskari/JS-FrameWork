<template>
  <div id="app">
    <!-- Header with navigation -->
    <header class="app-header">
      <div class="container">
        <h1 class="logo">🎨 Art Gallery Vue</h1>
        <nav class="nav">
          <router-link to="/" class="nav-link" exact>Home</router-link>
          <router-link to="/gallery" class="nav-link">Gallery</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </nav>
        <div class="user-info" v-if="isLoggedIn">
          <span>Welcome, {{ userName }}</span>
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
        <button v-else @click="login" class="login-btn">Login</button>
      </div>
    </header>

    <!-- Main content with router view -->
    <main class="app-main">
      <div class="container">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2024 Art Gallery Vue - Vue.js Final Project</p>
        <p>Total Artworks: {{ totalArtworks }} | Favorites: {{ favoriteCount }}</p>
      </div>
    </footer>

    <!-- Login Modal (v-if demonstration) -->
    <div v-if="showLoginModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>Login to Art Gallery</h3>
        <form @submit.prevent="handleLogin">
          <input v-model="loginForm.username" placeholder="Username" required>
          <input v-model="loginForm.password" type="password" placeholder="Password" required>
          <button type="submit">Login</button>
          <button type="button" @click="closeModal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive state
const isLoggedIn = ref(false)
const userName = ref('')
const showLoginModal = ref(false)
const favoriteCount = ref(0)
const totalArtworks = ref(12)

// Reactive form
const loginForm = reactive({
  username: '',
  password: ''
})

// Computed property
const greeting = computed(() => {
  return isLoggedIn.value ? `Welcome back, ${userName.value}!` : 'Please login to save favorites'
})

// Methods
const login = () => {
  showLoginModal.value = true
}

const handleLogin = () => {
  if (loginForm.username && loginForm.password) {
    isLoggedIn.value = true
    userName.value = loginForm.username
    showLoginModal.value = false
    loginForm.username = ''
    loginForm.password = ''
  }
}

const logout = () => {
  isLoggedIn.value = false
  userName.value = ''
  favoriteCount.value = 0
}

const closeModal = () => {
  showLoginModal.value = false
}

// Lifecycle hook
onMounted(() => {
  console.log('App mounted!')
  // Simulate loading data
  setTimeout(() => {
    totalArtworks.value = 15
  }, 1000)
})

// Watch for route changes
watch(() => router.currentRoute.value.path, (newPath) => {
  console.log('Route changed to:', newPath)
})
</script>

<style scoped>
/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.app-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
}

.app-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.8rem;
  font-weight: 700;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.nav-link.router-link-active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: #667eea;
  border-radius: 50%;
}

/* Buttons */
button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.logout-btn {
  background: #fc8181;
  color: white;
  margin-left: 1rem;
}

.logout-btn:hover {
  background: #f56565;
  transform: translateY(-2px);
}

/* User info */
.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #4a5568;
}

/* Main content */
.app-main {
  min-height: calc(100vh - 140px);
  padding: 3rem 0;
}

/* Footer */
.app-footer {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1.5rem 0;
  text-align: center;
}

.app-footer p {
  margin: 0.5rem 0;
  color: #a0aec0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal h3 {
  margin-bottom: 1.5rem;
  color: #2d3748;
  text-align: center;
}

.modal form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal input {
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.modal input:focus {
  outline: none;
  border-color: #667eea;
}

.modal button {
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
}

.modal button[type="submit"] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal button[type="button"] {
  background: #e2e8f0;
  color: #4a5568;
}

/* Responsive */
@media (max-width: 768px) {
  .app-header .container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav {
    gap: 0.5rem;
  }
  
  .logo {
    font-size: 1.5rem;
  }
}
</style>