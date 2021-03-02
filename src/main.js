import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'
window.axios  = require('axios');
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  env  from '../env.json';

axios.defaults.baseURL = `${env.HOST_API ?? window.location.origin}/livraria`;
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(vueResource)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
