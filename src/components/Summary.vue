<template>
    <p class="trvl-picker-summary">
        {{ format(checkin) }} - {{ format(checkout) }}

        <span class="trvl-picker-summary-nights">
            {{ nights }} {{ nights === 1 ? 'night' : 'nights' }}
        </span>
    </p>
</template>

<script>
    export default {
        name: 'Summary',
        props: {
            checkin: {
                required: true,
                type: Date,
            },
            checkout: {
                required: true,
                type: Date,
            },
        },
        computed: {
            nights() {
                return Math.ceil((this.checkout - this.checkin) / (1000 * 60 * 60 * 24))
            },
        },
        methods: {
            format(date) {
                return date.toLocaleDateString('en-us', {
                    day: 'numeric',
                    month: 'short',
                    weekday: 'short',
                })
            },
        },
    }
</script>

<style lang="scss">
    .trvl-picker-summary {
        margin: 0;
        font-size: 15px;
        font-weight: 600;

        &-nights {
            margin-left: 8px;
            color: $gray;
            font-size: 13px;
            font-weight: normal;
        }
    }
</style>
