<template functional>
    <button
        :class="['trvl-picker-close', data.staticClass || '']"
        v-bind="data.attrs"
        v-on="listeners"
    >
        <slot />
    </button>
</template>

<style lang="scss">
    .trvl-picker-close {
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
