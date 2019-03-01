/** 
 * ehr库存管理
*/
import Layout from '@/views/layout/Layout'

const ehrRouter = {
  path: '/ehr',
  component: Layout,
  redirect: 'noredirect',
  name: '库存管理系统',
  meta: {
    title: '库存管理系统',
    icon: 'warehouse',
    // 页面需要的权限
    roles: ['admin','ehr']

  },
  children: [
    {
      path: 'mountInfo',
      component: () => import('@/views/ehr/MountInfo'),
      name: '物品分类管理',
      meta: { title: '物品分类', noCache: true }
    },
    {
        path: 'WarehouseManagement',
        component: () => import('@/views/ehr/WarehouseManagement'),
        name: '出入库管理',
        meta: { title: '出入库管理', noCache: true }
      },
  ]
}

export default ehrRouter
