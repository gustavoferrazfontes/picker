<template>
    <button class="cancel-button">
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
    }
</style>
