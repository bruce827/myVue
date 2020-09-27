import request from '@/utils/request'
// import store from '@/store'

// 查询商品列表
export function getList(params) {
    console.log(params);
    var data = {
        ...params,
        pageNum:params.page,
        pageSize:params.limit
    }
    return request({
        url: '/goods/listGoods',
        method: 'post',
        data:data
    })
}
// 创建商品
export function createGood(params) {
    console.log(params);
    console.log(store.state);
    var _data = {
        ...params,
        loginAccount:loginAccount
    }
    console.log(_data);
    return request({
        url: '/goods/createGood',
        method: 'post',
        data:_data
    })
}
export function updateGood(params) {
    console.log('更新数据');
    return request({
        url: '/goods/updateGood',
        method: 'post',
        params
    })
}
// 删除商品
export function deleteData(params) {
    var _params = {
        ...params,
        loginAccount:loginAccount
    }
    console.log(_params);
    return request({
        url: '/goods/deleteGood',
        method: 'get',
        params:_params
    })
}

// 获取商家数据
export function getBusiness(params) {
    return request({
        url: '/goods/listBusiness',
        method: 'get',
    })
}
// 上传图片
export function uploadImg(params) {
    return request({
        url: '/goods/uploadImage',
        method: 'post',
        params
    })
}
// 查询商品详情
export function findGoodBySkuCode(params) {
    return request({
        url: '/goods/findGoodsBySkuCode',
        method: 'get',
        params
    })
}
// 修改商品状态
export function updateSkuStatus(params) {
    return request({
        url: '/goods/updateGoodsStatus',
        method: 'get',
        params
    })
}