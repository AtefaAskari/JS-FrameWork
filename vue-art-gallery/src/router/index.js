import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')  // CHANGED THIS LINE
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/GalleryView.vue')  // CHANGED THIS LINE
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router