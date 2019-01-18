<template>
    <button
        class="navigation-button"
        v-on="$listeners"
    >
        {{ text }}
    </button>
</template>

<script>
    export default {
        name: 'NavigationButton',
        props: {
            text: {
                required: true,
                type: String,
            },
        },
    }
</script>

<style lang="scss" scoped>
    .navigation-button {
        height: $day-size;
        width: $day-size;
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
