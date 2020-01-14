import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Vue from 'vue'
import user from './user.js'
import purchase from './purchase.js'
import baseinfo from './base.js'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	// 要持久化的模块列表。
	modules: ['user','baseinfo'],
})

export default new Vuex.Store({
	modules: { user,purchase,baseinfo },
	plugins: [vuexLocal.plugin],
})