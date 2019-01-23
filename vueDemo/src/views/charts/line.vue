<template>
  <div class="chart-container">
    <elTag style="margin:6px;">
      在safari浏览器上会有轻微的交互卡顿现象,目前没有找到原因
    </elTag>
    <chart height="100%" width="100%"/>
  </div>
</template>

<script>
import Chart from '@/components/Charts/lineMarker'

export default {
  name: 'LineChart',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

