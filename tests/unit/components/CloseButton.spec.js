import { shallowMount } from '@vue/test-utils'

import CloseButton from '@/components/CloseButton'

describe('CloseButton.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(CloseButton, {
            attrs: {
                disabled: true,
            },
            slots: {
                default: 'Close',
            },
        })
    })

    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('shows the correct text', () => {
        expect(wrapper.text()).toBe('Close')
    })

    it('passes through attributes', () => {
        expect(wrapper.attributes('disabled')).toBe('disabled')
    })

    it('registers listeners', () => {
        const fn = jest.fn()

        wrapper = shallowMount(CloseButton, {
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
