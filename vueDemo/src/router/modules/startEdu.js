/** 
 * 智能答题模块
*/
import Layout from '@/views/layout/Layout'

const startEduRouter = {
  path: '/startEdu',
  component: Layout,
  redirect: 'noredirect',
  name: '始业教育考试管理',
  meta: {
    title: '始业教育考试管理',
    icon: 'start'
  },
  children: [
    {
      path: 'question',
      component: () => import('@/views/startEdu/question'),
      name: '试题管理',
      meta: { title: '试题管理', noCache: true }
    },
    {
      path: 'result',
      // component: () => import('@/views/charts/line'),
      name: '考试结果查询',
      meta: { title: '考试结果查询', noCache: true }
    }
  ]
}

export default startEduRouter
