<template>
    <div id="app">
        <TRVLPicker
            :checkin.sync="checkin"
            :checkout.sync="checkout"
        />
    </div>
</template>

<script>
    import TRVLPicker from '@/trvl-picker/TRVLPicker'

    export default {
        name: 'App',
        components: {
            TRVLPicker,
        },
        data() {
            return {
                checkin: new Date(2019, 0, 19),
                checkout: new Date(2019, 0, 21),
            }
        },
    }
</script>
