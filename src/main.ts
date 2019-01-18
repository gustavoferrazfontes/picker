import Vue from 'vue'

// @ts-ignore import/named
import DatePicker from './DatePicker'

Vue.config.productionTip = false

new Vue({
    render: h => h(DatePicker),
}).$mount('#app')
