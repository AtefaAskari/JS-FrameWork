import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ArtForm from '@/components/art/ArtForm.vue'

describe('ArtForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ArtForm)
  })

  it('renders form with all required fields', () => {
    expect(wrapper.find('input#title').exists()).toBe(true)
    expect(wrapper.find('input#artist').exists()).toBe(true)
    expect(wrapper.find('input#year').exists()).toBe(true)
    expect(wrapper.find('select#genre').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('submits form with valid data', async () => {
    // Fill form
    await wrapper.find('input#title').setValue('Test Artwork')
    await wrapper.find('input#artist').setValue('Test Artist')
    await wrapper.find('input#year').setValue(2024)
    await wrapper.find('select#genre').setValue('Modern')
    await wrapper.find('textarea#description').setValue('Test description')

    // Submit form
    await wrapper.find('form').trigger('submit.prevent')

    // Check emitted event
    expect(wrapper.emitted().submit).toBeTruthy()
    const submittedData = wrapper.emitted().submit[0][0]
    expect(submittedData.title).toBe('Test Artwork')
    expect(submittedData.artist).toBe('Test Artist')
    expect(submittedData.year).toBe(2024)
    expect(submittedData.genre).toBe('Modern')
  })

  it('shows validation errors for empty required fields', async () => {
    // Submit empty form
    await wrapper.find('form').trigger('submit.prevent')

    // Check for error messages
    expect(wrapper.text()).toContain('Title is required')
    expect(wrapper.text()).toContain('Artist is required')
    expect(wrapper.text()).toContain('Year is required')
    expect(wrapper.text()).toContain('Genre is required')
  })

  it('shows error for short title', async () => {
    await wrapper.find('input#title').setValue('ab')
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.text()).toContain('Title must be at least 3 characters')
  })

  it('shows error for invalid year', async () => {
    await wrapper.find('input#year').setValue(500)
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.text()).toContain('Enter a valid year')
  })

  it('disables submit button when form is invalid', async () => {
    const submitBtn = wrapper.find('button[type="submit"]')
    expect(submitBtn.attributes('disabled')).toBeDefined()
  })

  it('enables submit button when form is valid', async () => {
    await wrapper.find('input#title').setValue('Valid Title')
    await wrapper.find('input#artist').setValue('Valid Artist')
    await wrapper.find('input#year').setValue(2024)
    await wrapper.find('select#genre').setValue('Modern')

    const submitBtn = wrapper.find('button[type="submit"]')
    expect(submitBtn.attributes('disabled')).toBeUndefined()
  })
})