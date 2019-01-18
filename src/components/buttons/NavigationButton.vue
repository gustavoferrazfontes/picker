<template>
    <button class="navigation-button">
        <slot />
    </button>
</template>

<script>
    import { Component, Vue } from 'vue-property-decorator'

    @Component
    export default class NavigationButton extends Vue {}
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
