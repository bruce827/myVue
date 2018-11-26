<template>
  <!-- 首页 -->
  <div class="dashboard-editor-container">
    <!-- 四个数字提示板 -->
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    <!-- 折线图 -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>
    <!-- 房间使用情况 -->
    <el-row :gutter="32">
      <!-- 社区选择 -->
      <el-col :md="8">
        <div class="chart-wrapper" >
        </div>
      </el-col>
      <!-- 使用情况图表 -->
      <el-col :md="16">
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
// import UserMap from './components/UserMap'
import RateCard from './components/RateCard'

const line_data = function(){
  let d = [];
  for(let i=1;i<13;i++){
    d.push(Math.random()*1000)
  }
  return d
};
// 折线图数据
const lineChartData = {

  newVisitis: {
    expectedData: [122,233,111,33,1122,122,111,222,111,222,111],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }

}

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart,
    TransactionTable,
    // TodoList,
    BoxCard,
    // UserMap,
    RateCard,
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
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
</style>
