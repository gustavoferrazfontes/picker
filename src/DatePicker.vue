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

<script>
    import CancelButton from '@/components/buttons/CancelButton'
    import ConfirmButton from '@/components/buttons/ConfirmButton'
    import Flex from '@/components/Flex'
    import NavigationButton from '@/components/buttons/NavigationButton'
    import Week from '@/components/Week'

    export default {
        name: 'DatePicker',
        components: {
            CancelButton,
            ConfirmButton,
            Flex,
            NavigationButton,
            Week,
        },
    }
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
