import Orderlist from '@/views/Order/Orderlist.vue'
import OrderDetail from '@/views/Order/OrderDetail.vue'

export default [
    {
        path: '/order/Orderlist',
        name: 'Orderlist',
        component: Orderlist,
        meta: {
        },
    },
    {
        path: '/order/OrderDetail/:orderid',
        name: 'OrderDetail',
        component: OrderDetail,
        meta: {
        },
    },
]