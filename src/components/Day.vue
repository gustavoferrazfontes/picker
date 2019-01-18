<template>
    <span :class="['day', { past: isBeforeToday }]">
        {{ day }}
    </span>
</template>

<script>
    export default {
        name: 'Day',
        props: {
            date: {
                required: true,
                type: Date,
            },
        },
        computed: {
            day() {
                const day = this.date.toLocaleString('en-us', {
                    day: 'numeric',
                })

                return Number(day)
            },

            isBeforeToday() {
                const today = new Date()
                today.setHours(0, 0, 0, 0)

                return this.date < today
            },
        },
    }
</script>

<style lang="scss" scoped>
    .day {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: $day-size;
        width: $day-size;
        border-radius: 4px;
        border: 1px solid transparent;
        box-sizing: border-box;
        font-size: 16px;
        transition: $transition;
        transition-property: border-color, color;

        &:hover {
            border-color: $blue;
            color: $blue;
            cursor: pointer;
        }

        &.past {
            color: $gray;
            pointer-events: none;
        }
    }
</style>
