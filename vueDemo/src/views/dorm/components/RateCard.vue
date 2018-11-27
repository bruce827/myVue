<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <h3 class="title">社区使用情况</h3>
    <div style="position:relative;">
      <!-- <mallki class-name="mallki-text" text="查看"/> -->
      <div style="margin-top:35px;" class="progress-item active">
        <span>康乐园一期</span>
        <el-progress :percentage="70"/>
      </div>
      <div class="progress-item">
        <span>康乐园二期</span>
        <el-progress :percentage="18"/>
      </div>
      <div class="progress-item">
        <span>格力华苑</span>
        <el-progress :percentage="0" status="danger"/>
      </div>
      <div class="progress-item">
        <span>银苑新村</span>
        <el-progress :percentage="100" status="success"/>
      </div>
       <div class="progress-item">
        <span>宏华</span>
        <el-progress :percentage="60" />
      </div>
       <div class="progress-item">
        <span>坦洲</span>
        <el-progress :percentage="60" />
      </div>
       <div class="progress-item">
        <span>随园</span>
        <el-progress :percentage="60" />
      </div>
       <div class="progress-item">
        <span>南屏沁园</span>
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
      return statusMap[status]
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
  .title{
    margin:0;
    padding:0;
    float:right;
    opacity:0.7;
  }
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
    // 深度作用选择器
    /deep/ .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    
    margin-bottom: 23px;
    box-shadow: 2px 2px 2px #888888;
    font-size: 16px;

  }
  .active {
    background: #f4faff;
    box-shadow: 0 0 0 #888888;
    
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
