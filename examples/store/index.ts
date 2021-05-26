import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSupportQQ: false
  },
  mutations: {
    setSupportQQ (state, visible) {
      state.showSupportQQ = !!visible
    }
  },
  actions: {
  },
  modules: {
  }
})
