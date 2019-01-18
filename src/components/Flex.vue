<template>
    <div class="flex">
        <slot />
    </div>
</template>

<script>
    import { Component, Vue } from 'vue-property-decorator'

    @Component
    export default class Flex extends Vue {}
</script>

<style lang="scss" scoped>
    .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
