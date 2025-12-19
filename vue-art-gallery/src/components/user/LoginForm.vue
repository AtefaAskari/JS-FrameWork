<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h2>Login</h2>
    
    <div class="form-group">
      <label for="username">Username *</label>
      <input
        id="username"
        v-model="form.username"
        type="text"
        :class="{ 'error': errors.username }"
        placeholder="Enter username"
        autocomplete="username"
      />
      <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
    </div>
    
    <div class="form-group">
      <label for="password">Password *</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        :class="{ 'error': errors.password }"
        placeholder="Enter password"
        autocomplete="current-password"
      />
      <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
    </div>
    
    <div v-if="loginError" class="login-error">
      {{ loginError }}
    </div>
    
    <div class="demo-credentials">
      <p><strong>Demo Credentials:</strong></p>
      <p>Admin: username: <code>admin</code>, password: <code>admin</code></p>
      <p>User: any username/password combination</p>
    </div>
    
    <div class="form-actions">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="login-btn"
      >
        {{ isSubmitting ? 'Logging in...' : 'Login' }}
      </button>
      <button
        type="button"
        @click="$emit('cancel')"
        class="cancel-btn"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const emit = defineEmits(['success', 'cancel'])

const userStore = useUserStore()
const isSubmitting = ref(false)
const loginError = ref('')

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: ''
})

const validateForm = () => {
  let isValid = true
  
  errors.username = ''
  errors.password = ''
  
  if (!form.username.trim()) {
    errors.username = 'Username is required'
    isValid = false
  }
  
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  loginError.value = ''
  
  try {
    const success = userStore.login(form.username, form.password)
    if (success) {
      emit('success')
    } else {
      loginError.value = 'Invalid credentials'
    }
  } catch (error) {
    loginError.value = 'Login failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.login-form {
  width: 100%;
}

.login-form h2 {
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input.error {
  border-color: #ff6b6b;
}

.error-message {
  display: block;
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.login-error {
  background: #ffebee;
  color: #c62828;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
}

.demo-credentials {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

.demo-credentials p {
  margin: 0.25rem 0;
}

.demo-credentials code {
  background: #e9ecef;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: monospace;
}

.form-actions {
  display: flex;
  gap: 1rem;
}

.login-btn,
.cancel-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn {
  background: #667eea;
  color: white;
}

.login-btn:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-2px);
}

.login-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cancel-btn {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #ddd;
}

.cancel-btn:hover {
  background: #e9ecef;
}
</style>    