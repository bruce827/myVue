<template>
    <div class="mixin-components-container">
        <el-row>
            <el-card class="box-card">
                <div class="clearfix" slot="header">
                    <span>按钮样式</span>
                </div>
                <el-row style="margin-bottom:50px;">
                    <el-col :span="4" class="text-center">
                        <router-link class="pan-btn blue-btn" to="/documentation/index">Documentation</router-link>
                    </el-col>
                    <el-col :span="4" class="text-center">
                        <router-link class="pan-btn light-blue-btn" to="/icon/index">Icons</router-link>
                    </el-col>
                    <el-col :span="4" class="text-center">
                        <!-- <router-link class="pan-btn pink-btn" to="/excel/export-excel">Excel</router-link> -->
                        <!-- 渐变效果 -->
                        <button @mousemove="getGradient" class="mouse-cursor-gradient-tracking">
                            <span>Hover me</span>
                        </button>
                    </el-col>
                    <el-col :span="4" class="text-center">
                        <router-link class="pan-btn green-btn" to="/table/complex-table">Table</router-link>
                    </el-col>
                    <el-col :span="4" class="text-center">
                        <router-link class="pan-btn tiffany-btn" to="/example/create">Form</router-link>
                    </el-col>
                    <el-col :span="4" class="text-center">
                        <router-link class="pan-btn yellow-btn" to="/theme/index">Theme</router-link>
                    </el-col>
                </el-row>
            </el-card>
        </el-row>

        <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="6">
                <el-card class="box-card">
                    <div class="clearfix" slot="header">
                        <span>Material Design 的input</span>
                    </div>
                    <div style="height:100px;">
                        <el-form :model="demo" :rules="demoRules">
                            <el-form-item prop="title">
                                <md-input icon="search" name="title" placeholder="输入标题" v-model="demo.title">标题</md-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="box-card">
                    <div class="clearfix" slot="header">
                        <span>图片hover效果</span>
                    </div>
                    <div class="component-item">
                        <pan-thumb height="100px" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191" width="100px">
                            vue-element-admin
                        </pan-thumb>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="box-card">
                    <div class="clearfix" slot="header">
                        <span>水波纹 waves v-directive</span>
                    </div>
                    <div class="component-item">
                        <el-button type="primary" v-waves="">水波纹效果</el-button>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="box-card">
                    <div class="clearfix" slot="header">
                        <span>hover text</span>
                    </div>
                    <div class="component-item">
                        <mallki class-name="mallki-text" text="vue-element-admin"/>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="8">
                <el-card class="box-card">
                    <div class="clearfix" slot="header">
                        <span>Share</span>
                    </div>
                    <div class="component-item" style="height:420px;">
                        <dropdown-menu :items="articleList" style="margin:0 auto;" title="系列文章"/>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import PanThumb from '@/components/PanThumb'
    import MdInput from '@/components/MDinput'
    import Mallki from '@/components/TextHoverEffect/Mallki'
    import DropdownMenu from '@/components/Share/dropdownMenu'
    import waves from '@/directive/waves/index.js' // 水波纹指令

    export default {
        name: 'ComponentMixinDemo',
        components: {
            PanThumb,
            MdInput,
            Mallki,
            DropdownMenu
        },
        directives: {
            waves
        },
        watch: {
            // btn:'getGradient',
        },
        mounted() {
            // this.getGradient()
        },
        methods: {
            // 鼠标移动重新渲染渐变
            getGradient: () => {
                var btn = document.querySelector('.mouse-cursor-gradient-tracking')
                btn.onmousemove = function (e) {
                    var rect = e
                        .target
                        .getBoundingClientRect()
                    var x = e.clientX - rect.left
                    var y = e.clientY - rect
                        .top
                        btn
                        .style
                        .setProperty('--x', x +
                                'px')
                    btn
                        .style
                        .setProperty('--y', y +
                                'px')
                }
            }
        },
        data() {
            const validate = (rule, value, callback) => {
                if (value.length !== 6) {
                    callback(new Error('请输入六个字符'))
                } else {
                    callback()
                }
            }
            return {
                demo: {
                    title: ''
                },
                demoRules: {
                    title: [
                        {
                            required: true,
                            trigger: 'change',
                            validator: validate
                        }
                    ]
                },
                articleList: [
                    {
                        title: '基础篇',
                        href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2'
                    }, {
                        title: '登录权限篇',
                        href: 'https://juejin.im/post/591aa14f570c35006961acac'
                    }, {
                        title: '实战篇',
                        href: 'https://juejin.im/post/593121aa0ce4630057f70d35'
                    }, {
                        title: 'vue-admin-template 篇',
                        href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56'
                    }, {
                        title: '优雅的使用 icon',
                        href: 'https://juejin.im/post/59bb864b5188257e7a427c09'
                    }
                ]
            }
        }
    }
</script>

<style scoped="scoped">
    .mixin-components-container {
        background-color: #f0f2f5;
        padding: 30px;
        min-height: calc(100vh - 84px);
    }
    .component-item {
        min-height: 100px;
    }
</style>
<style scoped="scoped">
    .mouse-cursor-gradient-tracking {
        position: relative;
        background: #7983ff;
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        border: none;
        color: white;
        cursor: pointer;
        outline: none;
        overflow: hidden;
    }

    .mouse-cursor-gradient-tracking span {
        position: relative;
    }

    .mouse-cursor-gradient-tracking::before {
        --size: 0;
        content: '';
        position: absolute;
        left: var(--x);
        top: var(--y);
        width: var(--size);
        height: var(--size);
        background: radial-gradient(circle closest-side, pink, transparent);
        transform: translate(-50%, -50%);
        transition: width 0.2s ease, height 0.2s ease;
    }
    .mouse-cursor-gradient-tracking:hover::before {
        --size: 200px;
    }
</style>