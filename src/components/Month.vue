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
                v-for="date in dates"
                :key="`${date}`"
                :checkin="checkin"
                :checkout="checkout"
                :date="date"
                @click="$emit('select', date)"
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
            checkin: {
                required: true,
                type: Date,
            },
            checkout: {
                required: true,
                type: Date,
            },
            month: {
                required: true,
                type: Number,
            },
        },
        computed: {
            dateString() {
                const month = this.firstDay.toLocaleString('en-us', {
                    month: 'long',
                })

                return `${month} ${this.year}`
            },

            dates() {
                const currentDate = this.firstDay
                const dates = []

                while (this.firstDay <= this.lastDay) {
                    dates.push(new Date(currentDate.getTime()))

                    currentDate.setDate(currentDate.getDate() + 1)
                }

                return dates
            },

            firstDay() {
                return new Date(this.normalizedDate.getFullYear(), this.normalizedDate.getMonth())
            },

            lastDay() {
                return new Date(
                    this.normalizedDate.getFullYear(),
                    this.normalizedDate.getMonth() + 1, 0,
                )
            },

            normalizedDate() {
                const normalizedDate = new Date()
                normalizedDate.setMonth(this.month)

                return normalizedDate
            },

            spacers() {
                const before = Math.max(this.firstDay.getDay() - 1, 0)
                const after = 7 * 6 - this.dates.length - before

                return {
                    before,
                    after,
                }
            },

            year() {
                return this.normalizedDate.getFullYear()
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
