import { createRouter, createWebHistory } from 'vue-router'

// IMPORTANT: Make sure the path to StudentList is correct
import StudentList from '@/components/StudentList.vue'

const routes = [
  {
    path: '/',
    name: 'AllStudents',
    component: StudentList,
    props: { 
      filterType: 'all',
      title: 'All Students'
    }
  },
  {
    path: '/under-21',
    name: 'Under21',
    component: StudentList,
    props: { 
      filterType: 'under21',
      title: 'Students Under 21'
    }
  },
  {
    path: '/over-21',
    name: 'Over21',
    component: StudentList,
    props: { 
      filterType: 'over21',
      title: 'Students 21 and Over'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Add navigation logging
router.beforeEach((to, from) => {
  console.log('🚀 Navigating from:', from.path, 'to:', to.path)
  console.log('📋 Route props:', to.params)
  return true
})

export default router