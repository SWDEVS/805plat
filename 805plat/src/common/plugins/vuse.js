import Vue from 'vue'

export default ( ...a) => {
	a.forEach( b => Vue.use(b))
}