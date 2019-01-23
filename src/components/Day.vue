<template>
    <button
        :class="['trvl-picker-day', {
            checkin: isCheckin,
            checkout: isCheckout,
            range: isInRange,
            today: isToday,
        }]"
        :disabled="isDisabled"
        v-on="$listeners"
    >
        {{ day }}
    </button>
</template>

<script>
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    export default {
        name: 'Day',
        props: {
            checkin: {
                required: true,
                type: Date,
            },
            checkout: {
                required: true,
                type: Date,
            },
            date: {
                required: true,
                type: Date,
            },
            maxCheckout: {
                required: true,
                type: Date,
            },
            maxDate: {
                required: true,
                type: Date,
            },
            minDate: {
                required: true,
                type: Date,
            },
            picker: {
                required: true,
                type: String,
            },
        },
        computed: {
            day() {
                const day = this.date.toLocaleString('en-us', {
                    day: 'numeric',
                })

                return Number(day)
            },

            isCheckin() {
                return this.date.getTime() === this.checkin.getTime()
            },

            isCheckout() {
                return this.date.getTime() === this.checkout.getTime()
            },

            isDisabled() {
                if (this.date < this.minDate || this.date > this.maxDate) return true

                return this.picker === 'checkout'
                    ? this.date < this.checkin || this.date > this.maxCheckout
                    : false
            },

            isInRange() {
                return this.date > this.checkin && this.date < this.checkout
            },

            isToday() {
                return this.date.getTime() === today.getTime()
            },
        },
    }
</script>

<style lang="scss">
    .trvl-picker-day {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: $day-size;
        width: $day-size;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid transparent;
        box-sizing: border-box;
        font-size: 16px;
        transition: $transition;
        transition-property: border-color, color;

        &:focus {
            outline: none;
        }

        &:hover {
            border-color: $blue;
            color: $blue;
            cursor: pointer;
        }

        &.checkin,
        &.checkout {
            background-color: $blue;
            color: #fff;
        }

        &.checkin:not(.checkout) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        &.checkout:not(.checkin) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        &[disabled] {
            color: $gray;
            cursor: not-allowed;

            &:hover {
                border-color: transparent;
            }
        }

        &.range {
            background-color: rgba($blue, 0.1);
            border-radius: 0;
        }

        &.today {
            border-color: $blue;
        }
    }
</style>
