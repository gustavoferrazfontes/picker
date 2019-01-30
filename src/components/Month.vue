<template>
    <div
        ref="month"
        :class="['trvl-picker-month', { vertical }]"
    >
        <header class="trvl-picker-month-date">
            {{ dateString }}
        </header>

        <Week v-if="!vertical" />

        <div class="trvl-picker-month-days">
            <Spacer
                v-for="spacer in spacers.before"
                :key="`spacer-before-${spacer}`"
            />

            <Day
                v-for="date in dates"
                :key="`${date}`"
                v-bind="$attrs"
                :date="date"
                @click="$emit('select', date)"
            />

            <template v-if="!vertical">
                <Spacer
                    v-for="spacer in spacers.after"
                    :key="`spacer-after-${spacer}`"
                />
            </template>
        </div>
    </div>
</template>

<script>
    import Day from './Day'
    import Spacer from './Spacer'
    import Week from './Week'

    export default {
        name: 'Month',
        components: {
            Day,
            Spacer,
            Week,
        },
        inheritAttrs: false,
        props: {
            month: {
                required: true,
                type: Number,
            },
            isSelectedMonth: {
                required: true,
                type: Boolean,
            },
            vertical: {
                required: true,
                type: Boolean,
            },
        },
        computed: {
            dateString() {
                const year = this.normalizedDate.getFullYear()
                const month = this.startOfMonth.toLocaleString('en-us', {
                    month: 'long',
                })

                return `${month} ${year}`
            },

            dates() {
                const currentDate = this.startOfMonth
                const dates = []

                while (this.startOfMonth <= this.endOfMonth) {
                    dates.push(new Date(currentDate.getTime()))

                    currentDate.setDate(currentDate.getDate() + 1)
                }

                return dates
            },

            endOfMonth() {
                return new Date(
                    this.normalizedDate.getFullYear(),
                    this.normalizedDate.getMonth() + 1, 0,
                )
            },

            normalizedDate() {
                const normalizedDate = new Date()
                normalizedDate.setDate(1) // Set to day 1 to avoid forward
                normalizedDate.setMonth(this.month)

                return normalizedDate
            },

            spacers() {
                const before = Math.max(this.startOfMonth.getDay() - 1, 0)
                const after = 7 * 6 - this.dates.length - before

                return {
                    before,
                    after,
                }
            },

            startOfMonth() {
                return new Date(
                    this.normalizedDate.getFullYear(),
                    this.normalizedDate.getMonth(),
                )
            },
        },
        mounted() {
            if (this.isSelectedMonth && this.vertical) {
                const pickerHeaderHeight = document.querySelector('.trvl-picker-header').clientHeight
                window.scrollTo(0, this.$refs.month.offsetTop - pickerHeaderHeight - 16)
            }
        },
    }
</script>

<style lang="scss">
    .trvl-picker-month {
        &.vertical {
            margin-top: 16px;
        }

        &-date {
            margin-bottom: 24px;
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 0.5px;
            text-align: center;

            .vertical & {
                margin-bottom: 16px;
            }
        }

        &-days {
            display: flex;
            flex-wrap: wrap;
            margin-top: 8px;
        }
    }
</style>
