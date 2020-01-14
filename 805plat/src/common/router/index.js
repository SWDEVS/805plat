import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/views/Rank/router'
import Rewards from '@/views/Rewards/router'
import Mine from '@/views/Mine/router'
import Order from '@/views/Order/router'
import Public from '@/views/Public/router'
import Goldcenter from '@/views/Goldcenter/router'
//import store from '@/common/store'

Vue.use(Router)
const routes = [
	...Rank,
    ...Rewards,
	...Mine,
	...Order,
	...Public,
	...Goldcenter
]

export const keepAlives = routes.filter(r => r.meta && r.meta.keepalive === true).map(r => r.name)

const router = new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
})

export default router