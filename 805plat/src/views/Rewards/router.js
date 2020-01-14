import Rewards from '@/views/Rewards/Home.vue'
import Shopdetail from '@/views/Rewards/Shopdetail.vue'
import Goodsdetail from '@/views/Rewards/Goodsdetail.vue'
import Phonetraffic from '@/views/Rewards/Phonetraffic.vue'
import Oilcard from '@/views/Rewards/Oilcard.vue'
import Ecard from '@/views/Rewards/Ecard.vue'
import Shoppingcard from '@/views/Rewards/Shoppingcard.vue'
export default [
    {
        path: '/rewards',
        name: 'Rewards',
        component: Rewards,
        meta: {
            sort: 3001,
            // keepalive: true,
        },
    },
    {
        path: '/rewards/shopdetail/:id',
        name: 'Shopdetail',
        component: Shopdetail,
        meta: {
            sort: 3002,
        },
    },
    {
        path: '/rewards/shopdetail/detail/:id',
        name: 'Goodsdetail',
        component: Goodsdetail,
        meta: {
            sort: 3003,
        },
    },
    {
        path: '/rewards/phone',
        name: 'Phonetraffic',
        component: Phonetraffic,
        meta: {
            sort: 3004,
        },
    },
    {
        path: '/rewards/oilcard',
        name: 'Oilcard',
        component: Oilcard,
        meta: {
            sort: 3005,
        },
    },
    {
        path: '/rewards/ecard',
        name: 'Ecard',
        component: Ecard,
        meta: {
            sort: 3006,
        },
    },
    {
        path: '/rewards/shoppingcard',
        name: 'Shoppingcard',
        component: Shoppingcard,
        meta: {
            sort: 3007,
        },
    },
]