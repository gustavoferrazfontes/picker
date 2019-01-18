<template>
    <button class="cancel-button">
        Clear
    </button>
</template>

<script>
    import { Component, Vue } from 'vue-property-decorator'

    @Component
    export default class CancelButton extends Vue {}
</script>

<style lang="scss" scoped>
    .cancel-button {
        color: $gray;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.5px;
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
