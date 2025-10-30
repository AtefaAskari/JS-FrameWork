<template>
  <div class="video-card" @mouseover="hover = true" @mouseleave="hover = false">
    <img :src="thumbnail" alt="thumbnail" class="thumbnail" />
    <div class="info">
      <h3>{{ title }}</h3>
      <p class="channel">{{ channel }}</p>
      <p class="views">{{ views }} views</p>
      <button @click="likeVideo" class="like-btn">❤ Like</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
const props = defineProps(['title', 'channel', 'views', 'thumbnail'])
const emit = defineEmits(['liked'])
const hover = ref(false)

function likeVideo() {
  emit('liked')
}
</script>

<style scoped>
.video-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(6px);
}

.video-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.25);
}

.thumbnail {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}

.info {
  padding: 1rem;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
  color: #fff;
}

.channel {
  color: #ffe600;
  font-size: 0.9rem;
}

.views {
  color: #ddd;
  font-size: 0.85rem;
  margin-bottom: 0.8rem;
}

.like-btn {
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;
}

.like-btn:hover {
  transform: scale(1.05);
  background: linear-gradient(90deg, #ff4b2b, #ff416c);
}
</style>
