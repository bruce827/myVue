<template>
  <div class="dashboard-editor-container">
    <el-tag style="margin-bottom:18px;">
      简单图表建议直接使用V-charts插件(按需引入)，由于是对echarts的封装，所以肯定不够灵活。
      建议在使用v-charts之前应先想好图表的类型，如果没想好可以
    </el-tag>
    <el-button
      type="text"
      class="button"
      @click="showImg = !showImg"
    >参考下图↓</el-button>
    <transition
      name="el-zoom-in-center"
      v-if="showImg"
    >
      <el-row
        :gutter="32"
        style="margin-bottom:18px;"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="./pic/chartGuide.png"
            alt=""
            preview="99"
            preview-text="圖表輔助決策引導"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="showImg = !showImg"
              >好了，我知道了</el-button>
            </div>
          </div>
        </el-card>

      </el-row>
    </transition>
    <!-- 模型驱动示例 -->
    <el-row :gutter="32">
      <el-col
        :xs="24"
        :md="12"
      >
        <el-card >
          <div id="basic" ref="basic" >

          </div>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :md="12"
      >
        <el-card>
          
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 图片预览插件
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
// 如果项目需要，可以全部引入，建议按需按需引入
import { autoChart } from '@antv/chart-advisor';
import { type }  from '@antv/dw-analyzer';

// 字符串只保留数字方法
String.prototype.GetNum = function() {
  var regEx = /[^\d]/g;
  return this.replace(regEx, "");
};
export default {
  name: "avaCharts",
  components: {
    preview,
  },
  data() {
    return {
      // 默认收起图表导航图片
      showImg: false,
    };
  },
  created() {
  },
  computed: {
  },
  mounted(){
    // console.log(this.$refs.basic);
    const container = this.$refs.basic
    // const container = document.getElementById('basic');
    const basicData = [
      {field1: 'a', field2: 100},
      {field1: 'b', field2: 300},
      {field1: 'c', field2: 800},
    ];
    const info = type(basicData);

    // autoChart(container, basicData, {toolbar: true, development: true});
    autoChart(container, info, {toolbar: true, development: true});

  },
  methods: {

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
@mixin test_div($color) {
  border: 1px $color solid;
  height: 300px;
}

.el-row {
  // @include test_div(blue);
}
.el-col {
  // @include test_div(red);
  // padding: 6px 06px 0;
}
.el-card {
  // @include test_div(yellow);
  height: 100%;
}
img {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-row {
  margin-top: 10px;
}
</style>
