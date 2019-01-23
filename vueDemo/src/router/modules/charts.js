/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noredirect',
  name: 'Charts',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'keyboardChart', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: 'lineChart', noCache: true }
    },
    {
      path: 'mixchart',
      component: () => import('@/views/charts/mixChart'),
      name: 'MixChart',
      meta: { title: 'mixChart', noCache: true }
    },
    {
      path: 'map',
      component: () => import('@/views/charts/map'),
      name: '地图（示意图）',
      meta: { 
        title: '地图（示意图）', 
        noCache: true 
      } 
    },
    {
      path: 'bmapChart',
      component: () => import('@/views/charts/bmapChart'),
      name: '地图（百度）',
      meta: { 
        title: '地图（百度）', 
        noCache: true 
      } 
    },
    {
      path: 'vCharts',
      component: () => import('@/views/charts/vCharts'),
      name: 'v-charts集成',
      meta: { 
        title: 'v-charts集成', 
        noCache: true 
      } 
    }

  ]
}

export default chartsRouter
