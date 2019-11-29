/** 
 * 通用测试用例
*/
import Layout from '@/views/layout/Layout'

const jdhRouter = {
  path: '/ceshi',
  component: Layout,
  redirect: 'noredirect',
  name: '通用测试用例',
  meta: {
    title: '通用测试用例',
    icon: 'ceshi',
    // 页面需要的权限
    roles: ['admin','ceshi']

  },
  children: [
    {
        path: 'singleManage',
        component: () => import('@/views/ceshi/singleManege'),
        name: '简单业务管理',
        meta: { title: '简单业务管理', noCache: true }
      },
      {
        path: 'completedManage',
        // component: () => import('@/views/ceshi/singleManege'),
        name: '复杂业务管理',
        meta: { title: '复杂业务管理', noCache: true }
      },
    
  ]
}

export default jdhRouter
