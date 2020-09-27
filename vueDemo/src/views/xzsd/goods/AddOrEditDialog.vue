<template>
    <div>
        <!-- 添加/编辑商品弹窗 -->
        <el-dialog 
            :title="addFormStatus == 'create'? '新建商品':'编辑商品'" 
            :visible.sync="visible"
            @close="closeDialog"
            >
            <!-- 商品表单，自定义校验规则 -->
            <el-form 
                :rules="rules" 
                ref="goodsForm"
                label-position="right"
                label-width="100px"
                :model="goodsFormTemp"
                >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="skuName">
                            <el-input v-model="goodsFormTemp.skuName" placeholder="在此输入商品名称"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="ISBN"
                            prop="ISBN">
                            <el-input
                            v-model.number="goodsFormTemp.ISBN"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="广告词">
                            <el-input
                            type="textarea"
                            v-model="goodsFormTemp.skuAd"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品分类">
                            <el-cascader
                                v-model="cateCascader.value"
                                :options="cateCascader.options"
                                @change="handleCascaderChange"
                                style="width:100%"/>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
                <el-row>
                    <el-col >
                        <el-form-item label="商品介绍">
                            <el-input
                            type="textarea"
                            v-model="goodsFormTemp.skuIntroduction"
                            />
                        </el-form-item>
                    </el-col >
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商家">
                            <el-select
                            placeholder="请选择"
                            v-model="goodsFormTemp.businessCode"
                            >
                            <el-option
                                :key="index+item.businessCode"
                                :label="item.businessName"
                                :value="item.businessCode"
                                v-for="(item,index) in businessMapper"
                            ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="库存"
                            prop="storeNum">
                            <el-input v-model.number="goodsFormTemp.storeNum" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="成本价"
                            prop="frontCostPrice"
                        >
                            <el-input v-model="goodsFormTemp.frontCostPrice" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="售价"
                            prop="frontSalePrice"
                        >
                            <el-input v-model="goodsFormTemp.frontSalePrice" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 如果是新增需要选择是否发布商品 -->
                <el-row v-if="addFormStatus == 'create'">
                    <el-col :span="12">
                        <el-form-item
                            required
                            label="发布商品"
                        >
                            <el-radio-group v-model="goodsFormTemp.skuStatus">
                                <el-radio :label="0">是</el-radio>
                                <el-radio :label="2">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="addFormStatus == 'update'">
                    <el-col :span="12">
                        <el-form-item
                            label="销量"
                            prop="saleNum">
                            <el-input v-model.number="goodsFormTemp.saleNum" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="浏览量"
                            prop="visiteNum">
                            <el-input v-model.number="goodsFormTemp.visiteNum" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <!-- 商品图片 -->
                        <el-form-item label="商品图片">
                            <!-- action="/dev-api/vue-admin-template/goods/uploadImage" -->
                            <el-upload
                                :file-list="fileList"
                                action="http://l29094819a.qicp.vip/goods/uploadImage"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :limit="5"
                                :on-success="onSuccess"
                            >
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <!-- 展示图片的弹窗 -->
                            <el-dialog :visible.sync="dialogVisible">
                                <img
                                    width="100%"
                                    :src="dialogImageUrl"
                                    alt=""
                                >
                            </el-dialog>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">
                    取消
                </el-button>
                <!-- 确定： 新增和编辑时不同的方法 -->
                <el-button 
                    type="primary"
                    @click="addFormStatus == 'create'?createData():updateData()">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    // 商品类别
    getCate,
} from '@/api/cate'
import {
    // 添加商品
    createGood,
    // 获取商家
    getBusiness,
    // 修改商品
    updateGood,
    
} from "@/api/goods"
export default {
    name:'AddOrEditDialog',
    data(){
        return {
            visible:this.addFormVisible,
            // 添加表单模板
                goodsFormTemp: {
                    skuName: "",
                    ISBN: null,
                    firstCateCode: "",
                    secondCateCode: undefined,
                    skuAd: undefined,
                    skuIntroduction: "",
                    businessCode: "",
                    storeNum: '',
                    frontCostPrice: null,
                    frontSalePrice: null,
                    images: [],
                    // 编辑时需要
                    costPrice:'',
                    salePrice:'',
                    saleNum:'',
                    skuStatus:'',
                    visiteNum:'',
                },
            // 表单验证规则
                rules: {
                    skuName: [
                        {
                            required: true,
                            message: "请输入商品名称",
                            trigger: "blur"
                        }, {
                            max: 20,
                            message: "输入商品名称太长",
                            trigger: "blur"
                        }
                    ],
                    ISBN: [
                        {
                            required: true,
                            message: "请输入ISBN码",
                            trigger: "blur"
                        }, {
                            type: "number",
                            message: "必须为数字",
                            trigger: "blur"
                        }
                    ],
                    storeNum: [
                        {
                            required: true,
                            message: "请输入库存",
                            trigger: "blur"
                        }, {
                            type: "integer",
                            message: "请输入正确的数字",
                            trigger: "blur"
                        }
                    ],
                    frontCostPrice: [
                        {
                            required: true,
                            message: "请输入成本价",
                            trigger: "blur"
                        }
                    ],
                    saleNum: [
                        {
                            required: true,
                            message: "请输入销量",
                            trigger: "blur"
                        }, {
                            type: "integer",
                            message: "请输入正确的数字",
                            trigger: "blur"
                        }
                    ],
                    visiteNum: [
                        {
                            required: true,
                            message: "请输入浏览量",
                            trigger: "blur"
                        }, {
                            type: "integer",
                            message: "请输入正确的数字",
                            trigger: "blur"
                        }
                    ],
                    skuStatus:[
                        {
                            required: true,
                            message: "请选择商品状态",
                            trigger: "blur"
                        }
                    ]

                },
            // 商品分类级联选择，用于绑定表单中的一级和二级菜单
                cateCascader:{
                    value: [],
                    options: []
                },
            // 商家信息 
                businessMapper:[],
            // 用于缓存图片
                dialogImageUrl: "",
                dialogVisible: false,
                // 对已有的图片做数据映射
                fileList:[],
        }
    },
    props:{
        // 弹窗可见性
        addFormVisible:{
            type:Boolean,
            default:false
        },
        // 弹窗的状态
        addFormStatus:{
            type:String,
            default:""
        },
        // 点击编辑时父级传递的数据
        updateGoods:{
            type:Object,
        }

    },
    watch:{
        // 只要可见性改变，就会重新刷新表单
        addFormVisible:function(){
            // 切换可见性
            this.visible = this.addFormVisible
            // 加载表单码表数据
            this.handleCreate()
            if(this.addFormStatus == 'update'){
                // 如果是编辑需要将数据绑定到表单上
                this.goodsFormTemp = Object.assign({},this.updateGoods)
                // 对图片做数据映射
                this.fileList = this.goodsFormTemp.images.reduce((acc,cur,index)=>{
                    acc.push(
                        {
                            name:index,
                            url:cur
                        }
                    )
                    return acc
                },[])
                // 取消校验
                this.$nextTick(()=>{
                    this.$refs.goodsForm.clearValidate()
                })
            }
        },
    },
    methods:{
        handleCreate() {
                // 重置表单,防止详情或编辑页面的数据有残留
                this.resetGoodsTemp();
                // 获取商品分类
                getCate().then(
                    response => {
                        
                        // var cateData = response.data.items
                        var cateData = response.data
                        // console.log(cateData);
                        // debugger
                        // 将类别数据进行处理
                        this.cateCascader.options = cateData.reduce((acc,cur)=>{
                            // 子节点只取到二级
                            var _children = [];
                            // 有可能为null
                            if(cur.childNodes){
                                cur.childNodes.forEach(item =>{
                                    _children.push({
                                        label:item.attribute.cateName,
                                        value:item.attribute.cateCode
                                    })
                                })
                            }
                            
                            acc.push({
                                label:cur.attribute.cateName,
                                value:cur.attribute.cateCode,
                                children:_children
                            })
                            return acc
                        },[])
                        // console.log(this.cateCascader.options);
                        // debugger
                    }
                )
                // 获取商家信息
                getBusiness().then(response=>{
                    this.businessMapper = response.data
                    // console.log(this.businessMapper);
                    // debugger
                })
                // 设置弹窗状态
                // this.addFormStatus = 'create';
                // this.addFormVisible = true;
                // 弹窗的dom可能会延迟更新数据，确保在dom加载之后执行
                this.$nextTick(() => {
                    // 找到form对象
                    // 显示页面后不需要进行校验
                    this.$refs.goodsForm.clearValidate()
                })
        },
        // 重置表单数据绑定
        resetGoodsTemp() {
                this.goodsFormTemp = {
                    skuNmae: '',
                    ISBN: null,
                    firstCateCode: "",
                    secondCateCode: undefined,
                    skuAd: undefined,
                    skuIntroduction: "",
                    businessCode: "",
                    storeNum: 0,
                    frontCostPrice: null,
                    frontSalePrice: null,
                    images: [],
                    // 以下为表单没有给出，但是在添加商品时需要有默认值
                    costPrice:'',
                    salePrice:'',
                    saleNum:0,
                    skuStatus:'',
                    visiteNum:0,
                }
        },
        // 商品类目菜单改变
        handleCascaderChange(value) {
                // 将级联选择器的值映射到表单上
                this.goodsFormTemp.firstCateCode = value[0];
                this.goodsFormTemp.secondCateCode = value[1] || undefined;
        },
         // 删除图片
        handleRemove(file, fileList) {
                console.log(file, fileList);
        },
            // 放大图片
        handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
        },
            // 图片上传成功回调
        onSuccess(res) {
                // console.log(res);
                // debugger
                // 需要联调解决
                this.goodsFormTemp.images.push(res.data);
        },
        // 新增商品
        createData(){
                this.$refs.goodsForm.validate(valid => {
                    if(valid){
                        // 执行新增商品时，为其赋予默认状态
                        var goodData = {
                            ...this.goodsFormTemp,
                            costPrice:this.goodsFormTemp.frontCostPrice,
                            salePrice:this.goodsFormTemp.frontSalePrice,
                            saleNum:'0',
                            skuStatus:this.goodsFormTemp.skuStatus + '',
                            storeNum:this.goodsFormTemp.storeNum + '',
                            visiteNum:'0',
                            isbn:this.goodsFormTemp.ISBN + ''
                        }
                        // 调用请求接口
                        createGood(goodData).then(response =>{
                            // 在前台手动模拟一条数据，刷新后消失
                            // TODO：向父级组件传递新增数据，联调时删除
                            // this.list.unshift(goodData)
                            // this.$emit('fakeAddGood',goodData)
                            // 关闭弹窗
                            // this.addFormVisible = false;
                            this.closeDialog()
                            // TODO:刷新父级组件,联调时候打开
                            this.$emit('fetch');
                            // 提示成功
                            this.$notify({
                                title:'成功',
                                message:'创建商品成功',
                                type:'success',
                                duration:4000
                            })
                        })
                    }
                })
        },
        // 关闭弹窗
        closeDialog(){
            // 关闭弹窗
            this.$emit('update:addFormVisible',false)
        },
         // 更新数据
        updateData(){
                this.$refs.goodsForm.validate(valid =>{
                    if(valid){
                        // 更新操作尽量不要使用原对象的数据，要复制一份保存当前状态
                        var tempData = Object.assign(this.goodsFormTemp,{
                            costPrice:this.goodsFormTemp.frontCostPrice,
                            salePrice:this.goodsFormTemp.frontSalePrice,
                            skuStatus:'0',
                        })
                        // 样例接口，不需要返回
                        updateGood(tempData).then(response =>{
                            this.$emit('fakeUpdateGood',tempData)
                            this.closeDialog()
                            this.$notify({
                                title:'成功',
                                message:response.msg,
                                type:'success',
                            })
                        }

                        )
                    }

                })
            }
    }
}
</script>

<style>

</style>