<template>
  <div class="components-container ">
    <div style="width:100%">
      <section
        id="cd-timeline"
        class="cd-container cssanimations"
      >

        <div
          v-for="(card,index) in timeLineData "
          class="cd-timeline-block"
          :key="index"
        >
          <div class="cd-timeline-img">
            <div
              class="cd-num "
              :class=cardStus[index]
            >
              {{index+1}}
            </div>
          </div>

          <div
            class="cd-timeline-content"
            :class=cardStus[index]
          >
            <h2>{{card.nodeId}}</h2>
            <article>
              <label for="">审批人：</label>
              <span>{{card.approvePerson}}</span>
            </article>
            <article>
              <label for="">审批结果：</label>
              <span>{{card.approveHandle}}</span>
            </article>
            <article>
              <label for="">审批意见：</label>
              <span>{{card.option}}</span>
            </article>
            <article>
              <label for="">审批时间：</label>
              <span>{{card.dealTime}}</span>
            </article>

            <span class="cd-date">{{card.nodeTitle}}</span>
          </div>
        </div>

      </section>
    </div>
    <!-- 返回顶部按钮 -->
    <el-tooltip
      placement="top"
      content="返回顶部"
    >
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from "./BackToTopCompotent";
export default {
  name: "TimeLine",
  components: {
    BackToTop
  },
  created() {},
  data() {
    return {
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
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1" // 按钮的背景颜色 The background color of the button
      },
      timeLineData: [
        {
          nodeId: "监测科主任审批",
          approvePerson: "邵世龙",
          approveHandle: "同意",
          option:
            "这里分别以不设置margin，默认原始的距离；设置margin:10px auto,设置行距上下距离为10px；设置margin:30px auto，设置行距上下距离为30px.",
          dealTime: "2018-08-08"
        },
        {
          nodeId: "监测科主任审批",
          approvePerson: "邵世龙",
          approveHandle: "同意",
          option:
            "这里分别以不设置margin，默认原始的距离；设置margin:10px auto,设置行距上下距离为10px；设置margin:30px auto，设置行距上下距离为30px.",
          dealTime: "2019-09-09"
        },
        {
          nodeId: "监测科主任审批",
          approvePerson: "邵世龙",
          approveHandle: "同意",
          option:
            "这里分别以不设置margin，默认原始的距离；设置margin:10px auto,设置行距上下距离为10px；设置margin:30px auto，设置行距上下距离为30px.",
          dealTime: "2019-09-09"
        },
        {
          nodeId: "监测科主任审批",
          approvePerson: "邵世龙",
          approveHandle: "同意",
          option:
            "这里分别以不设置margin，默认原始的距离；设置margin:10px auto,设置行距上下距离为10px；设置margin:30px auto，设置行距上下距离为30px.",
          dealTime: "2019-09-09"
        },
        {
          nodeId: "监测科主任审批",
          approvePerson: "邵世龙",
          approveHandle: "同意",
          option:
            "这里分别以不设置margin，默认原始的距离；设置margin:10px auto,设置行距上下距离为10px；设置margin:30px auto，设置行距上下距离为30px.",
          dealTime: "2019-09-09"
        }
      ]
    };
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
          }
          // 其余节点表示流程正在进行中，并不能判断最后一位是否为结束节点
          _d.push(this.cardColor.normal);
        });
      }
      return _d;
    }
  },
  methods: {}
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
  /* margin-top: 8px; */
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
  display: flex;
  justify-content: center;
  align-content: center;
}
.cd-timeline-img .cd-num {
  /* background: blue; */
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  line-height: 60px;
  font-size: 24px;
  opacity: 0.7 !important;
}
.cd-timeline-img .warning {
  background: rgb(223, 184, 28);
}
.cd-timeline-img .danger {
  background: rgba(232, 86, 86);
}
.cd-timeline-img .primary {
  background: rgb(32, 158, 145);
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

.warning {
  background: rgba(223, 184, 28, 0.2);
}

.danger {
  background: rgba(232, 86, 86, 0.2);
}

.primary {
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
/* 返回顶部按钮样式 */
.placeholder-container div {
  margin: 10px;
}
</style>

