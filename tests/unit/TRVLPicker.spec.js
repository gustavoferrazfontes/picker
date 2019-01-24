import { shallowMount } from '@vue/test-utils'

import TRVLPicker from '@/TRVLPicker'

describe('TRVLPicker.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(TRVLPicker, {
            propsData: {
                checkin: new Date(2019, 2, 13),
                checkout: new Date(2019, 2, 15),
            },
        })
    })

    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('toggles when clicking the buttons', () => {
        const buttons = wrapper.findAll({ ref: 'toggles' })
        const checkinButton = buttons.at(0)
        const checkoutButton = buttons.at(1)

        checkinButton.trigger('click')
        expect(wrapper.vm.picker).toBe('checkin')

        checkinButton.trigger('click')
        expect(wrapper.vm.picker).toBe(null)

        checkoutButton.trigger('click')
        expect(wrapper.vm.picker).toBe('checkout')

        checkoutButton.trigger('click')
        expect(wrapper.vm.picker).toBe(null)
    })

    it('opens by calling the `open` method', () => {
        wrapper.vm.open('checkin')
        expect(wrapper.vm.picker).toBe('checkin')

        wrapper.vm.open('checkout')
        expect(wrapper.vm.picker).toBe('checkout')

        wrapper.vm.open()
        expect(wrapper.vm.picker).toBe('checkin')
    })

    it('closes by calling the `close` method', () => {
        wrapper.setData({
            picker: 'checkin',
        })

        wrapper.vm.close()

        expect(wrapper.vm.picker).toBe(null)
    })

    it('emits an event upon opening', () => {
        const fn = jest.fn()

        wrapper.vm.$on('open', fn)
        wrapper.vm.open()

        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('emits an event upon closing', () => {
        const fn = jest.fn()

        wrapper.vm.$on('close', fn)
        wrapper.vm.close()

        expect(fn).toHaveBeenCalledTimes(1)
    })
})
