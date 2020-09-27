import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import ceshiAPI from './ceshi'
// 格力项目
import dormAPI from './dorm'
// 通用码表 
import commonCodeAPI from './commonCode'
// 行走书店-商品管理
import goodsAPI from './goods'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// 模拟网络延时
Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 通用码表
Mock.mock(/\/commonCode\/baseCode/, 'get', commonCodeAPI.getCommonCode)
Mock.mock(/\/commonCode\/goodsCode/, 'get', commonCodeAPI.getGoodsCode)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)
Mock.mock(/\/article\/inlineSortTable/, 'get', articleAPI.getInlineSortTable)


// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 格力项目
Mock.mock(/\/dorm\/getMsgCount/, 'get', dormAPI.getMsgCount)
Mock.mock(/\/dorm\/getrunningTask/, 'get', dormAPI.getrunningTask)
Mock.mock(/\/dorm\/historyTasks/, 'get', dormAPI.historyTasks)
Mock.mock(/\/dorm\/systemMsg/, 'get', dormAPI.systemMsg)

// 通用测试用例模拟数据
Mock.mock(/\/ceshi\/list/, 'get', ceshiAPI.getList)
Mock.mock(/\/ceshi\/pv/, 'get', ceshiAPI.getPv)

/** 
 * 行走书店演示
 * */ 
// 商品列表
Mock.mock(/\/goods\/listGoods/, 'post', goodsAPI.listGoods)
// 创建商品
Mock.mock(/\/goods\/createGood/, 'post', goodsAPI.createGood)
// 更新商品
Mock.mock(/\/goods\/updateGood/, 'post', goodsAPI.updateGood)
// 删除商品
Mock.mock(/\/goods\/deleteGood/, 'get', goodsAPI.deleteGood)
// 上传图片
// Mock.mock(/\/goods\/listGoods/, 'post', goodsAPI.uploadImage)
// 商家列表
Mock.mock(/\/goods\/listBusiness/, 'get', goodsAPI.listBusiness)
// 根据skuCode查找商品
Mock.mock(/\/goods\/findGoodsBySkuCode/, 'get', goodsAPI.findGoodsBySkuCode)
// 更新商品状态
Mock.mock(/\/goods\/updateGoodsStatus/, 'get', goodsAPI.updateGoodsStatus)


export default Mock
