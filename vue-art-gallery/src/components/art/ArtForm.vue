<template>
  <form @submit.prevent="handleSubmit" class="art-form">
    <h2>{{ artwork ? 'Edit Artwork' : 'Add New Artwork' }}</h2>
    
    <div class="form-group">
      <label for="title">Title *</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        :class="{ 'error': errors.title }"
        placeholder="Enter artwork title"
      />
      <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
    </div>
    
    <div class="form-group">
      <label for="artist">Artist *</label>
      <input
        id="artist"
        v-model="formData.artist"
        type="text"
        :class="{ 'error': errors.artist }"
        placeholder="Enter artist name"
      />
      <span v-if="errors.artist" class="error-message">{{ errors.artist }}</span>
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label for="year">Year *</label>
        <input
          id="year"
          v-model.number="formData.year"
          type="number"
          :class="{ 'error': errors.year }"
          min="1000"
          max="2024"
          placeholder="e.g., 1889"
        />
        <span v-if="errors.year" class="error-message">{{ errors.year }}</span>
      </div>
      
      <div class="form-group">
        <label for="genre">Genre *</label>
        <select
          id="genre"
          v-model="formData.genre"
          :class="{ 'error': errors.genre }"
        >
          <option value="">Select a genre</option>
          <option value="Impressionism">Impressionism</option>
          <option value="Post-Impressionism">Post-Impressionism</option>
          <option value="Surrealism">Surrealism</option>
          <option value="Cubism">Cubism</option>
          <option value="Expressionism">Expressionism</option>
          <option value="Baroque">Baroque</option>
          <option value="Renaissance">Renaissance</option>
          <option value="Modern">Modern</option>
          <option value="Contemporary">Contemporary</option>
        </select>
        <span v-if="errors.genre" class="error-message">{{ errors.genre }}</span>
      </div>
    </div>
    
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        rows="4"
        placeholder="Enter artwork description"
      ></textarea>
    </div>
    
    <div class="form-group">
      <label for="image">Image URL</label>
      <input
        id="image"
        v-model="formData.image"
        type="text"
        placeholder="Enter image URL"
      />
    </div>
    
    <div class="form-group">
      <label for="price">Price ($)</label>
      <input
        id="price"
        v-model.number="formData.price"
        type="number"
        min="0"
        step="1000"
        placeholder="Estimated value"
      />
    </div>
    
    <div class="form-group checkbox-group">
      <label>
        <input
          type="checkbox"
          v-model="formData.featured"
        />
        Featured Artwork
      </label>
    </div>
    
    <div class="form-actions">
      <button
        type="submit"
        :disabled="!isFormValid || isSubmitting"
        class="submit-btn"
      >
        {{ isSubmitting ? 'Saving...' : artwork ? 'Update' : 'Add Artwork' }}
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
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps({
  artwork: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const isSubmitting = ref(false)

const formData = reactive({
  title: '',
  artist: '',
  year: new Date().getFullYear(),
  genre: '',
  description: '',
  image: '',
  price: 0,
  featured: false
})

const errors = reactive({
  title: '',
  artist: '',
  year: '',
  genre: ''
})

// Initialize form if editing existing artwork
watch(() => props.artwork, (newArtwork) => {
  if (newArtwork) {
    Object.assign(formData, newArtwork)
  }
}, { immediate: true })

const validateForm = () => {
  let isValid = true
  
  // Clear previous errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  // Title validation
  if (!formData.title.trim()) {
    errors.title = 'Title is required'
    isValid = false
  } else if (formData.title.length < 3) {
    errors.title = 'Title must be at least 3 characters'
    isValid = false
  }
  
  // Artist validation
  if (!formData.artist.trim()) {
    errors.artist = 'Artist is required'
    isValid = false
  }
  
  // Year validation
  if (!formData.year) {
    errors.year = 'Year is required'
    isValid = false
  } else if (formData.year < 1000 || formData.year > new Date().getFullYear()) {
    errors.year = 'Enter a valid year'
    isValid = false
  }
  
  // Genre validation
  if (!formData.genre) {
    errors.genre = 'Genre is required'
    isValid = false
  }
  
  return isValid
}

const isFormValid = computed(() => {
  return formData.title.trim().length >= 3 &&
         formData.artist.trim().length > 0 &&
         formData.year >= 1000 &&
         formData.year <= new Date().getFullYear() &&
         formData.genre
})

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  try {
    emit('submit', { ...formData })
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.art-form {
  max-width: 600px;
  margin: 0 auto;
}

.art-form h2 {
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

input[type="text"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="number"]:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input.error,
select.error {
  border-color: #ff6b6b;
}

.error-message {
  display: block;
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 0.5rem;
  width: auto;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.submit-btn,
.cancel-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn {
  background: #667eea;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-2px);
}

.submit-btn:disabled {
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

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>