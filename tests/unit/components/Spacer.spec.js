import { shallowMount } from '@vue/test-utils'

import Spacer from '@/components/Spacer'

describe('Spacer.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Spacer)
    })

    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('is empty', () => {
        expect(wrapper.isEmpty()).toBe(true)
    })
})
