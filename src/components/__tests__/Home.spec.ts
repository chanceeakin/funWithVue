import { describe, it } from 'vitest'

describe('Home', () => {
  it.todo('renders properly', () => {
    // this test errors because of the canvas element and associated limitations with testing canvas elements in JSDOM.
    // https://github.com/vitest-dev/vitest/issues/3025
    // Vitest errored when I attempted to introduce threads: false to the vitest.config.ts.
    // const wrapper = mount(Home, {})
    // expect(wrapper.text()).toContain('Live Spectrograph Analysis')
  })
})
