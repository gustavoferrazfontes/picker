import { shallowMount } from '@vue/test-utils'

import Summary from '@/components/Summary'

describe('Summary.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Summary, {
            propsData: {
                checkin: new Date(2019, 2, 13),
                checkout: new Date(2019, 2, 15),
            },
        })
    })

    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('calculates the number of nights', () => {
        expect(wrapper.vm.nights).toBe(2)

        wrapper.setProps({
            checkout: new Date(2019, 2, 14),
        })

        expect(wrapper.vm.nights).toBe(1)
    })

    it('pluralizes the nights', () => {
        expect(wrapper.text()).toContain('nights')

        wrapper.setProps({
            checkout: new Date(2019, 2, 14),
        })

        expect(wrapper.text()).toContain('night')
        expect(wrapper.text()).not.toContain('nights')
    })

    it('formats the dates', () => {
        expect(wrapper.text()).toContain('Wed, Mar 13')
        expect(wrapper.text()).toContain('Fri, Mar 15')

        wrapper.setProps({
            checkout: new Date(2019, 2, 14),
        })

        expect(wrapper.text()).toContain('Thu, Mar 14')
    })
})
