/** 
 * 智能答题模块
*/
import Layout from '@/views/layout/Layout'

const AIARouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noredirect',
  name: '智能答题考试管理',
  meta: {
    title: '智能答题考试管理',
    icon: 'AIA'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: '小关信息',
      meta: { title: 'keyboardChart', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: '试题信息',
      meta: { title: 'lineChart', noCache: true }
    },
    {
      path: 'mixchart',
      component: () => import('@/views/charts/mixChart'),
      name: '试卷信息',
      meta: { title: 'mixChart', noCache: true }
    },
    {
        path: 'mixchart',
        component: () => import('@/views/charts/mixChart'),
        name: '大关信息',
        meta: { title: 'mixChart', noCache: true }
      },
      {
        path: 'mixchart',
        component: () => import('@/views/charts/mixChart'),
        name: '策略信息',
        meta: { title: 'mixChart', noCache: true }
      },
      {
        path: 'mixchart',
        component: () => import('@/views/charts/mixChart'),
        name: '知识点信息',
        meta: { title: 'mixChart', noCache: true }
      },
  ]
}

export default AIARouter
