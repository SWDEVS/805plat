import { get,post} from './http'
import api from './api'
import * as Filters from './filters'
import wx from "weixin-js-sdk"
export default (vue) => {
	vue.prototype.$post = post
	vue.prototype.$get = get
	vue.prototype.$api = api
	vue.prototype.$wx = wx
	Object.keys(Filters).forEach(key => {
		vue.filter(key, Filters[key])
	})
}
