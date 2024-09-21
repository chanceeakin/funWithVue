import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import About from '../../views/AboutView.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(About, {})
    expect(wrapper.text()).toContain('About')
  })
})
