<template>
  <div class="components-container">
    <div style="width:100%">
      <section id="cd-timeline" class="cd-container cssanimations">
        <div v-for="(card,index) in timeLineData " class="cd-timeline-block">
          <div class="cd-timeline-img">
            <div class="kameleon-icon with-round-bg"></div>
          </div>
          <div class="cd-timeline-content" :class="cardStus[index]">
            <h4>{{card.nodeId}}</h4>
            <article v-if="card.approvePerson">
              <label v-text="index=='0'?'填单人：':'处理人：'"></label>
              <span>{{card.approvePerson}}</span>
            </article>
            <article v-if="card.approveHandle">
              <label>审批结果：</label>
              <span>{{card.approveHandle}}</span>
            </article>
            <article v-if="card.dealView">
              <label>审批意见：</label>
              <span>{{card.dealView}}</span>
            </article>
            <article v-if="card.dealTime">
              <label v-text="index=='0'?'填单时间：':'处理时间：'"></label>
              <span>{{card.dealTime}}</span>
            </article>
            <span class="cd-date">{{card.nodeTitle}}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: "TimeLine",
  components: {},
  props: {
    // orderStatus: {  //流程完成的节点
    //   type: Number
    // },
    // taskId: {  //数据
    //   type: String
    // },
  },
  data() {
    return {
      billCode: this.$route.query.billCode,
      getDataUrl: this.$store.state.url + "basic/activiti/queryFlowPathList",
      cardColor: {
        // 流程发起
        start: "warning",
        // 流程进行中
        normal: "primary",
        // 驳回
        reject: "danger",
        // 流程结束
        end: "success"
      },
      timeLineData: []
    };
  },
  methods: {
    getData() {
      var params = new URLSearchParams();
      params.append("billCode", this.billCode);
      this.$axios.post(this.getDataUrl, params).then(res => {
        this.loading = false;
        if (0 == res.data.code) {
          let timeLineData = res.data.data;
          for(let i = 0; i<timeLineData.length; i++){
            timeLineData[i].dealTime = timeLineData[i].dealTime.substr(0,16);
          }
          //查询成功
          this.timeLineData = res.data.data;
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    }
  },
  created() {
    this.getData();
  },
  computed: {
    cardStus() {
      let _d = [];
      // 如果只有一个节点，表明该节点已经结束，使用sucess样式
      if (this.timeLineData.length == 1) {
        _d.push(this.cardColor.end);
      } else {
        this.timeLineData.map((v, i) => {
          // 具体的值不重要，只关心节点的位置
          if (i == 0) {
            // 第一个节点表示开始
            _d.push(this.cardColor.start);
          }else if(i == this.timeLineData.length-1){
            // 最后一个节点如果有时间则结束
            if(v.dealTime){
              _d.push(this.cardColor.end);
            }else{
              _d.push(this.cardColor.normal);
            }
          }else{
            // 其余节点判断是否是驳回，如果不是则使用通用颜色
            if(v.approveHandle == "驳回"){
              _d.push(this.cardColor.reject);
            }else{
              _d.push(this.cardColor.normal);
            }
          }
          // 其余节点表示流程正在进行中，并不能判断最后一位是否为结束节点
          // _d.push(this.cardColor.normal);
        });
      }
      return _d;
    }
  }
};
</script>
<style scoped>
  /* 为了适应节点的文字换行，采用flex布局保持水平居中 */
  .components-container {
    display: flex;
    justify-content: center;
    margin: 30px 50px;
    position: relative;
  }

  el-card p {
    line-height: 1em;
  }

  article {
    margin-top: 8px;
  }

  #cd-timeline {
    margin-top: 15px;
    position: relative;
  }
  #cd-timeline:before {
    content: "";
    position: absolute;
    top: 0;
    left: 18px;
    height: 100%;
    width: 4px;
    background: #d7e4ed;
  }

  .cd-timeline-block {
    position: relative;
    margin: 2em 0;
  }
  .cd-timeline-block:after {
    content: "";
    display: table;
    clear: both;
  }
  .cd-timeline-block:first-child {
    margin-top: 0;
  }
  .cd-timeline-block:last-child {
    margin-bottom: 0;
  }

  .cd-timeline-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  @media only screen and (min-width: 1170px) {
    .cd-timeline-img {
      width: 60px;
      height: 60px;
      left: 50%;
      margin-left: -30px;
      /* chrome适配 */
      -webkit-transform: translateZ(0);
      -webkit-backface-visibility: hidden;
    }

    .cssanimations .cd-timeline-img.is-hidden {
      visibility: hidden;
    }

    .cssanimations .cd-timeline-img.bounce-in {
      visibility: visible;
      animation: cd-bounce-1 0.6s;
    }
  }
  @keyframes cd-bounce-1 {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    60% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  .cd-timeline-content {
    position: relative;
    margin-left: 60px;
    background: #209e91;
    padding: 1em;
    border-radius: 5px;
  }
  .cd-timeline-content:after {
    content: "";
    display: table;
    clear: both;
  }
  .cd-timeline-content h2 {
    color: #303e49;
    margin: 0;
    font-size: 18px;
  }
  .cd-timeline-content .cd-read-more,
  .cd-timeline-content .cd-date {
    font-size: 13px;
    display: inline-block;
  }
  .cd-timeline-content p {
    font-size: 13px;
    margin-bottom: 0;
  }
  .cd-timeline-content .cd-read-more {
    float: right;
    padding: 0.8em 1em;
    background: #acb7c0;
    color: white;
    border-radius: 0.25em;
  }
  .cd-timeline-content .cd-date {
    float: left;
    padding: 0.8em 0;
    opacity: 0.7;
  }
  .cd-timeline-content:before {
    content: "";
    position: absolute;
    top: 16px;
    right: 100%;
    height: 0;
    width: 0;
    border: 7px solid transparent;
    border-right: 7px solid white;
  }

  .cd-timeline-content.warning {
    background: rgba(223, 184, 28, 0.2);
  }

  .cd-timeline-content.danger {
    background: rgba(232, 86, 86, 0.2);
  }

  .cd-timeline-content.primary {
    background: rgba(32, 158, 145, 0.2);
  }

  .no-touch .cd-timeline-content .cd-read-more:hover {
    background-color: #ffffff;
  }

  @media only screen and (min-width: 1170px) {
    #cd-timeline::before {
      left: 50%;
      margin-left: -2px;
    }

    .cd-timeline-block {
      margin: 4em 0;
    }
    .cd-timeline-block:first-child {
      margin-top: 0;
    }
    .cd-timeline-block:last-child {
      margin-bottom: 0;
    }

    .cd-timeline-content {
      margin-left: 0;
      padding: 1.6em;
      width: 42%;
    }
    .cd-timeline-content::before {
      top: 24px;
      left: 100%;
      border-color: transparent;
      border-left-color: white;
    }
    .cd-timeline-content .cd-read-more {
      float: left;
    }
    .cd-timeline-content .cd-date {
      position: absolute;
      width: 100%;
      left: 137%;
      top: 6px;
      font-size: 16px;
    }

    .cd-timeline-content.warning:before {
      border-left-color: rgba(223, 184, 28, 0.2);
    }

    .cd-timeline-content.danger:before {
      border-left-color: rgba(232, 86, 86, 0.2);
    }

    .cd-timeline-content.primary:before {
      border-left-color: rgba(32, 158, 145, 0.2);
    }

    .cd-timeline-block:nth-child(even) .cd-timeline-content {
      float: right;
    }

    .cd-timeline-block:nth-child(even) .cd-timeline-content::before {
      top: 24px;
      left: auto;
      right: 100%;
      border-color: transparent;
      border-right-color: white;
    }
    .cd-timeline-block:nth-child(even)
      .cd-timeline-content.cd-timeline-content.warning::before {
      border-right-color: rgba(223, 184, 28, 0.2);
    }
    .cd-timeline-block:nth-child(even)
      .cd-timeline-content.cd-timeline-content.danger::before {
      border-right-color: rgba(232, 86, 86, 0.2);
    }
    .cd-timeline-block:nth-child(even)
      .cd-timeline-content.cd-timeline-content.primary::before {
      border-right-color: rgba(32, 158, 145, 0.2);
    }

    .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-read-more {
      float: right;
    }
    .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-date {
      left: auto;
      right: 137%;
      text-align: right;
    }

    .cssanimations .cd-timeline-content.is-hidden {
      visibility: hidden;
    }
    .cssanimations .cd-timeline-content.bounce-in {
      visibility: visible;
      animation: cd-bounce-2 0.6s;
    }
  }
  /* 不建议使用宽度小于1000px的显示器 */
  @media only screen and (min-width: 1170px) {
    /* inverse bounce effect on even content blocks */
    .cssanimations
      .cd-timeline-block:nth-child(even)
      .cd-timeline-content.bounce-in {
      animation: cd-bounce-2-inverse 0.6s;
    }
  }
  @keyframes cd-bounce-2 {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    60% {
      opacity: 1;
      transform: translateX(20px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes cd-bounce-2-inverse {
    0% {
      opacity: 0;
      transform: translateX(100px);
    }
    60% {
      opacity: 1;
      transform: translateX(-20px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>


