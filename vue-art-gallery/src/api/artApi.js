// Mock API service using localStorage
const STORAGE_KEY = 'artvue_artworks'

const mockArtworks = [
  {
    id: 1,
    title: 'Starry Night',
    artist: 'Vincent Van Gogh',
    year: 1889,
    genre: 'Post-Impressionism',
    description: 'A swirling night sky over a quiet town, painted from memory.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    featured: true,
    price: 45000000
  },
  {
    id: 2,
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    year: 1931,
    genre: 'Surrealism',
    description: 'Melting clocks in a dreamlike landscape.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h-300&fit=crop',
    featured: true,
    price: 35000000
  },
  {
    id: 3,
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    year: 1665,
    genre: 'Baroque',
    description: 'Portrait of a girl wearing an exotic dress and large pearl earring.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    featured: false,
    price: 30000000
  },
  {
    id: 4,
    title: 'The Scream',
    artist: 'Edvard Munch',
    year: 1893,
    genre: 'Expressionism',
    description: 'An agonized figure against a blood-red sky.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop',
    featured: false,
    price: 120000000
  },
  {
    id: 5,
    title: 'Guernica',
    artist: 'Pablo Picasso',
    year: 1937,
    genre: 'Cubism',
    description: 'Powerful anti-war painting depicting the bombing of Guernica.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
    featured: true,
    price: 200000000
  },
  {
    id: 6,
    title: 'The Night Watch',
    artist: 'Rembrandt',
    year: 1642,
    genre: 'Baroque',
    description: 'Militia company marching out, led by Captain Frans Banninck Cocq.',
    image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=300&fit=crop',
    featured: false,
    price: 50000000
  }
]

// Initialize localStorage with mock data if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockArtworks))
}

export default {
  async getArtworks() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    const artworks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return artworks
  },

  async getArtwork(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const artworks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const artwork = artworks.find(a => a.id === parseInt(id))
    if (!artwork) {
      throw new Error(`Artwork ${id} not found`)
    }
    return artwork
  },

  async createArtwork(artwork) {
    await new Promise(resolve => setTimeout(resolve, 800))
    const artworks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const newId = artworks.length > 0 ? Math.max(...artworks.map(a => a.id)) + 1 : 1
    const newArtwork = {
      id: newId,
      ...artwork,
      featured: false
    }
    artworks.push(newArtwork)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(artworks))
    return newArtwork
  },

  async updateArtwork(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 600))
    const artworks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const index = artworks.findIndex(a => a.id === parseInt(id))
    if (index === -1) {
      throw new Error(`Artwork ${id} not found`)
    }
    artworks[index] = { ...artworks[index], ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(artworks))
    return artworks[index]
  }
}