import { ref, computed, watch, onMounted } from 'vue'

export function useVideos() {
  // Reactive state
  const videos = ref([])
  const searchQuery = ref('')
  const totalLikes = ref(0)
  const loading = ref(true)

  // Simulate fetching video data
  onMounted(() => {
    setTimeout(() => {
      videos.value = [
        {
          title: 'Vue 3 Crash Course',
          channel: 'CodeAcademy',
          views: '1.2M',
          thumbnail: 'https://i.ytimg.com/vi/YrxBCBibVo0/maxresdefault.jpg',
        },
        {
          title: 'Learn JavaScript in 1 Hour',
          channel: 'Tech Simplified',
          views: '980K',
          thumbnail: 'https://i.ytimg.com/vi/W6NZfCO5SIk/maxresdefault.jpg',
        },
        {
          title: 'Master CSS Animations',
          channel: 'Frontend Fun',
          views: '450K',
          thumbnail: 'https://i.ytimg.com/vi/jgw82b5Y2MU/maxresdefault.jpg',
        },
        {
          title: 'Build a Portfolio with HTML & CSS',
          channel: 'DesignSpot',
          views: '230K',
          thumbnail: 'https://i.ytimg.com/vi/xpZLS6b0L4w/maxresdefault.jpg',
        },
        {
          title: 'Python for Beginners – Full Course',
          channel: 'Tech With Tim',
          views: '2.4M',
          thumbnail: 'https://i.ytimg.com/vi/_uQrJ0TkZlc/maxresdefault.jpg',
        },
        {
          title: 'The Secret to Perfect UI Design',
          channel: 'DesignCourse',
          views: '740K',
          thumbnail: 'https://i.ytimg.com/vi/_Hp_dI0DzY4/maxresdefault.jpg',
        },
        {
          title: 'Top 10 JavaScript Tricks You Must Know',
          channel: 'Fireship',
          views: '1.9M',
          thumbnail: 'https://i.ytimg.com/vi/2Ji-clqUYnA/maxresdefault.jpg',
        },
        {
          title: 'Relaxing Lofi Beats – Study Music',
          channel: 'Lofi Girl',
          views: '3.8M',
          thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
        },
        {
          title: 'Build a Fullstack App with Django & Vue',
          channel: 'Traversy Media',
          views: '620K',
          thumbnail: 'https://i.ytimg.com/vi/qDwdMDQ8oX4/maxresdefault.jpg',
        },
        {
          title: 'How the Internet Works – Explained!',
          channel: 'Computerphile',
          views: '870K',
          thumbnail: 'https://i.ytimg.com/vi/ewrBalT_eBM/maxresdefault.jpg',
        },
      ]
      loading.value = false
    }, 1200)
  })

  // Computed property for filtering
  const filteredVideos = computed(() => {
    const query = searchQuery.value.toLowerCase()
    return videos.value.filter(
      v =>
        v.title.toLowerCase().includes(query) ||
        v.channel.toLowerCase().includes(query)
    )
  })

  // Watch searchQuery for debugging (optional)
  watch(searchQuery, (newVal) => {
    console.log('Searching:', newVal)
  })

  // Function to handle likes
  const addLike = () => {
    totalLikes.value++
  }

  // Return everything
  return { videos, filteredVideos, searchQuery, totalLikes, loading, addLike }
}
