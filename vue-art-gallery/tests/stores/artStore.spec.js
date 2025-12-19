    import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useArtStore } from '@/stores/artStore'

// Mock the API module
vi.mock('@/api/artApi', () => ({
  default: {
    getArtworks: vi.fn().mockResolvedValue([
      { id: 1, title: 'Art 1', artist: 'Artist 1' },
      { id: 2, title: 'Art 2', artist: 'Artist 2' }
    ]),
    getArtwork: vi.fn().mockResolvedValue({ 
      id: 1, 
      title: 'Art 1', 
      artist: 'Artist 1' 
    }),
    createArtwork: vi.fn().mockResolvedValue({ 
      id: 3, 
      title: 'New Art', 
      artist: 'New Artist' 
    })
  }
}))

describe('Art Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useArtStore()
  })

  it('initializes with empty state', () => {
    expect(store.artworks).toEqual([])
    expect(store.favorites).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('fetches artworks and updates state', async () => {
    expect(store.isLoading).toBe(false)
    
    await store.fetchArtworks()
    
    expect(store.isLoading).toBe(false)
    expect(store.artworks.length).toBe(2)
    expect(store.artworks[0].title).toBe('Art 1')
  })

  it('calculates total artworks', () => {
    store.artworks = [
      { id: 1 }, { id: 2 }, { id: 3 }
    ]
    expect(store.totalArtworks).toBe(3)
  })

  it('filters featured artworks', () => {
    store.artworks = [
      { id: 1, featured: true },
      { id: 2, featured: false },
      { id: 3, featured: true }
    ]
    expect(store.featuredArtworks.length).toBe(2)
  })

  it('adds artwork to favorites', () => {
    store.toggleFavorite(1)
    expect(store.favorites).toContain(1)
    
    store.toggleFavorite(2)
    expect(store.favorites).toContain(2)
    expect(store.favorites.length).toBe(2)
  })

  it('removes artwork from favorites', () => {
    store.favorites = [1, 2, 3]
    store.toggleFavorite(2)
    expect(store.favorites).not.toContain(2)
    expect(store.favorites).toEqual([1, 3])
  })

  it('filters artworks by genre', () => {
    store.artworks = [
      { id: 1, genre: 'Modern' },
      { id: 2, genre: 'Classic' },
      { id: 3, genre: 'Modern' }
    ]
    
    const modernArtworks = store.artworksByGenre('Modern')
    expect(modernArtworks.length).toBe(2)
    expect(modernArtworks[0].genre).toBe('Modern')
  })

  it('gets favorite artworks', () => {
    store.artworks = [
      { id: 1, title: 'Art 1' },
      { id: 2, title: 'Art 2' },
      { id: 3, title: 'Art 3' }
    ]
    store.favorites = [1, 3]
    
    const favoriteArtworks = store.favoriteArtworks
    expect(favoriteArtworks.length).toBe(2)
    expect(favoriteArtworks[0].id).toBe(1)
    expect(favoriteArtworks[1].id).toBe(3)
  })

  it('adds new artwork', async () => {
    const newArtwork = { title: 'New Art', artist: 'New Artist' }
    await store.addArtwork(newArtwork)
    
    expect(store.artworks.length).toBeGreaterThan(0)
    expect(store.artworks[store.artworks.length - 1].title).toBe('New Art')
  })

  it('loads favorites from localStorage', () => {
    const mockFavorites = [1, 2, 3]
    localStorage.setItem('artFavorites', JSON.stringify(mockFavorites))
    
    store.loadFavorites()
    expect(store.favorites).toEqual(mockFavorites)
  })

  it('saves favorites to localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    
    store.toggleFavorite(5)
    
    expect(setItemSpy).toHaveBeenCalledWith(
      'artFavorites',
      JSON.stringify([5])
    )
  })
})