/** 
 * 微信文章管理
*/
import Layout from '@/views/layout/Layout'

const articleRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noredirect',
  name: '微信文章管理',
  meta: {
    title: '微信文章管理',
    icon: 'article'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: '微信文章管理',
      meta: { title: '微信文章管理', noCache: true }
    },
  ]
}

export default articleRouter
