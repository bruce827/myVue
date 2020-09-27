<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <!-- <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div> -->
    <!-- 智能试题淘汰率，始业教育平均分数，意见处理率， -->
    <div style="position:relative;">
      <!-- <pan-thumb :image="avatar" class="panThumb"/> -->
      <mallki class-name="mallki-text" text="平台数据分析"/>
      <div style="padding-top:35px;" class="progress-item">
        <span>智能试题淘汰率</span>
        <el-progress :percentage="70"/>
      </div>
      <div class="progress-item">
        <span>始业教育平均分数</span>
        <el-progress :percentage="18"/>
      </div>
      <div class="progress-item">
        <span>平台意见处理率</span>
        <el-progress :percentage="0" />
      </div>
      <div class="progress-item">
        <span>部门意见处理率</span>
        <el-progress :percentage="100" status="success"/>
      </div>
      <div class="progress-item">
        <span>员工开发人员比例</span>
        <el-progress :percentage="60" />
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  components: { PanThumb, Mallki },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      if(status){
        return statusMap[status]
      }
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    /deep/ .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 23px;
    font-size: 16px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
