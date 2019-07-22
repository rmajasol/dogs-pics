import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import { BPagination } from 'bootstrap-vue'
Vue.component('b-pagination', BPagination)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
