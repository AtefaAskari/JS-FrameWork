<template>
  <div id="app">
    <header>
      <h1>Student Dashboard</h1>
      <p class="route-info">Current View: {{ currentView }}</p>
    </header>
    
    <main>
      <!-- Add Student Form -->
      <AddStudentForm @add-student="addStudent" />
      
      <!-- Filter Navigation Buttons - MUST be visible -->
      <div class="filter-nav">
        <router-link to="/">
          <button :class="{ 'active': $route.path === '/' }">
            👥 All Students
          </button>
        </router-link>
        
        <router-link to="/under-21">
          <button :class="{ 'active': $route.path === '/under-21' }">
            🎯 Under 21
          </button>
        </router-link>
        
        <router-link to="/over-21">
          <button :class="{ 'active': $route.path === '/over-21' }">
            🎓 Over 21
          </button>
        </router-link>
      </div>

      <!-- Student List View -->
      <div class="router-view-container">
        <router-view 
          :students="students" 
          :key="$route.path" 
        />
      </div>
    </main>
  </div>
</template>

<script>
import AddStudentForm from './components/AddStudentForm.vue'

export default {
  name: 'App',
  components: {
    AddStudentForm
  },
  data() {
    return {
      students: [
        { id: 1, name: 'Atefa', age: 22, grade: 'A' },
        { id: 2, name: 'Alice Johnson', age: 21, grade: 'B' },
        { id: 3, name: 'Michael Smith', age: 22, grade: 'B+' },
        { id: 4, name: 'alex', age: 20, grade: 'A-' }
      ]
    }
  },
  computed: {
    currentView() {
      switch(this.$route.path) {
        case '/under-21': return 'Students Under 21'
        case '/over-21': return 'Students 21 and Over'
        default: return 'All Students'
      }
    }
  },
  methods: {
    addStudent(newStudent) {
      const newId = this.students.length > 0 
        ? Math.max(...this.students.map(s => s.id)) + 1 
        : 1
      
      this.students.push({
        id: newId,
        name: newStudent.name,
        age: Number(newStudent.age), // CRITICAL: Convert to number
        grade: newStudent.grade
      })
    }
  },
  mounted() {
    console.log('App mounted. Students:', this.students)
    console.log('Router available:', !!this.$router)
    console.log('Current route:', this.$route.path)
  }
}
</script>

<style>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.route-info {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
  font-weight: bold;
  margin-top: 10px;
}

main {
  padding: 30px;
}

/* Filter Navigation - Make sure this is visible! */
.filter-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.filter-nav a {
  text-decoration: none;
}

.filter-nav button {
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #2c3e50;
  color: white;
  min-width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.filter-nav button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background: #34495e;
}

.filter-nav button.active {
  background: linear-gradient(135deg, #42b883 0%, #2c3e50 100%);
  box-shadow: 0 5px 15px rgba(66, 184, 131, 0.4);
}

.router-view-container {
  margin-top: 20px;
  min-height: 400px;
}
</style>