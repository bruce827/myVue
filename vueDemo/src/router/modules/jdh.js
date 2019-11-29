/** 
 * 简单汇项目
*/
import Layout from '@/views/layout/Layout'

const jdhRouter = {
  path: '/jdh',
  component: Layout,
  redirect: 'noredirect',
  name: '企业端',
  meta: {
    title: '企业端',
    icon: 'warehouse',
    // 页面需要的权限
    roles: ['admin','jdh']

  },
  children: [
    {
        path: 'firstRegister',
        // component: () => import('@/views/ehr/WarehouseManagement'),
        name: '首次登记',
        meta: { title: '首次登记', noCache: true }
      },
    {
      path: 'myRegister',
      component: () => import('@/views/jdh/myRegist'),
      name: '我的登记',
      meta: { title: '我的登记', noCache: true }
    },
    
  ]
}

export default jdhRouter
