import Vue from 'vue'
import Example from './Example.vue'
import './main.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(Example),
}).$mount('#app')
