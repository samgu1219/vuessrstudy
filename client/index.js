import Vue from 'vue'
import VueRouter from 'vue-router'
import createRouter from './router/index'
import createStore from './vuex/store'
import App from './app'

import './assets/styles/global.styl'

Vue.use(VueRouter)

const router = createRouter()
const store = createStore()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
