<template>
    <div class="app-container">
        <!-- 搜索条件 -->
        <div class="filter-cantainer">
            <!-- 商品名称，过滤首尾空格 -->
            <el-input class="filter-item" placeholder="商品名称" style="width:200px" v-model="listQuery.skuName"/>
            <!-- 商品状态,可以清空 -->
            <el-select :clearable="true" class="filter-item" placeholder="请选择商品状态" style="width:160px" v-model="listQuery.skuStatus">
                <el-option :key="index+item" :label="item" :value="index" v-for="(item,index) in skuStatusMapper"/>
            </el-select>
            <!-- 广告词 -->
            <el-input class="filter-item" placeholder="广告词" style="width:200px" v-model="listQuery.skuAd"/>

            <!-- 查询 -->
            <el-button @click="handleFilter" class="filter-item" icon="el-icon-search" type="primary">查询</el-button>

        </div>
        <!-- 搜索条件结束 -->
        <div class="operator-container">
            <el-button @click="handleCreate" class="filter-item" icon="el-icon-edit" style="margin-left: 10px;" type="primary">添加商品</el-button>
        </div>
        <!-- table主体-->
        <el-table :data="list" border="border" element-loading-text="数据加载中" fit="fit" highlight-current-row="highlight-current-row" style="100%" v-loading="listLoading">
            <!-- 如没有特殊要求后台的id是不方便在前台展示的，这里的id只是前台列表的索引 -->
            <el-table-column align="center" label="#" type="index" width="64"></el-table-column>
            <!-- 商品名称 展示是否已经被删除 -->
            <el-table-column label="商品名称" min-width="140px">
                <template slot-scope="scope">
                    <span>{{ scope.row.skuName }}</span>
                    <!-- 添加是否删除标记 -->
                    <el-tag type="info" v-if="scope.row.IsDelete === '0'">
                        {{ scope.row.IsDelete | isDelFilter}}</el-tag>
                </template>
            </el-table-column>
            <!-- 定价 金额右对齐好看-->
            <el-table-column align="right" label="定价(¥)" width="130">
                <template slot-scope="scope">
                    <!-- TODO：添加点击事件，使得点击后可查看定价与售价的对比 -->
                    <span>{{ scope.row.costPrice }}
                        <!-- <el-link
                            v-if="scope.row.historyPriceList" 
                            @click="handleShowHistoryPrice(scope.row)"
                        >
                        比价
                        </el-link> -->
                    </span>
                </template>
            </el-table-column>
            <!-- 广告词 -->
            <el-table-column align="center" label="广告词" max-width="200">
                <template slot-scope="scope">
                    {{ scope.row.skuAd }}
                </template>
            </el-table-column>
            <!-- 商品状态 -->
            <el-table-column align="center" class-name="status-col" label="商品状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.skuStatus | statusTypeFilter">{{ scope.row.skuStatus | skuStatusFilter}}</el-tag>
                </template>
            </el-table-column>
            <!-- 创建时间 -->
            <el-table-column align="center" label="创建时间" prop="createdTime" width="200">
                <template slot-scope="scope">
                    <el-popover :content="scope.row.createdTime " placement="bottom" title="历史留痕" trigger="click" width="200">
                        <!-- <el-link slot="reference">{{scope.row.createdTime | datetimeFilter}}</el-link> -->
                    </el-popover>
                </template>
            </el-table-column>
            <!-- 创建人 -->
            <el-table-column align="center" label="创建人" prop="createdBy" width="80"></el-table-column>
            <!-- 操作栏 根据当前行的不同状态显示按钮 多个按钮左对齐好看-->
            <el-table-column align="left" class-name="small-padding fixed-width" label="操作" width="260">
                <template slot-scope="scope">
                    <!-- 编辑 -->
                    <el-button 
                        size="mini" 
                        type="primary" 
                        @click="handleUpdate(scope.row)">编辑</el-button>
                    <!-- 发布 -->
                    <el-button 
                        size="mini" 
                        type="success" 
                        v-if="scope.row.skuStatus == '2'"
                        @click="putaway(scope.row,'0')"
                        >发布
                    </el-button>
                    <!-- 下架 -->
                    <el-button 
                        size="mini" 
                        v-if="scope.row.skuStatus =='0'"
                        @click="putaway(scope.row,'1')"
                        >
                        下架
                    </el-button>
                    <!-- 上架 -->
                    <el-button 
                        size="mini" 
                        type="warning"
                        v-if="scope.row.skuStatus =='1'"
                        @click="putaway(scope.row,'0')"
                        >
                        上架
                    </el-button>
                    <!-- "element-ui": "^2.4.6" -->
                    <!-- 删除 -->
                    <!-- <el-popconfirm
                        title="确定要删除吗？"
                        @onConfirm="handleDelete(scope.row)"
                        >
                        <el-button slot="reference" size="mini" type="danger">删除</el-button>
                    </el-popconfirm> -->
                </template>
            </el-table-column>
        </el-table>
        <!-- table主体结束 -->
        <!-- 分页组件，封装了element自带的分页组件 -->
        <Pagination :limit.sync="listQuery.limit" :page.sync="listQuery.page" :total="total" @pagination="fetchData" v-show="total>0"/>
        <!-- 添加或编辑弹窗 -->
        <!-- <AddOrEditDialog
            :addFormVisible.sync="addFormVisible"
            :addFormStatus="addFormStatus"
            @fetch="fetchData"
            @fakeAddGood="fakeAddGood"
            :updateGoods = "currentRow"
            @fakeUpdateGood="fakeUpdateGood"
        /> -->
        <!-- 比价弹窗 -->
        <!-- <PriceHistoryDialog
            :priceHistouryVisible.sync="priceHistouryVisible"
            :currentGood="currentRow"
        /> -->
    </div>
