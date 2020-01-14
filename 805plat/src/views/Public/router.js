import collect from '@/views/Public/collect.vue'
import notfound from '@/views/Public/notfound.vue'

export default [
    {
        path: '/Public/collect',
        name: 'collect',
        component: collect,
        meta: {
        },
    },
    {
        path: '/Public/notfound',
        name: 'notfound',
        component: notfound,
        meta: {
        },
    }
]