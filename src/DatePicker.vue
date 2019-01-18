<template>
    <div id="app">
        <input class="datepicker-input">
        <input class="datepicker-input">

        <article class="datepicker">
            <header class="datepicker-header">
                <NavigationButton
                    class="datepicker-header-previous"
                    text="←"
                    :disabled="currentMonth === initialMonth"
                    @click="goToPreviousMonth"
                />

                <NavigationButton
                    class="datepicker-header-next"
                    text="→"
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

                <CancelButton
                    class="datepicker-footer-cancel"
                    :disabled="!selectedCheckin && !selectedCheckout"
                    @click="clearSelection"
                />
                <ConfirmButton
                    class="datepicker-footer-confirm"
                    @click="applySelection"
                />
            </footer>
        </article>
    </div>
</template>

<script>
    import CancelButton from '@/components/buttons/CancelButton'
    import ConfirmButton from '@/components/buttons/ConfirmButton'
    import Month from '@/components/Month'
    import NavigationButton from '@/components/buttons/NavigationButton'
    import Summary from '@/components/Summary'

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    export default {
        name: 'DatePicker',
        components: {
            CancelButton,
            ConfirmButton,
            Month,
            NavigationButton,
            Summary,
        },
        data() {
            return {
                checkin: today,
                checkout: new Date(2019, 0, 20),
                currentMonth: today.getMonth(),
                initialMonth: today.getMonth(),
                picker: 'checkin',
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
                this.checkin = this.selectedCheckin
                this.checkout = this.selectedCheckout

                this.clearSelection()
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

                this.picker = this.picker === 'checkin' ? 'checkout' : 'checkin'
            },

            goToNextMonth() {
                this.currentMonth += 1
            },

            goToPreviousMonth() {
                this.currentMonth -= 1
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
        color: $gray-dark;
        font-family: proxima-nova;

        &-header,
        &-months,
        &-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &-header {
            position: relative;

            &-previous,
            &-next {
                position: absolute;
                top: -12px;
            }

            &-previous {
                left: 0;
            }

            &-next {
                right: 0;
            }
        }

        &-footer {
            margin-top: 40px;
            padding: 0 8px;

            &-cancel {
                margin-left: auto;
            }

            &-confirm {
                margin-left: 40px;
            }
        }
    }
</style>
