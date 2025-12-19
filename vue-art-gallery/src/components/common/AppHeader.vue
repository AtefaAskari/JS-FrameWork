<template>
  <header class="app-header">
    <nav>
      <router-link to="/" class="logo">
        ArtVue Pro
      </router-link>
      
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/gallery">Gallery</router-link>
        <router-link to="/dashboard" v-if="userStore.isAuthenticated">Dashboard</router-link>
        <router-link to="/admin" v-if="userStore.isAdmin">Admin</router-link>
      </div>

      <div class="user-section">
        <span v-if="userStore.isAuthenticated" class="welcome">
          Welcome, {{ userStore.userName }}
        </span>
        <button 
          v-if="!userStore.isAuthenticated" 
          @click="showLogin = true"
          class="login-btn"
        >
          Login
        </button>
        <button 
          v-else 
          @click="logout"
          class="logout-btn"
        >
          Logout
        </button>
      </div>
    </nav>

    <!-- Login Modal -->
    <div v-show="showLogin" class="modal-overlay" @click.self="showLogin = false">
      <div class="modal-content">
        <LoginForm @success="handleLoginSuccess" @cancel="showLogin = false" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import LoginForm from '@/components/user/LoginForm.vue'

const userStore = useUserStore()
const showLogin = ref(false)

onMounted(() => {
  userStore.loadUser()
})

const logout = () => {
  userStore.logout()
}

const handleLoginSuccess = () => {
  showLogin.value = false
}
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: rgba(255,255,255,0.1);
}

.nav-links a.router-link-active {
  background-color: rgba(255,255,255,0.2);
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.welcome {
  font-size: 0.9rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}

.login-btn {
  background-color: white;
  color: #667eea;
}

.logout-btn {
  background-color: #ff6b6b;
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
}
</style>