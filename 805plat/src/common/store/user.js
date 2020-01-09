const state = {
	token:""
	//token: "72448210a22d5f2a8072ae4977ace851",
}

const actions = {
	_currentUser({
		commit
	}, active) {		
		commit('@user/current', active)
	},
}

const mutations = {
	'@user/current'(state, data) {
		state.token = data
	},
}

export default {
	state,
	mutations,
	actions,
}