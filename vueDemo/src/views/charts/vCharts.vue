<template>
  <div class="dashboard-editor-container">
      <el-tag style="margin-bottom:18px;">
          简单图表建议直接使用V-charts插件
      </el-tag>
    <el-row :gutter="32">
        <el-col :xs="24" :md="12">
            <el-card>

            </el-card>
        </el-col>
        <el-col :xs="24" :md="12">
            <el-card></el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>


export default {
  name: 'vCharts',
  components: {
      
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
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
@mixin test_div($color){
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
.el-card{
    
    // @include test_div(yellow);
    height: 100%;
}
</style>
