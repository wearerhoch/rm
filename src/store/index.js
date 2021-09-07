import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

import {getStoItem} from '../utils/storage'

Vue.use(Vuex)

const state = {
  user: getStoItem('user') || null //存储用户的token
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})