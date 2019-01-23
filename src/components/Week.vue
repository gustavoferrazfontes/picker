<template functional>
    <div class="week">
        <span
            v-for="day in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']"
            :key="day"
            class="week-day"
        >
            {{ day }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .week {
        display: flex;

        &-day {
            width: $day-size;
            font-size: 14px;
            text-align: center;
        }
    }
</style>
