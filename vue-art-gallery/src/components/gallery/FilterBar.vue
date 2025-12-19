<template>
  <div class="filter-bar">
    <div class="filter-group">
      <label>Search:</label>
      <input 
        type="text" 
        v-model="searchQuery"
        placeholder="Search artworks..."
        @input="updateFilters"
      />
    </div>
    
    <div class="filter-group">
      <label>Genre:</label>
      <select v-model="selectedGenre" @change="updateFilters">
        <option value="">All Genres</option>
        <option v-for="genre in genres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
    </div>
    
    <div class="filter-group">
      <label>Year:</label>
      <select v-model="selectedYear" @change="updateFilters">
        <option value="">All Years</option>
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
    
    <div class="filter-group">
      <label>
        <input 
          type="checkbox" 
          v-model="showFeaturedOnly"
          @change="updateFilters"
        />
        Featured Only
      </label>
    </div>
    
    <button @click="resetFilters" class="reset-btn">Reset</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  artworks: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['filter'])

const searchQuery = ref('')
const selectedGenre = ref('')
const selectedYear = ref('')
const showFeaturedOnly = ref(false)

const genres = computed(() => {
  const uniqueGenres = [...new Set(props.artworks.map(art => art.genre))]
  return uniqueGenres.sort()
})

const years = computed(() => {
  const uniqueYears = [...new Set(props.artworks.map(art => art.year))]
  return uniqueYears.sort((a, b) => b - a)
})

const updateFilters = () => {
  emit('filter', {
    search: searchQuery.value,
    genre: selectedGenre.value,
    year: selectedYear.value,
    featuredOnly: showFeaturedOnly.value
  })
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedGenre.value = ''
  selectedYear.value = ''
  showFeaturedOnly.value = false
  updateFilters()
}

onMounted(() => {
  updateFilters()
})
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

input[type="text"],
select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

.reset-btn {
  padding: 0.5rem 1rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color 0.3s;
}

.reset-btn:hover {
  background: #545b62;
}
</style>