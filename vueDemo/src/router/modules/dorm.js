/*
 * @作者: 徐健 
 * @日期: 2018-11-25 15:10:14 
 * @最后修改:   徐健 
 * @最后修改时间: 2018-11-25 15:10:14 
 */

import Layout from '@/views/layout/Layout'

const dormRouter = {
  path: '/dorm',
  component: Layout,
  redirect: 'noredirect',
  name: '格力宿舍管理系统',
  meta: {
    title: '格力宿舍管理系统',
    icon: 'dorm'
  },
  children: [
    {
      path: 'home',
      component: () => import('@/views/dorm/home'),
      name: '首页',
      meta: { title: '首页', noCache: true }
    },
    {
      path: 'charge',
      component: () => import('@/views/dorm/equipment'),
      name: '生命周期首页',
      meta: { title: '生命周期首页', noCache: true }
    }
  ]
}

export default dormRouter
