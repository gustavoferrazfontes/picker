<template functional>
    <button
        :class="['navigation-button', data.staticClass || '']"
        v-bind="data.attrs"
        v-on="listeners"
    >
        <template v-if="props.direction === 'left'">
            ←
        </template>
        <template v-if="props.direction === 'right'">
            →
        </template>
    </button>
</template>

<script>
    export default {
        props: {
            direction: {
                required: true,
                type: String,
                validator(direction) {
                    return ['left', 'right'].includes(direction)
                },
            },
        },
    }
</script>

<style lang="scss" scoped>
    .navigation-button {
        height: $day-size;
        width: $day-size;
        background-color: #fff;
        color: $gray;
        font-size: 22px;
        border: none;
        cursor: pointer;
        transition: color $transition;

        &:focus {
            outline: none;
        }

        &:hover {
            color: $blue;
        }

        &[disabled] {
            color: $gray-light;
            cursor: not-allowed;
        }
    }
</style>
