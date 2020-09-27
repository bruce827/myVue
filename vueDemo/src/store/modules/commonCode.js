import { 
    getCommonCode, 
    getGoodsCode 
} from '@/api/commonCode'

const commonCode = {
    // 如果是业务模块必须加入局部名称防止命名重复
    namespaced:true,
    state: {
        baseCode:{
            delFlag:[]
        },
        goodsCode:{
            goodStatus:[]
        }
    },

    // 码表数据在前端几乎没有修改的场景,所以只在登录成功后统一获取即可
    mutations: {
        SET_COMMON_CODE:(state,data)=>{
            state.baseCode = data.data.data
        },
        SET_GOODS_CODE:(state,data)=>{
            state.goodsCode = data.data.data
        }
    },

    actions: {
        // 获取所有code
        SET_COMMON_CODE:async ({commit}) => {
            /**
             * 通用代码需要最先获取，后面业务模块的代码有可能会使用到,除通用码表外，其它code可以在模块加载时获取
             */
            // 通用代码
            await commit('SET_COMMON_CODE',await getCommonCode())
            // 商品模块code
            await commit('SET_GOODS_CODE',await getGoodsCode())

        }
    }
}

export default commonCode
