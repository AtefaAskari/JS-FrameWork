import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const isAdmin = ref(false)

  const userName = computed(() => user.value ? user.value.name : 'Guest')

  function login(username, password) {
    // Simple mock login
    if (username === 'admin' && password === 'admin') {
      user.value = { name: 'Admin', email: 'admin@artvue.com' }
      isAuthenticated.value = true
      isAdmin.value = true
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('isAdmin', 'true')
      return true
    } else if (username && password) {
      user.value = { name: username, email: `${username}@artvue.com` }
      isAuthenticated.value = true
      localStorage.setItem('isAuthenticated', 'true')
      return true
    }
    return false
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    isAdmin.value = false
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('isAdmin')
  }

  function loadUser() {
    const auth = localStorage.getItem('isAuthenticated')
    const admin = localStorage.getItem('isAdmin')
    if (auth) {
      isAuthenticated.value = true
      user.value = { name: 'User', email: 'user@artvue.com' }
      if (admin === 'true') {
        isAdmin.value = true
        user.value = { name: 'Admin', email: 'admin@artvue.com' }
      }
    }
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    userName,
    login,
    logout,
    loadUser
  }
})