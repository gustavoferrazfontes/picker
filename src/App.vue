<template>
    <div id="app">
        <TRVLPicker
            :checkin.sync="checkin"
            :checkout.sync="checkout"
        >
            <template
                v-for="type in ['checkin', 'checkout']"
                :slot="type"
                slot-scope="{ isActive, value }"
            >
                <div
                    :key="type"
                    :class="['picker', { active: isActive }]"
                >
                    <label
                        :for="type"
                        class="picker-label"
                    >
                        Check {{ type === 'checkin' ? 'in' : 'out' }}
                    </label>
                    <input
                        :id="type"
                        class="picker-input"
                        type="text"
                        :value="value"
                        readonly
                    >
                </div>
            </template>
        </TRVLPicker>
    </div>
</template>

<script>
    import TRVLPicker from '@/trvl-picker/TRVLPicker'

    export default {
        name: 'App',
        components: {
            TRVLPicker,
        },
        data() {
            return {
                checkin: new Date(2019, 0, 25),
                checkout: new Date(2019, 0, 27),
            }
        },
    }
</script>

<style lang="scss" scoped>
    .picker {
        display: flex;
        flex-direction: column;
        margin-bottom: 8px;
        border: 1px solid $gray-light;
        border-radius: 8px;
        padding: 8px 16px;
        transition: border-color $transition;

        &.active {
            border-color: $blue;
        }

        &-label {
            margin-bottom: 2px;
            color: $gray;
            font-size: 13px;
            font-weight: 600;
            text-align: left;
            transition: color $transition;

            .active & {
                color: $blue;
            }
        }

        &-input {
            padding: 0;
            border: none;
            font-size: 15px;

            &:focus {
                outline: none;
            }
        }
    }
</style>
