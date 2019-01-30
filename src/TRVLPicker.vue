<template>
    <div :class="['trvl-picker-container', { relative: !vertical }]">
        <button
            v-for="type in ['checkin', 'checkout']"
            :key="type"
            ref="toggles"
            class="trvl-picker-toggle"
            type="button"
            @click="open(type)"
        >
            <slot
                :name="type"
                :is-active="picker === type"
                :value="format(type === 'checkin' ? checkin : checkout)"
            >
                <input
                    :class="{ active: picker === type }"
                    :value="format(type === 'checkin' ? checkin : checkout)"
                    type="text"
                >
            </slot>
        </button>

        <Portal
            :disabled="!hasPortal || !vertical"
            :target-el="`#${portal}`"
        >
            <Transition
                name="fade"
                appear
            >
                <article
                    v-if="picker"
                    ref="picker"
                    :class="['trvl-picker', {
                        single: months === 1 && !vertical,
                        double: months === 2 && !vertical,
                        triple: months === 3 && !vertical,
                        vertical,
                    }]"
                >
                    <header class="trvl-picker-header">
                        <NavigationButton
                            v-if="!vertical"
                            class="trvl-picker-header-previous"
                            :disabled="currentMonth === minDateMonth"
                            @click="goToPreviousMonth"
                        >
                            <slot name="previous">
                                ←
                            </slot>
                        </NavigationButton>

                        <template v-if="vertical">
                            <Week />

                            <CloseButton
                                class="trvl-picker-header-close"
                                @click="close"
                            >
                                <slot name="close">
                                    ✕
                                </slot>
                            </CloseButton>
                        </template>

                        <NavigationButton
                            v-if="!vertical"
                            class="trvl-picker-header-next"
                            @click="goToNextMonth"
                        >
                            <slot name="next">
                                →
                            </slot>
                        </NavigationButton>
                    </header>

                    <div class="trvl-picker-months">
                        <Month
                            v-for="month in (vertical ? totalNumberOfMonths : months)"
                            :key="currentMonth + (month - 1)"
                            class="trvl-picker-months-month"
                            :checkin="selectedCheckin || checkin"
                            :checkout="selectedCheckout || checkout"
                            :max-checkout="maxCheckout"
                            :max-date="maxDate"
                            :min-date="minDate"
                            :month="currentMonth + (month - 1)"
                            :picker="picker"
                            :vertical="vertical"
                            :is-selected-month="checkin.getMonth() === (month - 1)"
                            @select="dateSelected"
                        />
                    </div>

                    <footer class="trvl-picker-footer">
                        <Summary
                            :checkin="selectedCheckin || checkin"
                            :checkout="selectedCheckout || checkout"
                        />

                        <aside class="trvl-picker-footer-buttons">
                            <ClearButton
                                :disabled="!selectedCheckin && !selectedCheckout"
                                @click="clearSelection"
                            />
                            <ApplyButton @click="applySelection" />
                        </aside>
                    </footer>
                </article>
            </Transition>
        </Portal>
    </div>
</template>

