import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Vue from 'vue'
import user from './user.js'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	// 要持久化的模块列表。
	modules: ['user'],
})

export default new Vuex.Store({
	modules: { user },
	plugins: [vuexLocal.plugin],
})