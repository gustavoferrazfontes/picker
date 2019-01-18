import Vue from 'vue'

import DatePicker from './DatePicker'

Vue.config.productionTip = false

new Vue({
    render: h => h(DatePicker),
}).$mount('#app')
