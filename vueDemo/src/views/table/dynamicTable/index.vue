<template>
  <div class="app-container">
    <!-- <div style="margin:0 0 5px 20px">{{ $t('table.dynamicTips1') }}</div> -->
    <fixed-thead/>

    <!-- <div style="margin:30px 0 5px 20px">{{ $t('table.dynamicTips2') }}</div> -->
    <!-- <unfixed-thead/> -->
  </div>
</template>

<script>
// 固定表头
import fixedThead from './fixedThead'
// 表头重排序
import unfixedThead from './unfixedThead'

export default {
  name: 'DynamicTable',
  components: { fixedThead, unfixedThead }
}
</script>

