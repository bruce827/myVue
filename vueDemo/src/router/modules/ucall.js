/** 
 * UCall中台系统
 * 
*/
import Layout from '@/views/layout/Layout'

const articleRouter = {
    path: '/ucall',
    component: Layout,
    redirect: 'noredirect',
    name: 'ucall业务方中台',
    meta: {
        title: 'ucall业务方中台',
        icon: 'ucall'
    },
    children: [
        {
            path: 'companyManage',
            // component: () => import('@/views/charts/keyboard'),
            name: '业务方配置管理',
            meta: { 
                title: '业务方配置管理', 
                noCache: true 
            },
            children:[
                {
                    path: 'company',
                    component: () => import('@/views/charts/keyboard'),
                    name: '业务方管理',
                    meta: { 
                        title: '业务方管理', 
                        noCache: true 
                    }
                },
                {
                    path: 'account',
                    component: () => import('@/views/charts/keyboard'),
                    name: '业务方账户管理',
                    meta: { 
                        title: '业务方账户管理', 
                        noCache: true 
                    }
                },
            ]
        },
    ]
}

export default articleRouter
