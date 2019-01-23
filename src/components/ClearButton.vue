<template functional>
    <button
        :class="['trvl-picker-clear', data.staticClass || '']"
        v-bind="data.attrs"
        v-on="listeners"
    >
        Clear
    </button>
</template>

<style lang="scss">
    .trvl-picker-clear {
        padding: 12px 32px 12px 0;
        background-color: #fff;
        color: $gray;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.5px;
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
