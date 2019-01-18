<template>
    <div class="month">
        <header class="month-date">
            {{ dateString }}
        </header>

        <Week />

        <div class="month-days">
            <Spacer
                v-for="spacer in spacers.before"
                :key="`spacer-before-${spacer}`"
            />

            <Day
                v-for="day in days"
                :key="`${day}`"
                :date="day"
            />

            <Spacer
                v-for="spacer in spacers.after"
                :key="`spacer-after-${spacer}`"
            />
        </div>
    </div>
</template>

<script>
    import {
        eachDayOfInterval,
        endOfMonth,
        getDay,
        getYear,
        startOfMonth,
    } from 'date-fns'

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
        props: {
            month: {
                required: true,
                type: Number,
            },
        },
        computed: {
            date() {
                const date = new Date()
                date.setMonth(this.month)

                return date
            },

            dateString() {
                const month = this.firstDay.toLocaleString('en-us', {
                    month: 'long',
                })

                return `${month} ${this.year}`
            },

            days() {
                return eachDayOfInterval({
                    start: this.firstDay,
                    end: this.lastDay,
                })
            },

            firstDay() {
                return startOfMonth(this.date)
            },

            lastDay() {
                return endOfMonth(this.date)
            },

            spacers() {
                const before = Math.max(getDay(this.firstDay) - 1, 0)
                const after = 7 * 6 - this.days.length - before

                return {
                    before,
                    after,
                }
            },

            year() {
                return getYear(this.date)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .month {
        width: $month-size;

        &-date {
            margin-bottom: 24px;
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 0.5px;
            text-align: center;
        }

        &-days {
            display: flex;
            flex-wrap: wrap;
            margin-top: 8px;
        }
    }
</style>
