<template>
  <div class="student-list-container">
    <div class="list-header">
      <h2>{{ filterTitle }}</h2>
      <div class="filter-info">
        <span class="badge count-badge">
          {{ filteredStudents.length }} student{{ filteredStudents.length !== 1 ? 's' : '' }}
        </span>
        <span class="badge age-badge" :class="filterType">
          {{ filterType === 'all' ? 'All Ages' : filterType === 'under21' ? 'Under 21' : '21+' }}
        </span>
      </div>
    </div>

    <div v-if="filteredStudents.length === 0" class="empty-state">
      <div class="empty-icon">📚</div>
      <h3>No students found</h3>
      <p v-if="filterType === 'under21'">
        No students under 21. Try adding younger students or check "All Students".
      </p>
      <p v-else-if="filterType === 'over21'">
        No students 21 or older. Try adding older students or check "All Students".
      </p>
      <p v-else>
        No students available. Add some students using the form above!
      </p>
    </div>

    <div v-else class="students-grid">
      <div 
        v-for="student in filteredStudents" 
        :key="student.id" 
        class="student-card"
        :class="{ 'under-21': student.age < 21, 'over-21': student.age >= 21 }"
      >
        <div class="card-header">
          <h3>{{ student.name }}</h3>
          <span class="student-id">#{{ student.id }}</span>
        </div>
        
        <div class="card-body">
          <div class="info-row">
            <span class="label">Age:</span>
            <span class="value">{{ student.age }}</span>
            <span class="age-indicator" :class="student.age < 21 ? 'young' : 'adult'">
              {{ student.age < 21 ? 'Under 21' : '21+' }}
            </span>
          </div>
          
          <div class="info-row">
            <span class="label">Grade:</span>
            <span class="value grade" :class="getGradeClass(student.grade)">
              {{ student.grade }}
            </span>
          </div>
        </div>
        
        <div class="card-footer">
          <small>Added to dashboard</small>
        </div>
      </div>
    </div>

    <!-- Debug panel (can be removed later) -->
    <div class="debug-panel" v-if="showDebug">
      <details>
        <summary>Debug Info</summary>
        <pre>Filter Type: {{ filterType }}</pre>
        <pre>Total Students: {{ students.length }}</pre>
        <pre>Filtered Count: {{ filteredStudents.length }}</pre>
        <pre>Route Path: {{ $route.path }}</pre>
        <pre>Students Data: {{ JSON.stringify(students, null, 2) }}</pre>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentList',
  props: {
    students: {
      type: Array,
      required: true,
      default: () => []
    },
    filterType: {
      type: String,
      default: 'all',
      validator: (value) => ['all', 'under21', 'over21'].includes(value)
    }
  },
  data() {
    return {
      showDebug: true // Set to false to hide debug panel
    }
  },
  computed: {
    filteredStudents() {
      console.log(`🔍 Filtering with type: ${this.filterType}`)
      console.log('📊 Original students:', this.students)
      
      // Ensure ages are numbers
      const studentsWithNumberAges = this.students.map(s => ({
        ...s,
        age: Number(s.age) || 0
      }))
      
      let filtered
      switch(this.filterType) {
        case 'under21':
          filtered = studentsWithNumberAges.filter(s => s.age < 21)
          break
        case 'over21':
          filtered = studentsWithNumberAges.filter(s => s.age >= 21)
          break
        default:
          filtered = studentsWithNumberAges
      }
      
      console.log('✅ Filtered result:', filtered)
      return filtered
    },
    
    filterTitle() {
      switch(this.filterType) {
        case 'under21': return '🎯 Students Under 21'
        case 'over21': return '🎓 Students 21 and Over'
        default: return '👥 All Students'
      }
    }
  },
  methods: {
    getGradeClass(grade) {
      if (grade.includes('A')) return 'grade-a'
      if (grade.includes('B')) return 'grade-b'
      if (grade.includes('C')) return 'grade-c'
      return 'grade-other'
    }
  },
  mounted() {
    console.log('🎬 StudentList mounted!')
    console.log('📋 Props received:', {
      filterType: this.filterType,
      studentsCount: this.students.length
    })
    console.log('📍 Current route:', this.$route.path)
  }
}
</script>

<style scoped>
.student-list-container {
  padding: 20px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;
}

.list-header h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin: 0;
}

.filter-info {
  display: flex;
  gap: 10px;
}

.badge {
  padding: 8px 15px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
}

.count-badge {
  background: #3498db;
  color: white;
}

.age-badge {
  background: #e0e0e0;
  color: #333;
}

.age-badge.under21 {
  background: #9b59b6;
  color: white;
}

.age-badge.over21 {
  background: #e74c3c;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #f8f9fa;
  border-radius: 15px;
  border: 2px dashed #dee2e6;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #6c757d;
  margin-bottom: 10px;
}

.empty-state p {
  color: #868e96;
  max-width: 500px;
  margin: 0 auto;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.student-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.student-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.student-card.under-21 {
  border-color: #9b59b6;
}

.student-card.over-21 {
  border-color: #e74c3c;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.card-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.student-id {
  background: #f0f0f0;
  color: #666;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
}

.card-body {
  margin-bottom: 15px;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 8px;
}

.label {
  font-weight: bold;
  color: #495057;
  min-width: 60px;
}

.value {
  flex: 1;
  color: #212529;
  font-weight: 500;
}

.age-indicator {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-left: 10px;
}

.age-indicator.young {
  background: #d6c8ff;
  color: #6f42c1;
}

.age-indicator.adult {
  background: #ffc9c9;
  color: #e03131;
}

.grade {
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  min-width: 60px;
}

.grade-a {
  background: #d4edda;
  color: #155724;
}

.grade-b {
  background: #fff3cd;
  color: #856404;
}

.grade-c {
  background: #f8d7da;
  color: #721c24;
}

.grade-other {
  background: #e2e3e5;
  color: #383d41;
}

.card-footer {
  font-size: 0.8rem;
  color: #868e96;
  text-align: right;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
}

.debug-panel {
  margin-top: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #dee2e6;
}

.debug-panel summary {
  cursor: pointer;
  font-weight: bold;
  color: #495057;
}

.debug-panel pre {
  background: white;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
  font-size: 0.9rem;
  margin-top: 10px;
  border: 1px solid #dee2e6;
}
</style>