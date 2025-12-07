<template>
  <div class="student-card">
    <!-- Your existing student card template -->
    <h3>{{ student.name }}</h3>
    <p>Age: {{ student.age }}</p>
    <p>Grade: {{ student.grade }}</p>
    <!-- Add more details as needed -->
  </div>
</template>

<script>
export default {
  name: 'StudentCard',
  props: {
    student: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
/* Your existing StudentCard styles */
</style>