<template>
  <div class="form-container">
    <h2>➕ Add New Student</h2>
    <form @submit.prevent="submitForm" class="student-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          v-model="student.name" 
          placeholder="Enter student name"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="age">Age:</label>
        <input 
          type="number" 
          id="age" 
          v-model.number="student.age" 
          placeholder="Enter age"
          min="1"
          max="120"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="grade">Grade:</label>
        <input 
          type="text" 
          id="grade" 
          v-model="student.grade" 
          placeholder="A, B, C, etc."
          required
        >
      </div>
      
      <button type="submit" class="submit-btn">
        Add Student
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddStudentForm',
  data() {
    return {
      student: {
        name: '',
        age: null,
        grade: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Ensure age is a number
      const newStudent = {
        ...this.student,
        age: Number(this.student.age)
      }
      
      console.log('📝 Submitting student:', newStudent)
      this.$emit('add-student', newStudent)
      
      // Reset form
      this.student = {
        name: '',
        age: null,
        grade: ''
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.student-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #34495e;
}

.form-group input {
  padding: 12px 15px;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}
</style>