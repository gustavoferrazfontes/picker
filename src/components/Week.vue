<template functional>
    <div class="trvl-picker-week">
        <span
            v-for="day in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']"
            :key="day"
            class="trvl-picker-week-day"
        >
            {{ day }}
        </span>
    </div>
</template>

<style lang="scss">
    .trvl-picker-week {
        display: flex;

        &-day {
            width: $day-size;
            font-size: 14px;
            text-align: center;
        }
    }
</style>
