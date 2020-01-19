import request from '@/utils/request'
/**
 * 列表查询
 * @param {*} query 
 */
export function fetchList(query) {
  return request({
    url: '/ceshi/list',
    method: 'get',
    params: query
  })
}

/**
 * 获取屏幕高度
 * @param {*} pv 
 */
export function fetchPv(pv) {
  return request({
    url: '/ceshi/pv',
    method: 'get',
    params: { pv }
  })
}
