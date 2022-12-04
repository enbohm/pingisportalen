import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Component from '../../views/SwedenTour.vue'

describe('SwedentTour', () => {
  it('Sweden page renders properly', () => {
    const wrapper = mount(Component)
    expect(wrapper.text()).toContain('Sweden Tour är samlingsnamnet för svenska elittävlingar')
  })
})
