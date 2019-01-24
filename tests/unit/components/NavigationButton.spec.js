import { shallowMount } from '@vue/test-utils'

import NavigationButton from '@/components/NavigationButton'

describe('NavigationButton.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(NavigationButton, {
            attrs: {
                disabled: true,
            },
            slots: {
                default: 'Next',
            },
        })
    })

    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('shows the correct text', () => {
        expect(wrapper.text()).toBe('Next')
    })

    it('passes through attributes', () => {
        expect(wrapper.attributes('disabled')).toBe('disabled')
    })

    it('registers listeners', () => {
        const fn = jest.fn()

        wrapper = shallowMount(NavigationButton, {
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
