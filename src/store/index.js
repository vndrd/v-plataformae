import Vue from 'vue'
import Vuex from 'vuex'
import datos from './modules/datos.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    datos
  }
})
