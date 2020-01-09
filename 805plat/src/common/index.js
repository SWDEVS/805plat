//import Vue from 'vue'
import plugins from './plugins/index'
import vuse from './plugins/vuse'
import mixin from './plugins/mixin'
export {
	default as router
}
	from './router/index'

export {
	default as store
}
	from './store/index'

vuse(plugins);

mixin()