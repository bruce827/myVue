<template>
  <div class="dashboard-editor-container">
    <!-- 待办工作 -->
    <el-container>
      <el-aside
        width="260px"
        class="icon-area el-aside dbgz"
        @click.native="jumpTarget('/runningTasks')"
      >
        <div class="title">
          待办工作
        </div>
        <div class="content-line"></div>
        <div class="bottom">
          <div class="left icon-dbgz"></div>
          <div class="right"><span>{{msg.runningMsg.totalRecords}}</span></div>
        </div>
      </el-aside>
      <el-main>
        <ul class="li-container-xj">
          <!-- 如果超过容器的高度则不显示 -->
          <li
            v-for="(context,index) in msg.runningMsg.list"
            @click="jumpTarget(context.currentTaskUrl,{taskId:context.currentTaskId,nodeCode:context.nodeCode,billCode:context.billCode})"
            ref="historyMsg"
            :style="{ display: index >= testNum ? 'none': ''}"
          >
            <div
              :title=context.text
              class="content-xj"
            >{{context.instanceName}}</div>
            <div class="datetime">{{context.createTime}}</div>
          </li>
        </ul>
      </el-main>
    </el-container>
    <!-- 待办工作结束 -->
    <!-- 已办工作 -->
    <el-container>
      <el-aside
        width="260px"
        class="icon-area ybgz"
        ref="aside"
        @click.native="jumpTarget('/historyTasks')"
      >
        <div class="title">
          已办工作
        </div>
        <div class="content-line"></div>
        <div class="bottom">
          <div class="left icon-ybgz"></div>
          <div class="right"><span>{{msg.historyMsg.totalRecords}}</span></div>
        </div>
      </el-aside>
      <el-main>
        <ul class="li-container-xj">
          <li
            v-for="(context,index) in msg.historyMsg.list"
            @click="jumpTarget(context.currentTaskUrl,{historyTasks:true,billCode:context.billCode})"
            :style="{ display: index >= testNum ? 'none': ''}"
          >
            <div
              :title=context.text
              class="content-xj"
            >{{context.instanceName}}</div>
            <div class="datetime">{{context.createTime}}</div>
          </li>
        </ul>
      </el-main>
    </el-container>
    <!-- 已办工作结束 -->
    <!-- 系统消息 -->
    <el-container>
      <el-aside
        width="260px"
        class="icon-area xtxx"
        @click.native="jumpTarget('/systemmsg')"
      >
        <div class="title">
          系统消息
        </div>
        <div class="content-line"></div>
        <div class="bottom">
          <div class="left icon-xtxx"></div>
          <div class="right"><span>{{msg.systemMsg.totalRecords}}</span></div>
        </div>
      </el-aside>
      <el-main>
        <ul class="li-container-xj">
          <li
            v-for="context in msg.systemMsg.list"
            @click="jumpTarget('/systemmsg')"
            :style="{ display: index >= testNum ? 'none': ''}"
          >
            <div
              :title=context.msgContent
              class="content-xj"
            >{{context.msgContent}}</div>
            <div class="datetime">{{context.commitDate}}</div>
          </li>
        </ul>
      </el-main>
    </el-container>
    <!-- 系统消息结束 -->
  </div>
</template>

<script>
// 页面单独引用element-ui 2.x样式
import elContainer from "../basic/element-ui@2.4.6/packages/container";
import elAside from "../basic/element-ui@2.4.6/packages/aside";
import elMain from "../basic/element-ui@2.4.6/packages/main";

