<template>
  <div class="add-student-form">
    <h3>Add New Student</h3>
    <form @submit.prevent="addStudent">
      <div class="form-group">
        <label for="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          v-model="newStudent.name" 
          required 
          placeholder="Enter student name"
        >
      </div>
      
      <div class="form-group">
        <label for="age">Age:</label>
        <input 
          type="number" 
          id="age" 
          v-model.number="newStudent.age" 
          required 
          min="16" 
          max="100"
          placeholder="Enter age"
        >
      </div>
      
      <button type="submit" class="btn-primary">Add Student</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddStudentForm',
  data() {
    return {
      newStudent: {
        name: '',
        age: null
      }
    }
  },
  methods: {
    addStudent() {
      if (this.newStudent.name && this.newStudent.age) {
        this.$emit('add-student', { 
          ...this.newStudent,
          id: Date.now() // Simple ID generation
        });
        
        // Reset form
        this.newStudent = {
          name: '',
          age: null
        };
      }
    }
  }
}
</script>

<style scoped>
.add-student-form {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f0f8ff;
}

.add-student-form h3 {
  margin-bottom: 15px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>