import Vuex from 'vuex'
import model from '../model/client-model'

const state = {
  count: 1,
  aaa: {}
}

const getters = {
  count100: state => state + 100
}

const mutations = {
  plus (state, n) {
    state.count += n
  },
  minus (state, n) {
    state.count -= n
  },
  getData (state, n) {
    state.aaa = n
  }
}

const actions = {
  plusAction (ctx, n) {
    ctx.commit('plus', n)
  },
  minusAction (ctx, n) {
    ctx.commit('minus', n)
  },
  getDataAction (ctx, n) {
    // return ctx.commit('getData', n)
    model.getAllTodos().then(data => {
      console.log('======>data', data, n)
      return ctx.commit('getData', n)
    }).catch(err => {
      console.log(err)
    })
    // return ctx.commit('getData', n)
  }
}

export default () => new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
