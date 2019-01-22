<template functional>
    <button
        :class="['close-button', data.staticClass || '']"
        v-bind="data.attrs"
        v-on="listeners"
    >
        <slot />
    </button>
</template>

<style lang="scss" scoped>
    .close-button {
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
