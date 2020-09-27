import Mock from 'mockjs'
import { param2Obj } from '@/utils'

// 通用码表
const baseCode = {
    // 是否删除
    delFlag : ['已删除','未删除'],
    // 是否选中
    isSelect:['选中','未选中'],
    // 通用状态基于elementUI的默认状态颜色
    baseTagStatus:["success", "info","warning","danger"],
    
}
// 商品状态(0:在售 1; 已下架，2：未发布)
// 初次创建商品的状态为“未发布”，只能手动“上架”后才可变为“在售”状态
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
