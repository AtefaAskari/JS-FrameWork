<template>
  <div class="profile-view">
    <UserProfile @login="showLogin = true" />
    
    <div v-if="showLogin" class="login-modal">
      <div class="modal-overlay" @click.self="showLogin = false">
        <div class="modal-content">
          <LoginForm @success="handleLoginSuccess" @cancel="showLogin = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserProfile from '@/components/user/UserProfile.vue'
import LoginForm from '@/components/user/LoginForm.vue'

const showLogin = ref(false)

const handleLoginSuccess = () => {
  showLogin.value = false
}
</script>

<style scoped>
.profile-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
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
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
}
</style>