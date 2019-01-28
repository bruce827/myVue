/*
 * @作者: 徐健
 * @日期: 2018-12-03 10:45:17
 * @最后修改:   徐健
 * @最后修改时间: 2018-12-03 10:45:17
 */
import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import {
  getToken
} from '@/utils/auth' // getToken from cookie

// 进度条配置选项
NProgress.configure({
  // 简单的旋转图标
  showSpinner: true
})

// 判断用户权限
function hasPermission(roles, permissionRoles) {
  // 如果用户具备admin权限则直接跳过验证
  if (roles.indexOf('admin') >= 0) return true
  // 不是admin权限用户时，跳过后台验证
  if (!permissionRoles) {
    console.log('未启动后台,跳过验证')
    return true
  }
  // 正常情况获取后台数据
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
// 配置白名单，在此列表中的页面不需要进行重定向
const whiteList = ['/login', '/auth-redirect']

// 全局拦截路由，验证用户token
router.beforeEach((to, from, next) => {
  // 启动进度条
  NProgress.start()
  // 判断是否有token
  if (getToken()) {
    /* has token*/
    // 如果地址是登录页则定位到首页
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 判断当前用户是否已拉取完user_info信息
      if (store.getters.roles.length === 0) {
        // 拉取user_info
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
          // 生成可访问的路由表
          store.dispatch('GenerateRoutes', {
            roles
          }).then(() => {
            // 根据roles权限动态添加
            router.addRoutes(store.getters.addRouters)
            // 通过next(to)避开路由过多而导致的加载不完全的问题。这行代码重新进入router.beforeEach这个钩子，这时候再通过next()来释放钩子，就能确保所有的路由都已经挂在完成了。
            next({ ...to,
              replace: true
            })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({
              path: '/'
            })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({
            path: '/401',
            replace: true,
            query: {
              noGoBack: true
            }
          })
        }
        // 可删 ↑
      }
    }
  } else {
    /* 如果没有token则判断免登陆白名单，如果有则直接进入*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则全部重定向到登录页
      next(`/login?redirect=${to.path}`)
      // if current page is login will not trigger afterEach hook, so manually handle it
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
