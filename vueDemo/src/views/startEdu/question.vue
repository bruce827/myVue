<template>
  <div class="app-container">
    <!-- 采用flex布局，保证中间区域水平居中，两端固定比例-->
    <el-row type="flex" class="row-bg" justify="space-between">
      <!-- 左侧 -->
      <el-col :span="4">
        <div class="grid-content">
          <el-card class="box-card ">
            <div slot="header">
              <a class="link-type link-title" target="_blank" href="">
                <!-- {{ $t('theme.documentation') }} -->
                添加题目
              </a>
            </div>
            <div class="box-item guide_add">
              <!-- <span class="field-label">{{ $t('theme.change') }} : </span> -->
              <!-- <el-switch v-model="theme"/> -->
              <!-- <code style="margin-top:15px;">{{ $t('theme.tips') }}</code> -->
              <code>
                请先在此选择题型，如第一次使用请查看<a class="link-type link-title" target="_blank" href="" @click.prevent.stop="guide">使用引导</a>
              </code>
              <el-button class="option_button" ref="" :class="{active:isToggle}" @click="createRadio()">单选题</el-button>
              <el-button class="option_button" :class="{active:isToggle}" @click="createMultiple()">多选题</el-button>
              <el-button class="option_button" :class="{active:isToggle}" @click="createJude()">判断题</el-button>
            </div>

          </el-card>
        </div>
      </el-col>
      <!-- 中间 -->
      <el-col :span="14">
          <el-card class="q_content_wrap guide_title" :class = "{active:isToggle}" @click='isActive()'>
            <h2>始业教育考试</h2>
            <sub>你可以用大约30分钟的时间填写始业教育问卷</sub>
            <div class="full-mark">
                <p>总分</p>
                <div class="score">
                    100
                </div>
            </div>
          </el-card>
        <div class="grid-content ">
          <el-card class="q_content_wrap" :class = "{active:isToggle}" @click='isActive()'>
            <!-- 试题卡 -->
            <div class="q_content guide_qus">
              <!-- 标题 -->
              <div class="q_title_wrap">
                <!-- 标题序号 -->
                <div class="q_seq">
                  1
                </div>
                <!-- 标题内容 -->
                <div class="content_editable">
                  <div class="q_title" edit-type="question" contenteditable="false" placeholder="点击编辑题目名称（单选题）" tabindex="0">
                    我受背痛之苦<span class="evaluation_score">(分值：1分)</span>
                  </div>
                </div>
              </div>

              <div class="q_desc_wrap none">
                <div class="content_editable">
                  <div class="q_desc" edit-type="desc" contenteditable="false" placeholder="点击编辑题目说明" tabindex="0">
                  </div>
                </div>
              </div>
              <!--内容  -->
              <div class="q_option_list">

                <ul class="q_option_ul ui-sortable" data-column="1">
                  <li class="option_item" id="option_5bd01e7b92beb52179fd1fd4" oid="5bd01e7b92beb52179fd1fd4">
                    <div class="option_title_wrap"><span class="icon_wj btn_icon btn_handle show_title" data-title="长按拖动选项"></span>
                      <div class="content_editable"><i class="icon_wj icon_radio"></i>
                        <el-radio v-model="radio" label="1">选项一</el-radio>
                        <!-- <div class="option_title" edit-type="option" contenteditable="false" placeholder="点击编辑选项" tabindex="0">总是<span class="option_score">(分值：4分)</span></div> -->
                      </div>
                      <div class="option_operate"><a class="icon_wj btn_icon btn_option_setting show_title" data-title="设置"></a><a class="icon_wj btn_icon btn_option_del show_title" data-title="删除"></a></div>
                    </div>
                  </li>
                  <li class="option_item" id="option_5bd01e7b92beb52179fd1fd5" oid="5bd01e7b92beb52179fd1fd5">
                    <div class="option_title_wrap"><span class="icon_wj btn_icon btn_handle show_title" data-title="长按拖动选项"></span>
                      <div class="content_editable"><i class="icon_wj icon_radio"></i>
                        <el-radio v-model="radio" label="2">备选项</el-radio>
                        <!-- <div class="option_title" edit-type="option" contenteditable="false" placeholder="点击编辑选项" tabindex="0">经常<span class="option_score">(分值：3分)</span></div> -->
                      </div>
                      <div class="option_operate"><a class="icon_wj btn_icon btn_option_setting show_title" data-title="设置"></a><a class="icon_wj btn_icon btn_option_del show_title" data-title="删除"></a></div>
                    </div>
                  </li>
                  <li class="option_item" id="option_5bd01e7b92beb52179fd1fd6" oid="5bd01e7b92beb52179fd1fd6">
                    <div class="option_title_wrap"><span class="icon_wj btn_icon btn_handle show_title" data-title="长按拖动选项"></span>
                      <div class="content_editable"><i class="icon_wj icon_radio"></i>
                        <el-radio v-model="radio" label="2">备选项</el-radio>
                        <!-- <div class="option_title" edit-type="option" contenteditable="false" placeholder="点击编辑选项" tabindex="0">有时<span class="option_score">(分值：2分)</span></div> -->
                      </div>
                      <div class="option_operate"><a class="icon_wj btn_icon btn_option_setting show_title" data-title="设置"></a><a class="icon_wj btn_icon btn_option_del show_title" data-title="删除"></a></div>
                    </div>
                  </li>
                  <li class="option_item" id="option_5bd01e7b92beb52179fd1fd7" oid="5bd01e7b92beb52179fd1fd7">
                    <div class="option_title_wrap"><span class="icon_wj btn_icon btn_handle show_title" data-title="长按拖动选项"></span>
                      <div class="content_editable"><i class="icon_wj icon_radio"></i>
                        <el-radio v-model="radio" label="2">备选项</el-radio>
                        <!-- <div class="option_title" edit-type="option" contenteditable="false" placeholder="点击编辑选项" tabindex="0">很少<span class="option_score">(分值：1分)</span></div> -->
                      </div>
                      <div class="option_operate"><a class="icon_wj btn_icon btn_option_setting show_title" data-title="设置"></a><a class="icon_wj btn_icon btn_option_del show_title" data-title="删除"></a></div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- 底部按钮 -->
              <div class="q_option_operate">
                <a class="btn_text_icon btn_add_single" operate-type="add_row" oid="5bd01e7b92beb52179fd1fa2">
                  <svg-icon icon-class="plus" style="fill:#1296db;" />
                  <i class="icon_wj icon_add"></i>添加选项</a>

                <a class="btn_text_icon btn_add_more" operate-type="add_more_row" oid="5bd01e7b92beb52179fd1fa2">
                  <svg-icon icon-class="jian" />
                  <i class="icon_wj icon_add_more"></i>删除选项</a>
              </div>
              <!-- 操作按钮 -->
              <div class="q_operate">
                  <a href="">
                    <svg-icon icon-class='drag'/>
                  </a>
                  <a href="">
                    <svg-icon icon-class='add_photo'/>
                  </a>
                  <a href="">
                     <svg-icon icon-class='del'/>
                  </a>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="4">
        <div class="grid-content guide_content">
          <el-card>
             <div slot="header">
              <a class="link-type link-title" target="_blank" href="">
                <!-- {{ $t('theme.documentation') }} -->
                题目设置
              </a>
            </div>
            <div class="box-item">
              <!-- <span class="field-label">{{ $t('theme.change') }} : </span> -->
              <!-- <el-switch v-model="theme"/> -->
              <!-- <code style="margin-top:15px;">{{ $t('theme.tips') }}</code> -->
              <code>
                在此对整题进行设置
              </code>
              
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
// import $ from 'jquery'
// 引导动画插件
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './defineSteps'
export default {
  name: "Theme",
  data() {
    var A_question_list = [];
    return {
      isToggle: false,
      driver: null

    };
  },
  mounted(){
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    },
    isActive() {
      // $('.option_button').each(function(i,v){
      //   console.log(i,v);

      // });
      this.isToggle = !this.isToggle;
    },
    createRadio() {
      // 单选题
      console.log("单选题");
    },
    createMultiple() {
      // 多选题
    },
    createJude() {
      // 判断题
    }
  },
  watch: {
    theme() {
      toggleClass(document.body, "custom-theme");
    }
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
// @import "./question.css";
@mixin textDiv {
  border: red 1px solid;
}
el-card{
  margin-bottom:24px;
}
// flex布局
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
// flex布局结束
.app-container {
  padding-left: 0;
  padding-right: 0;
  background: #fff;
}
.field-label {
  vertical-align: middle;
}
.box-card {
  width: 200px;
  max-width: 100%;
  /* margin: 20px auto; */
}

.block {
  padding: 30px 24px;
}

.tag-item {
  margin-right: 15px;
}
.box-item {
  text-align: center;
}
.option_button {
  margin: 6px auto;
}
.active {
  border: 1px cornflowerblue solid;
  color: cornflowerblue;
}
  /*试卷标题*/
.full-mark{
  position: absolute;
  top:0;
  right: 0;
  margin: 10px;
  text-align: center;
  background: #00BF6F;
  color: #fff;
  height: 80px;
  width: 80px;
  padding: 0px !important;
  border-radius: 10px;
  .score{
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
}
/* 中间试题列表区域 */
.q_content_wrap {
  // @include textDiv();
  position: relative;
  outline: none;
  display: block;
  color: #484848;
  text-align: left;
  margin-bottom:24px;

  /* 试题 */
  .q_content {
    position: relative;
    padding: 18px 40px 18px 30px;
    color: #484848;
    text-align: left;
    // 标题
    .q_title_wrap {
      margin-right: 336px;
      position: relative;
      padding-left: 40px;

      .q_seq {
        position: absolute;
        left: 0;
        top: 6px;
        color: #484848;
        font-size: 18px;
      }
      .content_editable {
        box-sizing: border-box;
        border-radius: 2px;
        border: solid 1px transparent;
        color: #484848;
        .q_title {
          padding: 6px 10px;
          font-size: 16px;
        }
        .evaluation_score {
          color: #d8d8d8;
          margin-left: 12px;
        }
      }
    }
  }
  .q_option_operate {
    padding: 24px 0 0 44px;
    .btn_text_icon {
      padding: 3px 8px 3px 6px;
      margin-right: 18px;
      vertical-align: middle;
    }
    .btn_text_icon:hover {
      background-color: #f4f4f4;
      border-radius: 2px;
    }
  }
  // 操作按钮
  .q_operate {
    // @include textDiv();
    position: absolute;
    right: 40px;
    top: 22px;

    .btn_question_sort {
      background-position: 0 -24px;
    }
    a{
      margin-left: 24px;
      svg-icon{
        // fill: #;
      }
    }
  }
}
</style>
