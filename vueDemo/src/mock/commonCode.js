import Mock from 'mockjs'
import { param2Obj } from '@/utils'

// 通用码表
const baseCode = {
    // 是否删除
    delFlag : ['已删除','未删除'],
    // 是否选中
    isSelect:['选中','未选中']
}
// 商品状态(0:在售 1; 已下架，2：未发布)
const goodsCode = {
    goodStatus : ['在售','已下架','未发布']
}


export default {
    getCommonCode:()=>{
        return {
            data: baseCode
        }
    },
    getGoodsCode:()=>{
        return {
            data:goodsCode
        }
    }

}
