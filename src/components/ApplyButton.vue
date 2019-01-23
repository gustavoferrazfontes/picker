<template functional>
    <button
        :class="['trvl-picker-apply', data.staticClass || '']"
        v-bind="data.attrs"
        v-on="listeners"
    >
        Apply
    </button>
</template>

<style lang="scss">
    .trvl-picker-apply {
        padding: 12px 32px;
        background-color: $pink;
        border-radius: 8px;
        color: #fff;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.5px;
        border: none;
        cursor: pointer;
        transition: background-color $transition;

        &:focus {
            outline: none;
        }

        &:hover {
            background-color: lighten($pink, 10);
        }
    }
</style>
