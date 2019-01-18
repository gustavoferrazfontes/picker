<template>
    <div class="flex">
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'Flex',
    }
</script>

<style lang="scss" scoped>
    .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
