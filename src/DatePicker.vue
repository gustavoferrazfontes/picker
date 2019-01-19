<template>
    <div id="app">
        <input
            :class="['datepicker-input', {
                active: picker === 'checkin',
            }]"
            :value="format(checkin)"
            readonly
            @click="pick('checkin')"
        >
        <input
            :class="['datepicker-input', {
                active: picker === 'checkout',
            }]"
            :value="format(checkout)"
            readonly
            @click="pick('checkout')"
        >

        <article class="datepicker">
            <header class="datepicker-header">
                <NavigationButton
                    class="datepicker-header-previous"
                    direction="left"
                    :disabled="currentMonth === initialMonth"
                    @click="goToPreviousMonth"
                />

                <NavigationButton
                    class="datepicker-header-next"
                    direction="right"
                    @click="goToNextMonth"
                />
            </header>

            <div class="datepicker-months">
                <Month
                    :checkin="selectedCheckin || checkin"
                    :checkout="selectedCheckout || checkout"
                    :last-possible-date="lastPossibleDate"
                    :month="currentMonth"
                    :picker="picker"
                    @select="dateSelected"
                />

                <Month
                    :checkin="selectedCheckin || checkin"
                    :checkout="selectedCheckout || checkout"
                    :last-possible-date="lastPossibleDate"
                    :month="currentMonth + 1"
                    :picker="picker"
                    @select="dateSelected"
                />
            </div>

            <footer class="datepicker-footer">
                <Summary
                    :checkin="selectedCheckin || checkin"
                    :checkout="selectedCheckout || checkout"
                />

                <aside class="datepicker-footer-buttons">
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
    import ApplyButton from '@/components/buttons/ApplyButton'
    import ClearButton from '@/components/buttons/ClearButton'
    import Month from '@/components/Month'
    import NavigationButton from '@/components/buttons/NavigationButton'
    import Summary from '@/components/Summary'

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    export default {
        name: 'DatePicker',
        components: {
            ApplyButton,
            ClearButton,
            Month,
            NavigationButton,
            Summary,
        },
        data() {
            return {
                checkin: today,
                checkout: new Date(2019, 0, 21),
                currentMonth: today.getMonth(),
                initialMonth: today.getMonth(),
                picker: null,
                selectedCheckin: null,
                selectedCheckout: null,
            }
        },
        computed: {
            lastPossibleDate() {
                const checkin = this.selectedCheckin || this.checkin
                const lastPossibleDate = new Date(checkin)
                lastPossibleDate.setDate(checkin.getDate() + 30)

                return lastPossibleDate
            },
        },
        methods: {
            applySelection() {
                this.checkin = this.selectedCheckin || this.checkin
                this.checkout = this.selectedCheckout || this.checkout

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
                const checkoutIsAfterLastPossibleDate = checkout > this.lastPossibleDate
                const dateIsAfterCheckout = date > checkout

                if (checkoutIsAfterLastPossibleDate || dateIsAfterCheckout) {
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
    .datepicker {
        padding: 24px 16px;
        width: 658px;
        background-color: #fff;
        border: 1px solid $gray-light;
        border-radius: 8px;
        box-shadow: 0 1px 10px rgba(#000, 0.07);
        box-sizing: border-box;
        color: $gray-dark;
        font-family: proxima-nova;

        &-input {
            &:focus {
                outline: none;
            }

            &.active {
                border: 1px solid $blue;
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
            position: relative;

            /deep/ &-previous,
            /deep/ &-next {
                position: absolute;
                top: -12px;
            }

            /deep/ &-previous {
                left: 0;
            }

            /deep/ &-next {
                right: 0;
            }
        }

        &-footer {
            margin-top: 40px;
            padding: 0 8px;
        }
    }
</style>
