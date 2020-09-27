import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'
import AIARouter from './modules/AIAnswer'
import startEduRouter from './modules/startEdu'
import opinionRouter from './modules/opinion'
import articleRouter from './modules/article'
import dormRouter from './modules/dorm'
import ehrRouter from './modules/ehr'
import jdhRouter from './modules/jdh'
import ceshiRouter from './modules/ceshi'

import xzsdRouter from './modules/xzsd'


/**
 *=========== 路由的详细配置说明==============
 **/

/**
* //当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1，默认为flase
* hidden: true
* //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
* //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
* //若你想不管路由下面的 children 声明的个数都显示你的根路由,你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
* alwaysShow: true
* //当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* redirect: noredirect
* //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* name:'router-name'
* affix: true 如果配置了标签页快捷导航，此属性用于固定
* meta : {
    roles: ['admin','editor']     //设置路由的 权限，支持多个权限叠加
    title: 'title'                //在侧边栏和面包屑中的名字
    icon: 'svg-name'             //图标
    noCache: true                //如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
  }
  // 子菜单项，支持无线套嵌子菜单
  children{

  }
**/
// 所有权限通用路由表，公共页面
export const constantRouterMap = [
  // 重定向
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 用户角色重定向
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  // 找不到
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  // 未授权
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  // 首页
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  // 智能答题考试管理
  // AIARouter,
  // 始业教育考试管理
  // startEduRouter,
  // 意见直通车管理
  // opinionRouter,
  // 微信文章管理
  // articleRouter,
  // 文档
  {
    // hidden:true,
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', noCache: true }
      }
    ]
  },
  // 引导页
  {
    // hidden:true,
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

// 实例化时默认加载所有权限
export default new Router({
  /**
   * 默认使用hashHistory进行路由解析，可以改为browserHistory，注意发布时要在容器里添加映射
  */
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// export const asyncRouterMap = [tableRouter]
// 异步挂载路由，动态按需加载
export const asyncRouterMap = [
   // 格力宿舍管理系统
  dormRouter,
  // 库存管理
  ehrRouter,
  // 简单汇
  jdhRouter,
  // 通用测试
  ceshiRouter,
  // 行走书店
  xzsdRouter,
  // 权限测试页
  {
    // 路由地址
    path: '/permission',
    // 公共组件
    component: Layout,
    // 在面包屑中点击后重定向的地址
    redirect: '/permission/index',
    // 一直显示跟路由
    alwaysShow: true,
    meta: {
      // 菜单名字
      title: 'permission',
      // 图标
      icon: 'lock',
      // 页面需要的权限
      roles: ['admin', 'geree']
    },
    // 子菜单
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          // 子页面需要的权限
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  // 图标
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** When your routing table is too long, you can split it into small modules**/
  // 组件
  componentsRouter,
  // 图表
  chartsRouter,
  // 路由套嵌
  nestedRouter,
  // 表格
  tableRouter,
  // 综合实例
  {
    // hidden:true,
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },
  // tab页面
  {
    // hidden:true,
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },
  // 错误页面
  {
    // hidden:true,
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  // 错误页面2
  {
    // hidden:true,
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import('@/views/errorLog/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },
  // excle导出
  {
    // hidden:true,
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },
  // 压缩导出
  {
    // hidden:true,
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },
  // 主题换肤
  {
    // hidden:true,
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },
  // 剪切板
  {
    // hidden:true,
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },
  // 国际化
  {
    // hidden:true,
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },
  // 外部链接
  {
    // hidden:true,
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  // 404页面，此页面需要在最后加载,如果写在公共路由里面所有页面均会被拦截
  { path: '*', redirect: '/404', hidden: true }
]
