<template>
  <div class="chart-container">
    <!-- 充满整个屏幕 -->
    <chart height="calc(100vh - 84px)" width="100%" />
  </div>
</template>

<script>
import Chart from "@/components/Charts/bmapChart";

export default {
  name: "BmapChart",
  components: { Chart }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
/* .anchorBL {
  visibility: hidden;
}
.BMap_cpyCtrl.BMap_noprint.anchorBL {
  visibility: hidden;
} */
</style>