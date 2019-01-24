import { shallowMount } from '@vue/test-utils'

import Day from '@/components/Day'

describe('Day.vue', () => {
    const propsData = {
        checkin: new Date(2019, 2, 13),
        checkout: new Date(2019, 2, 15),
        date: new Date(2019, 2, 14),
        maxCheckout: new Date(2019, 2, 31),
        maxDate: new Date(2019, 2, 31),
        minDate: new Date(2019, 2, 1),
        picker: 'checkin',
    }

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Day, {
            propsData,
        })
    })

    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('shows the correct text', () => {
        expect(wrapper.text()).toBe('14')
    })

    it('indicates when a day equals check-in', () => {
        expect(wrapper.classes()).not.toContain('checkin')

        wrapper.setProps({
            date: propsData.checkin,
        })

        expect(wrapper.classes()).toContain('checkin')
    })

    it('indicates when a day equals check-out', () => {
        expect(wrapper.classes()).not.toContain('checkout')

        wrapper.setProps({
            date: propsData.checkout,
        })

        expect(wrapper.classes()).toContain('checkout')
    })

    it('indicates when a day is in range', () => {
        expect(wrapper.classes()).toContain('range')

        wrapper.setProps({
            date: propsData.checkin,
        })

        expect(wrapper.classes()).not.toContain('range')

        wrapper.setProps({
            date: propsData.checkout,
        })

        expect(wrapper.classes()).not.toContain('range')
    })

    it('indicates when a day equals today', () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        wrapper.setProps({
            date: today,
        })

        expect(wrapper.classes()).toContain('today')
    })

    it('is disabled when outside the min and max dates', () => {
        const minDate = new Date(propsData.minDate)
        minDate.setDate(propsData.minDate.getDate() - 1)

        wrapper.setProps({
            date: minDate,
        })

        expect(wrapper.attributes('disabled')).toBe('disabled')

        const maxDate = new Date(propsData.maxDate)
        maxDate.setDate(propsData.maxDate.getDate() + 1)

        wrapper.setProps({
            date: maxDate,
        })

        expect(wrapper.attributes('disabled')).toBe('disabled')
    })
})
