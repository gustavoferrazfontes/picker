<template>
    <button
        class="cancel-button"
        v-on="$listeners"
    >
        Clear
    </button>
</template>

<style lang="scss" scoped>
    .cancel-button {
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
