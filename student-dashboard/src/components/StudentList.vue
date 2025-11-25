<template>
  <div class="student-list">
    <StudentCard 
      v-for="student in students" 
      :key="student.id" 
      :student="student" 
      @remove-student="$emit('remove-student', $event)"
    />
  </div>
</template>

<script>
import StudentCard from './StudentCard.vue'

export default {
  name: 'StudentList',
  components: {
    StudentCard
  },
  props: {
    students: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['remove-student']
}
</script>

<style scoped>
.student-list {
  /* No additional styles needed */
}
</style>