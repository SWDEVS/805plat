const state = {
    baseinfo: {
        ingot: "",
        ticket: ""
    }
}

const actions = {
    _currentBaseinfo({
        commit
    }, active) {
        commit('@base/current', active)
    },
}

const mutations = {
    '@base/current'(state, data) {
        state.baseinfo = data
    },
}

export default {
    state,
    mutations,
    actions,
}