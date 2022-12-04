import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Component from '../../views/Home.vue'

describe('Home', () => {
  it('Home page renders properly', () => {
    const wrapper = mount(Component)
    expect(wrapper.text()).toContain('Välkommen till Pingisportalen!')
  })
})
