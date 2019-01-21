<template>
    <div>
        <button
            v-for="type in ['checkin', 'checkout']"
            :key="type"
            class="trvl-picker-toggle"
            @click="pick(type)"
        >
            <slot
                :name="type"
                :is-active="picker === type"
                :value="format(type === 'checkin' ? checkin : checkout)"
            />
        </button>

        <article
            :class="['trvl-picker', {
                single: months === 1,
                double: months === 2,
                triple: months === 3,
                vertical,
            }]"
        >
            <header class="trvl-picker-header">
                <NavigationButton
                    v-if="!vertical"
                    class="trvl-picker-header-previous"
                    direction="left"
                    :disabled="currentMonth === initialMonth"
                    @click="goToPreviousMonth"
                />

                <Week v-if="vertical" />

                <NavigationButton
                    v-if="!vertical"
                    class="trvl-picker-header-next"
                    direction="right"
                    @click="goToNextMonth"
                />
            </header>

            <div class="trvl-picker-months">
                <Month
                    v-for="month in (vertical ? totalNumberOfMonths : months)"
                    :key="month"
                    :checkin="selectedCheckin || checkin"
                    :checkout="selectedCheckout || checkout"
                    :max-checkout="maxCheckout"
                    :max-date="maxDate"
                    :min-date="minDate"
                    :month="currentMonth + (month - 1)"
                    :picker="picker"
                    :vertical="vertical"
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
    </div>
</template>

<script>
    import {
        ApplyButton,
        ClearButton,
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
            Month,
            NavigationButton,
            Summary,
            Week,
        },
        props: {
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
        },
        data() {
            return {
                currentMonth: today.getMonth(),
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

            totalNumberOfMonths() {
                return this.maxDate.getMonth() - this.minDate.getMonth()
                    + 12 * (this.maxDate.getFullYear() - this.minDate.getFullYear())
            },
        },
        methods: {
            applySelection() {
                this.$emit('update:checkin', this.selectedCheckin || this.checkin)
                this.$emit('update:checkout', this.selectedCheckout || this.checkout)

                this.clearSelection()

                this.picker = null
            },

            clearSelection() {
                this.currentMonth = this.initialMonth
                this.picker = 'checkin'
                this.selectedCheckin = null
                this.selectedCheckout = null
            },

            dateSelected(date) {
                if (this.picker === 'checkin') this.selectedCheckin = date
                else if (this.picker === 'checkout') this.selectedCheckout = date

                const checkout = this.selectedCheckout || this.checkout
                const checkoutIsAfterMaxCheckout = checkout > this.maxCheckout
                const dateIsAfterCheckout = date > checkout

                if (checkoutIsAfterMaxCheckout || dateIsAfterCheckout) {
                    this.selectedCheckout = date
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

            pick(picker) {
                if (this.picker === picker) this.picker = null
                else this.picker = picker
            },
        },
    }
</script>

<style lang="scss" scoped>
    .trvl-picker {
        padding: 0 16px 0;
        background-color: #fff;
        border: 1px solid $gray-light;
        border-radius: 8px;
        box-shadow: 0 1px 10px rgba(#000, 0.07);
        box-sizing: border-box;
        color: $gray-dark;
        font-family: proxima-nova;

        $borders-width: 2px;
        $month-gap: 32px;
        $padding-width: calc(16px * 2);

        &.single {
            width: calc(
                #{$day-size} * 7
                + #{$padding-width}
                + #{$borders-width}
            );
        }

        &.double {
            width: calc(
                #{$day-size} * 14
                + #{$padding-width} * 2
                + #{$borders-width}
                + #{$month-gap}
            );
        }

        &.triple {
            width: calc(
                #{$day-size} * 21
                + #{$padding-width} * 3
                + #{$borders-width}
                + #{$month-gap} * 2
            );
        }

        &.vertical {
            width: calc(
                #{$day-size} * 7
                + #{$padding-width}
                + #{$borders-width}
            );
        }

        &-toggle {
            padding: 0;
            background-color: transparent;
            border: none;

            & + & {
                margin-left: 8px;
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
            padding-top: 24px;
            background-color: #fff;

            .vertical & {
                justify-content: center;
                padding-bottom: 8px;
                border-bottom: 1px solid $gray-light;
            }

            /deep/ &-previous,
            /deep/ &-next {
                position: absolute;
                top: 12px;
            }

            /deep/ &-previous {
                left: 0;
            }

            /deep/ &-next {
                right: 0;
            }
        }

        &-months {
            .vertical & {
                flex-direction: column;
            }
        }

        &-footer {
            position: sticky;
            bottom: 0;
            padding: 0 8px 24px;
            background-color: #fff;

            .single & {
                flex-direction: column;
            }

            .double &,
            .triple & {
                flex-direction: row;
                margin-top: 40px;
            }

            .vertical & {
                flex-direction: column;
                border-top: 1px solid $gray-light;
            }

            &-buttons {
                display: flex;
                justify-content: space-between;

                .single & {
                    width: 100%;
                }

                .double &,
                .triple & {
                    width: auto;
                }
            }
        }
    }
</style>
