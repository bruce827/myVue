<template>
    <div>
        <!-- 商品比价弹窗 -->
        <el-dialog 
            :title="title" 
            :visible.sync="priceHistouryVisible"
            @close="closeDialog"
            >
            <!-- echarts 图表 -->
            <p>哈哈</p>
            
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'PriceHistoryDialog',
    data(){
        let title
        // if(this.currentGood.skuName){
        //     title = this.currentGood.skuName
        // }
        return {
            title:''
        }
    },
    props:{
        // 弹窗可见性
        priceHistouryVisible:{
            type:Boolean,
            default:false
        },
        // 当前商品数据
        currentGood:{
            type:Object,
            default:()=>({})
        }
    },
    watch:{
    },
    methods:{
        // 关闭弹窗
        closeDialog(){
            // 关闭弹窗
            this.$emit('update:priceHistouryVisible',false)
        },
    }
}
</script>

<style>

</style>