import request from '@/utils/request'

// export function fetchList(query) {

//   return request({
//     url: '/article/list',
//     method: 'get',
//     params: query
//   })
// }

// export function fetchArticle(id) {
//   return request({
//     url: '/article/detail',
//     method: 'get',
//     params: { id }
//   })
// }

// export function fetchPv(pv) {
//   return request({
//     url: '/article/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

// export function createArticle(data) {
//   return request({
//     url: '/article/create',
//     method: 'post',
//     data
//   })
// }

// export function updateArticle(data) {
//   return request({
//     url: '/article/update',
//     method: 'post',
//     data
//   })
// }

export function getMsgCountNum() {
  
  return request({
    url: '/dorm/getMsgCount',
    method: 'get',
  })
}

export function getrunningTaskList() {
  
  return request({
    url: '/dorm/getrunningTask',
    method: 'get',
  })
}

export function historyTasksList() {
  
  return request({
    url: '/dorm/historyTasks',
    method: 'get',
  })
}

export function systemMsgList() {
  
  return request({
    url: '/dorm/systemMsg',
    method: 'get',
  })
}