export default {
  components: {
    elContainer,
    elAside,
    elMain
  },
  data() {
    return {
      screenHeight: document.documentElement.clientHeight, //屏幕高度，宽度不关心
      // 能显示得下的条数，正常情况下显示5条
      testNum: 5,
      count: {
        needJob: "",
        doneJob: "",
        systemMsg: ""
      },
      msg: {
        historyMsg: {},
        runningMsg: {},
        systemMsg: {}
      },
      getMsgCountUrl: this.$store.state.url + "webauth/home/getMsgCount", //查询首页显示项的条数

      contentStyleObj: {
        height: "",
        asideWidth: "260px"
      }

      // 首页数据
      // dashboardDataObj : testData,
    };
  },
  watch: {
    screenHeight: function() {
      //监听屏幕高度变化
      // var oIframe = document.getElementById(divId);
      this.getHeight('runningMsg');
    }
  },
  methods: {
    getHeight(name) {
      console.log("计算尺寸");

      // 页面渲染后计算每个el-main 能存放多少li,等于父级窗口高度-padding*2
      let totalHeightNum = document.querySelector(".li-container-xj")
        .offsetHeight;
      let liNum = Math.floor(totalHeightNum / 24);
      //  将多余的li删除
      this.testNum = liNum;

      // Object.keys(this.msg).forEach(key => {
      //   // 不关心位置，只关心content的数量
      //   console.log(key);
      //   console.log(this.msg[key])
      //   // if(key){

      // let _targetLen = this.msg[name].list.length;
      // let _targetLen = this.msg.runningMsg.list.length;
      // if (_targetLen > liNum) {
      //  将后面的li删除

      // let _lis = this.$refs[name];
      // let _num = liNum;
      // while(_num < _targetLen){
      //   _lis[_num].style.display = 'none';
      //   _num++
      // }
      // }
    },
    // 页面跳转操作
    jumpTarget(url, query) {
      this.$router.push({ path: url, query: query });
    },
    getMsgCount() {
      this.$axios.post(this.getMsgCountUrl).then(res => {
        if (0 == res.data.code) {
          //查询成功
          this.count.needJob = res.data.data.needJob;
          this.count.doneJob = res.data.data.doneJob;
          this.count.systemMsg = res.data.data.systemMsg;
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    // 代办
    runningTasks() {
      var params = new URLSearchParams();
      params.append("instanceName", "");
      params.append("billCode", "");
      params.append("billType", "");
      params.append("creator", "");
      params.append("createTimeStart", "");
      params.append("createTimeStop", "");
      this.$axios
        .post(
          this.$store.state.url +
            "basic/activiti/queryRunningTaskList?pageSize=15&pageNum=1",
          params
        )
        .then(res => {
          if (0 == res.data.code) {
            //查询成功
            this.msg.runningMsg = res.data.data;
            if (this.msg.runningMsg.list) {
              // console.log(this.msg.runningMsg.list);
              // 调整li的数量,由于三个区域的高度是相同的，所以计算任意一个数值就可以
              this.getHeight("runningMsg");
            }
            this.$nextTick(() => {});
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error"
            });
          }
        });
    },
    // 已办
    historyTasks() {
      var params = new URLSearchParams();
      params.append("instanceName", "");
      params.append("billCode", "");
      params.append("billType", "");
      params.append("createTimeStart", "");
      params.append("createTimeStop", "");
      this.$axios
        .post(
          this.$store.state.url +
            "basic/activiti/queryHistoryTaskList?pageSize=15&pageNum=1",
          params
        )
        .then(res => {
          if (0 == res.data.code) {
            //查询成功
            this.msg.historyMsg = res.data.data;
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error"
            });
          }
        });
    },
    // 系统消息
    systemMsg() {
      var params = new URLSearchParams();
      params.append("state", "1");
      this.$axios
        .post(
          this.$store.state.url +
            "webauth/home/listSystemMsg?pageSize=15&pageNum=1",
          params
        )
        .then(res => {
          if (0 == res.data.code) {
            //查询成功
            this.msg.systemMsg = res.data.data;
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
  mounted: function() {
    // 页面渲染后计算每个el-main 能存放多少li,等于父级窗口高度-padding*2
    // let totalHeightNum =document.querySelector(".li-container-xj").offsetHeight;
    // let liNum = Math.floor(totalHeightNum / 24);
    // console.log(liNum);

    // //  将多余的li删除
    // console.log(this.msg);

    // // Object.keys(this.msg).forEach(key => {
    // //   // 不关心位置，只关心content的数量
    // //   console.log(key);
    // //   console.log(this.msg[key])
    // //   // if(key){

    // let _targetLen = this.msg.runningMsg.list.length;
    // if (_targetLen > liNum) {
    //   //  将后面的li删除
    //   let _lis = this.$refs[];
    //   let _num = liNum;
    //   while(_num < _targetLen){
    //     _lis[_num].style.display = 'none';
    //     _num++
    //   }
    // }
    //   // }

    // });
    var _this = this;
    window.onresize = function() {
      // 定义窗口大小变更通知事件
      _this.screenHeight = document.documentElement.clientHeight; //窗口高度
    };
  },
  updated() {
    // this.getHeight("runningMsg");
  },
  created() {
    // this.getMsgCount();
    this.runningTasks();
    this.historyTasks();
    this.systemMsg();
    // window.addEventListener("resize", this.getHeight);
    // this.getHeight();
  },
  destroyed() {
    // window.removeEventListener("resize", this.getHeight);
  }
};
</script>

<style scoped src="../basic/element-ui@2.4.6/lib/theme-chalk/index.css"></style>
<style rel="stylesheet/scss" scoped>
/* @import './element-ui/lib/theme-chalk/index.css'; */
.icon-dbgz {
  background: url("./icon/dbgz.png") center right;
  background-size: 70%;
}

.icon-ybgz {
  background: url("./icon/ybgz.png") center right;
  background-size: 70%;
}

.icon-xtxx {
  background: url("./icon/xtxx.png") center right;
  background-size: 70%;
}

@media (min-width: 1024px) {
  body {
    font-size: 18px;
  }
}
/*>=1024的设备*/
/*>=1100的设备*/
/*>=1280的设备*/
.dashboard-editor-container {
  padding: 20px 12px 20px 12px !important;
  height: 92vh;
  /*Firefox*/
  height: -moz-calc(100vh - 76px);
  /*chrome safari*/
  height: -webkit-calc(100vh - 76px);
  /*Standard */
  height: calc(100vh - 76px);
  padding: 32px;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  align-content: stretch;
  align-items: stretch;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: transparent;
  text-align: center;
  overflow: hidden;
  border-radius: 6px 0 0 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* 已办工作 */
  /* 系统消息 */
}
.el-aside:hover {
  opacity: 0.7;
  cursor: pointer;
}
.el-aside .title {
  order: 1;
  align-self: center;
  font-family: "微软雅黑";
  font-size: 24px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%;
}
.el-aside .content-line {
  order: 2;
  align-self: center;
  font-family: "微软雅黑";
  font-size: 24px;
  color: #ffffff;
  width: 80%;
  height: 1px;
  background: rgba(255, 255, 255, 0.5);
}
.el-aside .bottom {
  order: 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 156px;
}
.el-aside .bottom .left {
  height: 100%;
  width: 50%;
  background-repeat: no-repeat;
}
.el-aside .bottom .right {
  color: #ffffff;
  width: 50%;
  text-align: center;
  line-height: 200px;
  font-size: 18px;
}
.el-aside .bottom .right span {
  font-family: "微软雅黑";
  font-size: 40px;
  color: #ffffff;
  text-align: center;
}
.el-aside .bottom .right::after {
  content: " 项";
}
.el-aside.dbgz {
  background: -webkit-linear-gradient(left top, #03aafd 0, #4c99bf 70%);
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, #03aafd, #4c99bf 70%);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, #03aafd 0, #4c99bf 70%);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom right, #03aafd 0, #4c99bf 70%);
  /* 标准的语法 */
}
.el-aside.ybgz {
  background: -webkit-linear-gradient(left top, #fc5529 0, #d2694d 70%);
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, #fc5529, #d2694d 70%);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, #fc5529 0, #d2694d 70%);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom right, #fc5529 0, #d2694d 70%);
  /* 标准的语法 */
}
.el-aside.xtxx {
  background: -webkit-linear-gradient(left top, #00ffc1 0, #36ae91 70%);
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, #00ffc1, #36ae91 70%);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, #00ffc1 0, #36ae91 70%);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom right, #00ffc1 0, #36ae91 70%);
  /* 标准的语法 */
}

.el-main {
  background-color: #ffffff;
  color: #333;
  display: flex;
  align-items: center;
  font-family: "微软雅黑";
  /* 暴力截断消息，禁止滚动条 */
  overflow: hidden;
}
.el-main ul {
  position: fix;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
}
.el-main ul li {
  font-size: 14px;
  margin-bottom: 4px;
  cursor: pointer;
}
.el-main ul li:hover {
  color: #03aafd;
}
.el-main ul li .content-xj {
  float: left;
  width: 74%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-main ul li .datetime {
  float: right;
  width: 22%;
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  font-family: "Consolas", "Monaco";
}

.el-container {
  margin-bottom: 12px;
  border: 1px solid #d0cece;
  border-left: none;
  border-radius: 6px;
  box-shadow: -1px 1px 2px #888888;
  /* 无论多出多少条消息都保持高度 */
  flex-shrink: 1;
  flex-grow: 1;
  /* 屏幕高度三等分 */
  flex-basis: calc((100vh - 76px) / 3);
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
