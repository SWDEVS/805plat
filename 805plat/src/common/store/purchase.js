const state = {
	status: false,
}

const actions = {
	_showPurchase({
		commit
	}, active) {		
		commit('@purchase/status', active)
	},
}

const mutations = {
	'@purchase/status'(state, data) {
		state.status = data
	},
}

export default {
	state,
	mutations,
	actions,
}