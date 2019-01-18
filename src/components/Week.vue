<template>
    <Flex class="week">
        <span
            v-for="day in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']"
            :key="day"
            class="week-day"
        >
            {{ day }}
        </span>
    </Flex>
</template>

<script>
    import { Component, Vue } from 'vue-property-decorator'

    import Flex from './Flex'

    @Component({
        components: {
            Flex,
        },
    })
    export default class Week extends Vue {}
</script>

<style lang="scss" scoped>
    .week {
        width: 274px;

        &-day {
            color: $gray-dark;
            font-size: 14px;
        }
    }
</style>
