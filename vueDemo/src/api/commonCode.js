import request from '@/utils/request'

/**
 * 获取全局公共码表
 */
export function getCommonCode() {
    return request({
        url: '/commonCode/baseCode', 
        method: 'get'
    })
}

/**
 * 获取商品管理码表
 */
export function getGoodsCode() {
    return request({
        url: '/commonCode/goodsCode', 
        method: 'get'
    })
}