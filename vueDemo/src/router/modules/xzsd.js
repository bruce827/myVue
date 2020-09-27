/** 
 * 数字工场样例项目pc端
*/
import Layout from '@/views/layout/Layout'

const xzsdRouter = {
    path: '/xzsd',
    component: Layout,
    redirect: 'noredirect',
    name: 'walkingStore',
    meta: {
        title: '行走书店',
        icon: 'book'
    },
    children: [
        {
            path: 'goods',
            component: () => import('@/views/xzsd/goods'),
            name: 'Goods',
            meta: { title: '商品管理', noCache: true }
        }
    ]
}

export default xzsdRouter
