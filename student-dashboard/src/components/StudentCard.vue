<template>
  <div class="student-card">
    <div class="student-header">
      <h2>{{ student.name }}</h2>
      <button @click="removeStudent" class="remove-btn">Remove</button>
    </div>
    <p>Age: {{ student.age }}</p>
    <hr class="separator">
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
  },
  methods: {
    removeStudent() {
      this.$emit('remove-student', this.student.id);
    }
  }
}
</script>

<style scoped>
.student-card {
  margin-bottom: 10px;
}

.student-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.student-card h2 {
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin: 0;
}

.student-card p {
  color: #333;
  margin-bottom: 10px;
}

.remove-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.remove-btn:hover {
  background-color: #cc0000;
}

.separator {
  border: none;
  border-top: 2px solid #000;
  margin: 15px 0;
}
</style>