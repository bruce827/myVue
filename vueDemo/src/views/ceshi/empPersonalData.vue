<template>
    <div class="app-container">
        <!-- 吸顶组件 -->
        <sticky class-name="sub-navbar">
            <div class="tip">
                在整页表单提交的填写中可能会出现tab或者table，
                 在底部显示提交按钮会使用户有一种“下方还有内容”的错觉，故此页面将提交栏设置在上方。
            </div>
            <el-dropdown trigger="click">
                <el-button plain="plain">
                    Platform<i class="el-icon-caret-bottom el-icon--right"/>
                </el-button>
                <el-dropdown-menu class="no-border" slot="dropdown">
                    <el-checkbox-group style="padding: 5px 15px;" v-model="platforms">
                        <el-checkbox :key="item.key" :label="item.key" v-for="item in platformsOptions">
                            {{ item.name }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown trigger="click">
                <el-button plain="plain">
                    Link<i class="el-icon-caret-bottom el-icon--right"/>
                </el-button>
                <el-dropdown-menu class="no-padding no-border" slot="dropdown" style="width:300px">
                    <el-input placeholder="Please enter the content" v-model="url">
                        <template slot="prepend">Url</template>
                    </el-input>
                </el-dropdown-menu>
            </el-dropdown>

            <div class="time-container">
                <el-date-picker :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="Release time" type="datetime" v-model="time"/>
            </div>

            <el-button style="margin-left: 10px;" type="success">
                publish
            </el-button>
        </sticky>
        <!-- 吸顶组件结束 -->
    </div>
</template>

<script>
    import Sticky from '@/components/Sticky'
    //   import {
    //     fetchList
    //   } from "@/api/ceshi";
    export default {
        name: "empPersonalData",
        components: {
            //  吸顶小组件
            Sticky
        },
        data() {
            return {
                //   原生校验
                ruleForm: {
                    name: "",
                    region: "",
                    date1: "",
                    date2: "",
                    delivery: false,
                    type: [],
                    resource: "",
                    desc: ""
                },
                // 原生规则
                rules: {
                    name: [
                        {
                            required: true,
                            message: "请输入活动名称",
                            trigger: "blur"
                        }, {
                            min: 3,
                            max: 5,
                            message: "长度在 3 到 5 个字符",
                            trigger: "blur"
                        }
                    ],
                    region: [
                        {
                            required: true,
                            message: "请选择活动区域",
                            trigger: "change"
                        }
                    ],
                    date1: [
                        {
                            type: "date",
                            required: true,
                            message: "请选择日期",
                            trigger: "change"
                        }
                    ],
                    date2: [
                        {
                            type: "date",
                            required: true,
                            message: "请选择时间",
                            trigger: "change"
                        }
                    ],
                    type: [
                        {
                            type: "array",
                            required: true,
                            message: "请至少选择一个活动性质",
                            trigger: "change"
                        }
                    ],
                    resource: [
                        {
                            required: true,
                            message: "请选择活动资源",
                            trigger: "change"
                        }
                    ],
                    desc: [
                        {
                            required: true,
                            message: "请填写活动形式",
                            trigger: "blur"
                        }
                    ]
                },
                // 插件数据
                model: {
                    name: "",
                    region: "",
                    age: ""
                }
            };
        },
        created() {},
        methods: {
            submitForm(formName) {
                this
                    .$refs[formName]
                    .validate(valid => {
                        if (valid) {
                            alert("submit!");
                        } else {
                            console.log("error submit!!");
                            return false;
                        }
                    });
            },
            resetForm(formName) {
                this
                    .$refs[formName]
                    .resetFields();
            }
            // elementUIVerify.getErrorMessage('empty')
        }
    };
</script>

<style lang="scss">
    .time-container {
        display: inline-block;
    }
    .sub-navbar{
        margin-top: 0px;
        border: 1px red dashed;
    }
    // 对页面注释的样式
    .tip{
        float:left;
        overflow: hidden; 
        max-width:40%;
        padding: 4px;
        font-size: 12px;
        line-height: 18px;
        text-align: left;
        color: aliceblue;
    }

</style>