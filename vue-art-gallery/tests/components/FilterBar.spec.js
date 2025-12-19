import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterBar from '@/components/gallery/FilterBar.vue'

describe('FilterBar', () => {
  const mockArtworks = [
    { id: 1, title: 'Art 1', artist: 'Artist 1', year: 2000, genre: 'Modern' },
    { id: 2, title: 'Art 2', artist: 'Artist 2', year: 2005, genre: 'Classic' },
    { id: 3, title: 'Art 3', artist: 'Artist 3', year: 2010, genre: 'Modern' }
  ]

  let wrapper

  beforeEach(() => {
    wrapper = mount(FilterBar, {
      props: {
        artworks: mockArtworks
      }
    })
  })

  it('renders all filter controls', () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('.reset-btn').exists()).toBe(true)
  })

  it('populates genre options from artworks', () => {
    const genreOptions = wrapper.findAll('select option')
    expect(genreOptions.length).toBe(3) // "All Genres" + 2 unique genres
    expect(wrapper.text()).toContain('Modern')
    expect(wrapper.text()).toContain('Classic')
  })

  it('populates year options from artworks', () => {
    const yearOptions = wrapper.findAll('select').at(1).findAll('option')
    expect(yearOptions.length).toBe(4) // "All Years" + 3 unique years
  })

  it('emits filter event when search input changes', async () => {
    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('modern')
    
    expect(wrapper.emitted().filter).toBeTruthy()
    const filterData = wrapper.emitted().filter[0][0]
    expect(filterData.search).toBe('modern')
  })

  it('emits filter event when genre is selected', async () => {
    const genreSelect = wrapper.find('select')
    await genreSelect.setValue('Modern')
    
    expect(wrapper.emitted().filter).toBeTruthy()
    const filterData = wrapper.emitted().filter[0][0]
    expect(filterData.genre).toBe('Modern')
  })

  it('emits filter event when year is selected', async () => {
    const yearSelect = wrapper.findAll('select').at(1)
    await yearSelect.setValue('2000')
    
    expect(wrapper.emitted().filter).toBeTruthy()
    const filterData = wrapper.emitted().filter[0][0]
    expect(filterData.year).toBe('2000')
  })

  it('emits filter event when featured checkbox is toggled', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)
    
    expect(wrapper.emitted().filter).toBeTruthy()
    const filterData = wrapper.emitted().filter[0][0]
    expect(filterData.featuredOnly).toBe(true)
  })

  it('resets all filters when reset button is clicked', async () => {
    // Set some filters first
    await wrapper.find('input[type="text"]').setValue('test')
    await wrapper.find('select').setValue('Modern')
    
    // Click reset button
    await wrapper.find('.reset-btn').trigger('click')
    
    // Check that filters were reset
    const filterData = wrapper.emitted().filter[wrapper.emitted().filter.length - 1][0]
    expect(filterData.search).toBe('')
    expect(filterData.genre).toBe('')
    expect(filterData.year).toBe('')
    expect(filterData.featuredOnly).toBe(false)
  })
})