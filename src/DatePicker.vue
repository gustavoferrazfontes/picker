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
                <Month :month="currentMonth" />
                <Month :month="currentMonth + 1" />
            </div>

            <footer class="datepicker-footer">
                <CancelButton class="datepicker-footer-cancel" />
                <ConfirmButton class="datepicker-footer-confirm" />
            </footer>
        </article>
    </div>
</template>

<script>
    import CancelButton from '@/components/buttons/CancelButton'
    import ConfirmButton from '@/components/buttons/ConfirmButton'
    import Month from '@/components/Month'
    import NavigationButton from '@/components/buttons/NavigationButton'

    const today = new Date()

    export default {
        name: 'DatePicker',
        components: {
            CancelButton,
            ConfirmButton,
            Month,
            NavigationButton,
        },
        data() {
            return {
                currentMonth: today.getMonth(),
                initialMonth: today.getMonth(),
            }
        },
        methods: {
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
