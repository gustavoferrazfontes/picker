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
                    :class="['demo', { active: isActive }]"
                >
                    <label
                        :for="type"
                        class="demo-label"
                    >
                        Check {{ type === 'checkin' ? 'in' : 'out' }}
                    </label>
                    <input
                        :id="type"
                        class="demo-input"
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
    import TRVLPicker from '@/picker/TRVLPicker'

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
    /deep/ .picker-toggle {
        width: auto;

        + .picker-toggle {
            margin-left: 8px;
        }
    }

    .demo {
        display: flex;
        flex-direction: column;
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
