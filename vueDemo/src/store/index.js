import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
// 快捷标签导航
// import tagsView from './modules/tagsView'
import user from './modules/user'
// 通用码表
import commonCode from './modules/commonCode'
import getters from './getters'

Vue.use(Vuex)
/**
 * 将所有通用码表放在commonCode模块中在用户登录后统一获取
 */
const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    // 快捷标签导航
    // tagsView,
    user,
    commonCode
  },
  getters
})

export default store
