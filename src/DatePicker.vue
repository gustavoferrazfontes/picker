<template>
    <div id="app">
        <input class="datepicker-input">
        <input class="datepicker-input">

        <article class="datepicker">
            <Flex>
                <NavigationButton>←</NavigationButton>
                <NavigationButton>→</NavigationButton>
            </Flex>

            <Flex>
                <Week />
                <Week />
            </Flex>

            <Flex class="datepicker-footer">
                <CancelButton class="datepicker-footer-cancel" />
                <ConfirmButton class="datepicker-footer-confirm" />
            </Flex>
        </article>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    // @ts-ignore import/named
    import CancelButton from '@/components/buttons/CancelButton'
    // @ts-ignore import/named
    import ConfirmButton from '@/components/buttons/ConfirmButton'
    // @ts-ignore import/namedx
    import Flex from '@/components/Flex'
    // @ts-ignore import/namedx
    import NavigationButton from '@/components/buttons/NavigationButton'
    // @ts-ignore import/namedx
    import Week from '@/components/Week'

    @Component({
        components: {
            CancelButton,
            ConfirmButton,
            Flex,
            NavigationButton,
            Week,
        },
    })
    export default class DatePicker extends Vue {}
</script>

<style lang="scss" scoped>
    .datepicker {
        padding: 24px;
        width: 658px;
        background-color: #fff;
        border: 1px solid $gray-light;
        border-radius: 8px;
        box-shadow: 0 1px 10px rgba(#000, 0.07);

        &-footer {
            &-cancel {
                margin-left: auto;
            }

            &-confirm {
                margin-left: 40px;
            }
        }
    }
</style>
