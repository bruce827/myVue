import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// 2.x版本
// import 'element-ui/lib/theme-default/index.css'//1.x版本

import '@/styles/index.scss' // global css

/**
 *框架级引用，必须
 */
import App from './App'
import router from './router'
import store from './store'
/**
 * 项目级引用，建议必须
*/
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data
import * as filters from './filters' // global filters
import elementUIVerify from 'element-ui-verify' // 基于element的校验插件
import 'babel-polyfill' // 兼容ie

require('es6-promise').polyfill()

/**
 * 页面级拓展插件引用，当多个页面需要使用同一个插件时，建议统一引用到全局，非必须
*/

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

/*
* 使用element-UI-verify替代原生校验方式，非入侵式校验,且必须使用elementUI
* https://github.com/aweiu/element-ui-verify
*/
Vue.use(elementUIVerify)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
