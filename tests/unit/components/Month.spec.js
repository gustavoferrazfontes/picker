import { shallowMount } from '@vue/test-utils'

// import Day from '@/components/Day'
import Month from '@/components/Month'
import Spacer from '@/components/Spacer'

describe('Month.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Month, {
            propsData: {
                month: 2,
                vertical: false,
            },

            // Remove below and uncomment Days test after the fix of
            // https://github.com/vuejs/vue-test-utils/issues/965
            stubs: {
                Day: {
                    template: '<span />',
                },
            },
        })
    })

    it('renders', () => {
        expect(true).toBe(true)
    })

    it('shows the month name', () => {
        expect(wrapper.text()).toBe('March 2019')
    })

    // it('shows the correct number of Days', () => {
    //     expect(wrapper.findAll(Day)).toHaveLength(31)

    //     wrapper.setProps({
    //         month: 1,
    //     })

    //     expect(wrapper.findAll(Day)).toHaveLength(28)
    // })

    it('shows the correct number of Spacers', () => {
        expect(wrapper.findAll(Spacer)).toHaveLength(11)

        wrapper.setProps({
            vertical: true,
        })

        expect(wrapper.findAll(Spacer)).toHaveLength(4)

        wrapper.setProps({
            month: 1,
            vertical: false,
        })

        expect(wrapper.findAll(Spacer)).toHaveLength(14)
    })

    it('pads the days with spacers', () => {
        expect(wrapper.vm.spacers.before).toBe(4)
        expect(wrapper.vm.spacers.after).toBe(7)

        wrapper.setProps({
            month: 0,
        })

        expect(wrapper.vm.spacers.before).toBe(1)
        expect(wrapper.vm.spacers.after).toBe(10)
    })
})
