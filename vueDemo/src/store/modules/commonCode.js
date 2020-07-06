import { 
    getCommonCode, 
    getGoodsCode } from '@/api/commonCode'

const commonCode = {
    state: {
        baseCode:{
            delFlag:[]
        },
        goodsCode:{
            goodStatus:[]
        }
        
    },

    // 码表在前端几乎没有修改的场景,所以只在登录成功后统一获取即可
    mutations: {
        SET_COMMON_CODE:(state,data)=>{
            state.baseCode = data.data
        },
        SET_GOODS_CODE:(state,data)=>{
            state.goodsCode = data.data
        }
    },

    actions: {
        // 获取所有code
        SET_COMMON_CODE:async ({commit}) => {
            /**
             * 通用代码需要最先获取，后面业务模块的代码有可能会使用
             */
            debugger
            await commit('SET_COMMON_CODE',await getCommonCode())
            await commit('SET_GOODS_CODE',await getGoodsCode())
        }
    }
}

export default commonCode
