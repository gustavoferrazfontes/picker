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
                const currentDate = this.firstDay
                const days = []

                while (this.firstDay <= this.lastDay) {
                    days.push(new Date(currentDate.getTime()))

                    currentDate.setDate(currentDate.getDate() + 1)
                }

                return days
            },

            firstDay() {
                return new Date(this.date.getFullYear(), this.date.getMonth())
            },

            lastDay() {
                return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
            },

            spacers() {
                const before = Math.max(this.firstDay.getDay() - 1, 0)
                const after = 7 * 6 - this.days.length - before

                return {
                    before,
                    after,
                }
            },

            year() {
                return this.date.getFullYear()
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
