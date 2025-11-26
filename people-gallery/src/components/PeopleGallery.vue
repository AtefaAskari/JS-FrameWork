<template>
  <div class="people-gallery">
    <PersonCard
      v-for="person in people"
      :key="person.id"
      :person="person"
      @like="(id: number) => $emit('like', id)"
      @dislike="(id: number) => $emit('dislike', id)"
    />
    <div v-if="people.length === 0" class="empty-state">
      <div class="empty-icon">👥</div>
      <h2>No people in the gallery</h2>
      <p>Add some people to get started!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import PersonCard from './PersonCard.vue'

interface Person {
  id: number
  name: string
  likes: number
  dislikes: number
}

defineProps<{
  people: Person[]
}>()

defineEmits<{
  like: [id: number]
  dislike: [id: number]
}>()
</script>

<style scoped>
.people-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.empty-state h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.empty-state p {
  font-size: 1.1rem;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .people-gallery {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .empty-state {
    padding: 3rem 1rem;
  }
  
  .empty-icon {
    font-size: 3rem;
  }
}

@media (min-width: 1200px) {
  .people-gallery {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>