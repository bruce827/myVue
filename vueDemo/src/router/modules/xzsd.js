/** 
 * 数字工场样例项目pc端
*/
import Layout from '@/views/layout/Layout'

const articleRouter = {
    path: '/xzsd',
    component: Layout,
    redirect: 'noredirect',
    name: '行走书店',
    meta: {
        title: '行走书店',
        icon: 'article'
    },
    children: [
        {
            path: 'keyboard',
            component: () => import('@/views/charts/keyboard'),
            name: '商品管理',
            meta: { title: '商品管理', noCache: true }
        }
    ]
}

export default articleRouter