<script>
    import { Portal } from 'portal-vue'

    import {
        ApplyButton,
        ClearButton,
        CloseButton,
        Month,
        NavigationButton,
        Summary,
        Week,
    } from './components'

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const oneYearFromNow = new Date(today)
    oneYearFromNow.setYear(today.getFullYear() + 1)

    export default {
        name: 'TRVLPicker',
        components: {
            ApplyButton,
            ClearButton,
            CloseButton,
            Month,
            NavigationButton,
            Portal,
            Summary,
            Week,
        },
        props: {
            breakpointSingle: {
                required: false,
                type: Number,
                default: 580,
            },
            breakpointDouble: {
                required: false,
                type: Number,
                default: 740,
            },
            breakpointTriple: {
                required: false,
                type: Number,
                default: 0,
            },
            checkin: {
                required: true,
                type: Date,
            },
            checkout: {
                required: true,
                type: Date,
            },
            maxDate: {
                required: false,
                type: Date,
                default: () => new Date(oneYearFromNow),
            },
            maxStay: {
                required: false,
                type: Number,
                default: 30,
            },
            minDate: {
                required: false,
                type: Date,
                default: () => new Date(today),
            },
            portal: {
                required: false,
                type: String,
                default: 'portal',
            },
        },
        data() {
            return {
                currentMonth: today.getMonth(),
                hasPortal: !!document.getElementById(this.portal),
                initialMonth: today.getMonth(),
                months: 2,
                picker: null,
                selectedCheckin: null,
                selectedCheckout: null,
                vertical: false,
            }
        },
        computed: {
            maxCheckout() {
                const checkin = this.selectedCheckin || this.checkin
                const maxCheckout = new Date(checkin)
                maxCheckout.setDate(checkin.getDate() + this.maxStay)

                return maxCheckout
            },

            minDateMonth() {
                return this.minDate.getMonth()
            },

            totalNumberOfMonths() {
                return this.maxDate.getMonth() - this.minDate.getMonth()
                    + 12 * (this.maxDate.getFullYear() - this.minDate.getFullYear())
            },
        },
        watch: {
            picker: 'toggleEventListeners',
        },
        mounted() {
            this.setMonths()

            if (!this.vertical) this.currentMonth = this.checkin.getMonth()
        },
        methods: {
            applySelection() {
                this.$emit('update:checkin', this.selectedCheckin || this.checkin)
                this.$emit('update:checkout', this.selectedCheckout || this.checkout)

                this.initialMonth = (this.selectedCheckin || this.checkin).getMonth()

                this.clearSelection()
                this.close()
            },

            clearSelection() {
                if (!this.vertical) this.currentMonth = this.initialMonth

                this.picker = 'checkin'
                this.selectedCheckin = null
                this.selectedCheckout = null
            },

            close() {
                this.$emit('close')

                this.picker = null
            },

            dateSelected(date) {
                if (this.picker === 'checkin') this.selectedCheckin = date
                else if (this.picker === 'checkout') this.selectedCheckout = date

                const checkout = this.selectedCheckout || this.checkout

                const checkoutIsAfterMaxCheckout = checkout > this.maxCheckout
                const dateIsAfterCheckout = date > checkout

                if (checkoutIsAfterMaxCheckout || dateIsAfterCheckout) {
                    const tomorrow = new Date(date)
                    tomorrow.setDate(date.getDate() + 1)

                    this.selectedCheckout = tomorrow
                }

                this.picker = 'checkout'
            },

            format(date) {
                return date.toLocaleDateString()
            },

            goToNextMonth() {
                this.currentMonth += 1
            },

            goToPreviousMonth() {
                this.currentMonth -= 1
            },

            handleClickOutside(e) {
                const isNotInside = element => e.target !== element && !element.contains(e.target)

                if (isNotInside(this.$refs.picker) && this.$refs.toggles.every(isNotInside)) {
                    this.close()
                }
            },

            handleKeyDown(e) {
                if (['ArrowLeft', 'Left', 'h'].includes(e.key)) {
                    this.goToPreviousMonth()
                } else if (['ArrowRight', 'Right', 'l'].includes(e.key)) {
                    this.goToNextMonth()
                } else if (['Enter'].includes(e.key)) {
                    this.applySelection()
                } else if (['Escape'].includes(e.key)) {
                    this.clearSelection()
                    this.close()
                }
            },

            open(picker = 'checkin') {
                if (this.picker === picker) {
                    this.close()

                    return
                }

                this.$emit('open')

                this.picker = picker
            },

            setMonths() {
                const width = window.innerWidth

                if (this.breakpointTriple && width >= this.breakpointTriple) this.months = 3
                else if (width >= this.breakpointDouble) this.months = 2
                else if (width >= this.breakpointSingle) this.months = 1
                else this.vertical = true
            },

            toggleEventListeners() {
                if (this.picker) {
                    document.body.addEventListener('click', this.handleClickOutside)
                    document.body.addEventListener('keydown', this.handleKeyDown)
                } else {
                    document.body.removeEventListener('click', this.handleClickOutside)
                    document.body.removeEventListener('keydown', this.handleKeyDown)
                }
            },
        },
    }
</script>

<style lang="scss">
    .trvl-picker {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        background-color: #fff;
        box-sizing: border-box;
        color: $gray-dark;
        font-family: proxima-nova;
        z-index: 1;

        &.single,
        &.double,
        &.triple {
            top: calc(100% + 8px);
            border: 1px solid $gray-light;
            border-radius: 8px;
            box-shadow: 0 1px 10px rgba(#000, 0.07);
            overflow: hidden;
        }

        $month-width: calc(
            #{$day-size} * 7
            + 16px * 2
            + 2px
        );

        &.single {
            width: calc(#{$month-width} * 1);
        }

        &.double {
            width: calc(#{$month-width} * 2);
        }

        &.triple {
            width: calc(#{$month-width} * 3);
        }

        &-container {
            &.relative {
                position: relative;
            }
        }

        &-toggle {
            padding: 0;
            width: 50%;
            background-color: transparent;
            border: none;
            cursor: pointer;

            &:focus {
                outline: none;
            }

            * {
                pointer-events: none;
            }
        }

        &-header,
        &-months,
        &-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &-header {
            position: sticky;
            top: 0;
            justify-content: center;
            padding: 48px 0 16px;
            background-color: #fff;
            border-bottom: 1px solid $gray-light;

            .single &,
            .double &,
            .triple & {
                justify-content: space-between;
                padding: 24px 0 0 0;
                border-bottom: none;
            }

            &-close {
                position: absolute;
                top: 4px;
                right: 20px;
            }

            &-previous,
            &-next {
                position: absolute;
                top: 12px;
            }

            &-previous {
                left: 16px;
            }

            &-next {
                right: 16px;
            }
        }

        &-months {
            flex-direction: column;
            width: calc(#{$month-width} * 1);
            margin: 0 auto;

            .single &,
            .double &,
            .triple & {
                flex-direction: row;
                width: auto;
            }

            &-month {
                padding: 0 16px;
            }
        }

        &-footer {
            position: sticky;
            bottom: 0;
            flex-direction: column;
            padding: 24px;
            background-color: #fff;
            border-top: 1px solid $gray-light;

            .single &,
            .double &,
            .triple & {
                border-top: none;
            }

            .double &,
            .triple & {
                flex-direction: row;
                padding-top: 40px;
            }

            &-buttons {
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin-top: 16px;

                .double &,
                .triple & {
                    width: auto;
                    margin-top: 0;
                }
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: $transition;
        transition-property: opacity, transform;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-8px);
    }
</style>
