import Vue from 'vue'
import VueRouter from 'vue-router'
import vuex from 'vuex'
import Meta from 'vue-meta'

import App from './app'
import createStore from './vuex/store'
import createRouter from './router/index'
import Notification from './components/notification'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(vuex)
Vue.use(Meta)
Vue.use(Notification)

export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })
  return {app, router, store}
}
