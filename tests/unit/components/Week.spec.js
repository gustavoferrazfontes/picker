import { shallowMount } from '@vue/test-utils'

import Week from '@/components/Week'

describe('Week.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Week)
    })

    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('shows 7 days', () => {
        const days = wrapper.findAll('* > *')

        expect(days).toHaveLength(7)
    })
})
