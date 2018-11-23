/** 
 * 意见直通车
*/
import Layout from '@/views/layout/Layout'

const opinionRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noredirect',
  name: '意见直通车管理',
  meta: {
    title: '意见直通车管理',
    icon: 'opinion'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: '意见直通车管理',
      meta: { title: '意见直通车管理', noCache: true }
    },
  ]
}

export default opinionRouter
