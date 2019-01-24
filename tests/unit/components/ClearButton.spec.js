import { shallowMount } from '@vue/test-utils'

import ClearButton from '@/components/ClearButton'

describe('ClearButton.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(ClearButton, {
            attrs: {
                disabled: true,
            },
        })
    })

    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('shows the correct text', () => {
        expect(wrapper.text()).toBe('Clear')
    })

    it('passes through attributes', () => {
        expect(wrapper.attributes('disabled')).toBe('disabled')
    })

    it('registers listeners', () => {
        const fn = jest.fn()

        wrapper = shallowMount(ClearButton, {
            context: {
                on: {
                    click: fn,
                },
            },
        })

        wrapper.trigger('click')

        expect(fn).toHaveBeenCalledTimes(1)
    })
})
