<template>
    <button class="navigation-button">
        <slot />
    </button>
</template>

<script>
    export default {
        name: 'NavigationButton',
    }
</script>

<style lang="scss" scoped>
    .navigation-button {
        height: 32px;
        width: 32px;
        color: $gray;
        font-size: 18px;
        border: none;
        cursor: pointer;
        transition: color 0.2s ease-out;

        &:focus {
            outline: none;
        }

        &:hover {
            color: $blue;
        }
    }
</style>
