import { shallowMount } from '@vue/test-utils'

import ApplyButton from '@/components/ApplyButton'

describe('ApplyButton.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(ApplyButton, {
            attrs: {
                disabled: true,
            },
        })
    })

    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('shows the correct text', () => {
        expect(wrapper.text()).toBe('Apply')
    })

    it('passes through attributes', () => {
        expect(wrapper.attributes('disabled')).toBe('disabled')
    })

    it('registers listeners', () => {
        const fn = jest.fn()

        wrapper = shallowMount(ApplyButton, {
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
