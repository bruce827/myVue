/** 
 * 通用测试用例
*/
import Layout from '@/views/layout/Layout'

const ceshiRouter = {
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
        meta: { title: '简单业务管理', noCache: true },
      },
      {
        path: 'lineEditTable',
        component: () => import('@/views/ceshi/lineEditTable'),
        name: '行内编辑',
        meta: { title: '行内编辑', noCache: true },
      },
      {
        path: 'completedManage',
        // component: () => import('@/views/ceshi/singleManege'),
        name: '复杂业务管理',
        meta: { title: '复杂业务管理', noCache: true }
      },
      {
        path: 'pageForm',
        component: () => import('@/views/ceshi/pageForm'),
        name: '表单校验',
        meta: { title: '表单校验', noCache: true }
      },
      {
        path: 'empPersonalData',
        component: () => import('@/views/ceshi/empPersonalData'),
        name: '员工基本信息提交',
        meta: { title: '员工基本信息提交', noCache: true }
      },
    
  ]
}

export default ceshiRouter
