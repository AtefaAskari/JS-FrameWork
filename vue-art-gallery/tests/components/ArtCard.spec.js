import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ArtCard from '@/components/gallery/ArtCard.vue'

describe('ArtCard', () => {
  const mockArtwork = {
    id: 1,
    title: 'Starry Night',
    artist: 'Vincent Van Gogh',
    year: 1889,
    genre: 'Post-Impressionism',
    description: 'A famous painting',
    image: 'test.jpg',
    featured: true
  }

  let wrapper

  beforeEach(() => {
    wrapper = mount(ArtCard, {
      props: {
        artwork: mockArtwork,
        isFavorite: false
      }
    })
  })

  it('renders artwork title and artist', () => {
    expect(wrapper.text()).toContain('Starry Night')
    expect(wrapper.text()).toContain('Vincent Van Gogh')
  })

  it('shows featured badge when artwork is featured', () => {
    const badge = wrapper.find('.featured-badge')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('Featured')
  })

  it('emits select event when card is clicked', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted().select).toBeTruthy()
    expect(wrapper.emitted().select[0]).toEqual([mockArtwork.id])
  })

  it('emits toggleFavorite event when favorite button is clicked', async () => {
    const favoriteBtn = wrapper.find('.favorite-btn')
    await favoriteBtn.trigger('click')
    expect(wrapper.emitted().toggleFavorite).toBeTruthy()
    expect(wrapper.emitted().toggleFavorite[0]).toEqual([mockArtwork.id])
  })

  it('toggles description visibility when toggle button is clicked', async () => {
    const toggleBtn = wrapper.find('.toggle-btn')
    expect(wrapper.text()).not.toContain(mockArtwork.description)
    
    await toggleBtn.trigger('click')
    expect(wrapper.text()).toContain(mockArtwork.description)
    
    await toggleBtn.trigger('click')
    expect(wrapper.text()).not.toContain(mockArtwork.description)
  })

  it('applies featured class when artwork is featured', () => {
    expect(wrapper.classes()).toContain('featured')
  })

  it('applies favorite class when isFavorite prop is true', async () => {
    await wrapper.setProps({ isFavorite: true })
    expect(wrapper.classes()).toContain('favorite')
  })
})