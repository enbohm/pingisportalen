import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Component from '../../views/Links.vue'

describe('Links', () => {
  it('Links page renders properly', () => {
    const wrapper = mount(Component)
    expect(wrapper.text()).toContain('Pingissajter och länkar')
  })
})
