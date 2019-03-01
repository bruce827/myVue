<template>
  <div class="chart-container">
    <chart height="100%" width="100%"/>
  </div>
</template>

<script>
import Chart from '@/components/Charts/scatter'

export default {
  name: 'scatter',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  /* 上方工具栏高度 */
  height: calc(100vh - 84px);
}
</style>

