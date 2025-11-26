<template>
  <div class="person-card" :class="{ 
    disliked: person.dislikes > person.likes,
    popular: person.likes > person.dislikes * 2 && person.likes > 0
  }">
    <div class="card-header">
      <div class="avatar">
        {{ getInitials(person.name) }}
      </div>
      <div class="person-info">
        <h3 class="person-name">{{ person.name }}</h3>
        <div class="person-badges">
          <span v-if="person.dislikes > person.likes" class="badge negative">
            👎 Trending Down
          </span>
          <span v-else-if="person.likes > person.dislikes * 2 && person.likes > 0" class="badge positive">
            ⭐ Popular
          </span>
          <span v-else class="badge neutral">
            👤 Member
          </span>
        </div>
      </div>
    </div>
    
    <div class="card-stats">
      <div class="stat like-stat">
        <div class="stat-icon">👍</div>
        <div class="stat-content">
          <div class="stat-value">{{ person.likes }}</div>
          <div class="stat-label">Likes</div>
        </div>
      </div>
      <div class="stat dislike-stat">
        <div class="stat-icon">👎</div>
        <div class="stat-content">
          <div class="stat-value">{{ person.dislikes }}</div>
          <div class="stat-label">Dislikes</div>
        </div>
      </div>
      <div class="stat ratio-stat">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <div class="stat-value">{{ getRatio() }}%</div>
          <div class="stat-label">Ratio</div>
        </div>
      </div>
    </div>
    
    <div class="card-actions">
      <button class="action-btn like-btn" @click="$emit('like', person.id)">
        <span class="btn-icon">👍</span>
        Like
      </button>
      <button class="action-btn dislike-btn" @click="$emit('dislike', person.id)">
        <span class="btn-icon">👎</span>
        Dislike
      </button>
    </div>
    
    <div class="card-footer">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: getRatio() + '%' }"
          :class="{ negative: person.dislikes > person.likes }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Person {
  id: number
  name: string
  likes: number
  dislikes: number
}

const props = defineProps<{
  person: Person
}>()

defineEmits<{
  like: [id: number]
  dislike: [id: number]
}>()

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getRatio = () => {
  const total = props.person.likes + props.person.dislikes
  if (total === 0) return 50
  return Math.round((props.person.likes / total) * 100)
}
</script>

<style scoped>
.person-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.person-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  opacity: 0.7;
}

.person-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.1);
}

.person-card.disliked {
  border-left: 6px solid #ff6b6b;
}

.person-card.disliked::before {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}

.person-card.popular {
  border-left: 6px solid #ffd93d;
}

.person-card.popular::before {
  background: linear-gradient(135deg, #ffd93d, #ff9a3d);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
  color: white;
  flex-shrink: 0;
}

.person-card.disliked .avatar {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}

.person-card.popular .avatar {
  background: linear-gradient(135deg, #ffd93d, #ff9a3d);
}

.person-info {
  flex: 1;
}

.person-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.person-badges {
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.positive {
  background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
  color: #22543d;
}

.badge.negative {
  background: linear-gradient(135deg, #fed7d7, #feb2b2);
  color: #742a2a;
}

.badge.neutral {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e0);
  color: #2d3748;
}

.card-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.person-card.disliked .stat {
  background: rgba(255, 107, 107, 0.05);
  border-color: rgba(255, 107, 107, 0.1);
}

.stat-icon {
  font-size: 1.2rem;
  opacity: 0.8;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.3rem;
  font-weight: 800;
  color: #2d3748;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: #718096;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.action-btn {
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.like-btn {
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
}

.like-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);
}

.dislike-btn {
  background: linear-gradient(135deg, #f56565, #e53e3e);
  color: white;
  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);
}

.dislike-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 101, 101, 0.4);
}

.card-footer {
  margin-top: auto;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #48bb78, #38a169);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-fill.negative {
  background: linear-gradient(135deg, #f56565, #e53e3e);
}

/* Responsive */
@media (max-width: 480px) {
  .person-card {
    padding: 1.25rem;
  }
  
  .card-stats {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .card-actions {
    grid-template-columns: 1fr;
  }
  
  .person-name {
    font-size: 1.2rem;
  }
}
</style>