</template>

<script>
    // 日期格式化插件 
    import moment from 'moment'

    import {
        getList,
        deleteData,
        findGoodBySkuCode,
        updateSkuStatus
        } from "@/api/goods";
    // 分页组件
    import Pagination from "@/components/Pagination";
    // 添加/编辑弹窗
    // import AddOrEditDialog from "./AddOrEditDialog"
    // 比价弹窗
    // import PriceHistoryDialog from "./PriceHistoryDialog"
    // 各种码表
    // 商品状态码表
    var skuStatusMapper = ["在售", "已下架", "未发布"];
    export default {
        name:'Goods',
        components: {
            Pagination,
            // AddOrEditDialog,
            // PriceHistoryDialog
        },
        filters: {
            historyAuthorFilter(obj) {
                console.log(obj);
                return [
                    {
                        datetime: obj.updateTime,
                        name: obj.updeteby
                    }, {
                        datetime: obj.createdTime,
                        name: obj.createdby
                    }
                ];
            },
            statusTypeFilter(status) {
                var StatusTypeMap = ["success", "danger", "info"];

                return StatusTypeMap[status];
            },
            skuStatusFilter(status) {
                return skuStatusMapper[status];
            },
            // 是否删除码表过滤
            isDelFilter(flag) {
                var isDelMap = ["已删除", "正常"];
                return isDelMap[parseInt(flag)];
            },
            // 时间过滤
            datetimeFilter(datetime){
                return  moment(datetime).format("YYYY-MM-DD")
            }
        },
        data() {
            return {
                list: null,
                listLoading: true,
                // 关于分页
                total: 0,
                // 查询条件,与后端联调时候将对象传过去
                listQuery: {
                    page: 1,
                    limit: 10,
                    // 可增加其它的搜索条件
                    skuName: undefined,
                    skuStatus: undefined,
                    skuAd:undefined
                },
                // 用于做映射的码表
                skuStatusMapper,
                // 添加商品相关
                addFormVisible: false,
                // 用于判断当前弹窗状态
                addFormStatus: "",
                // 当前编辑的商品
                currentRow:null,
                // 比价弹窗
                priceHistouryVisible:false

            };
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getList(this.listQuery).then(response => {
                    this.list = response.data.items;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            handleFilter() {
                // 跳转到第一页
                this.listQuery.page = 1;
                this.fetchData();
            },
            // 添加按钮
            handleCreate() {
                // 设置弹窗状态
                this.addFormStatus = 'create';
                this.addFormVisible = true;
            },
            // 编辑按钮
            handleUpdate(row){
                // 获取商品详情
                findGoodBySkuCode(row.skuCode).then(
                    response =>{
                          // 传递数据
                        this.currentRow = response.data
                        this.addFormStatus = 'update'
                        this.addFormVisible = true
                    }
                )

                // 将对象复制一份，和...的用法相同
                // this.goodsFormTemp = Object.assign({},row)
                // 改变弹窗状态
                // 取消校验
                // this.$nextTick(()=>{
                //     this.$refs.goodsForm.clearValidate()
                // })
            },
            // 删除按钮
            handleDelete(row){
                var _prama = {
                    skuCode:row.skuCode
                }
                // 这里根据业务逻辑，有可能会删除失败，所以要约定返回结果
                deleteData(_prama).then(response => {
                    // TODO:联调时删除
                    // var _index = this.list.indexOf(row)
                    // this.list.splice(_index,1)
                    // TODO：联调时候打开
                    this.fetchData()
                    // 提示信息
                    this.$notify({
                        title: '删除成功', 
                        message: response.msg, 
                        type: 'success', 
                    })
                })
            },
            // TODO：模拟新增数据,联调时候删除
            fakeAddGood(data){
                this.list.unshift(data)
            },
            // TODO:模拟修改商品，联调时候删除
            fakeUpdateGood(data){
                // 在前台模拟数据修改，TODO:联调后删除
                            this.list.forEach(item =>{
                                // 使用每条数据的唯一标识进行查找
                                if(item.skuCode === data.skuCode){
                                    // 找到要替换的位置
                                    var _index = this.list.indexOf(item)
                                    // 对指定位置的元素进行替换
                                    this.list.splice(_index,1,data)
                                }
                            })
            },
            // 改变商品状态
            putaway(row,status){
                var _prama = {
                    skuCode:row.skuCode,
                    skuStatus:status
                }
                updateSkuStatus(_prama).then(response=>{
                    // TODO:前台模拟数据，联调后删除
                    this.list.forEach(item =>{
                                // 使用每条数据的唯一标识进行查找
                                if(item.skuCode === row.skuCode){
                                    // 找到要替换的位置
                                    var _index = this.list.indexOf(item)
                                    // 对指定位置的元素的商品状态进行更改
                                    this.list[_index].skuStatus = status
                                }
                    })
                    // TODO：联调时候打开
                    // this.fetchData()
                    // 提示信息
                    this.$notify({
                        title: '成功', 
                        message: response.msg, 
                        type: 'success', 
                    })

                })
            },
            // 现实比价信息
            handleShowHistoryPrice(row){
                this.currentRow = row
                this.priceHistouryVisible = true
            }
        }
    };
</script>
<style lang="scss" scoped="scoped">
    .filter-cantainer {
        padding: 20px 0;
    }
    .filter-item {
        margin-bottom: 0;
    }
</style>