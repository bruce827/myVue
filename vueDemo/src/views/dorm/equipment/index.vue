<template>
  <div class="dashboard-editor-container">
    <!-- 待办工作 -->
    <el-container>
      <el-aside
        width="260px"
        class="icon-area dbgz"
        @click.native="jumpTarget(dashboardDataObj.todo.url)"
      >
        <div class="title" >
          待办工作
        </div>
        <div class="content-line"></div>
        <div class="content" >
          <div class="left icon-dbgz"></div>
          <div class="right"><span>{{dashboardDataObj.todo.num}}</span></div>
        </div>
      </el-aside>
      <el-main>
        <ul>
            <li v-for="context in dashboardDataObj.todo.content" @click="jumpTarget(context.url)">
            <div :title=context.text class="content-xj">{{context.text}}</div>
            <div class="datetime">{{context.dateTime}}</div>
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
        @click.native="jumpTarget(dashboardDataObj.done.url)"
      >
        <div class="title"  >
          已办工作
        </div>
        <div class="content-line"></div>
        <div class="content" >
          <div class="left icon-ybgz"></div>
          <div class="right"><span>{{dashboardDataObj.done.num}}</span></div>
        </div>
      </el-aside>
      <el-main>
        <ul>
           <li v-for="context in dashboardDataObj.done.content" @click="jumpTarget(context.url)">
            <div :title=context.text class="content">{{context.text}}</div>
            <div class="datetime">{{context.dateTime}}</div>
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
        @click.native="jumpTarget(dashboardDataObj.message.url)"
      >
        <div class="title">
          系统消息
        </div>
        <div class="content-line"></div>
        <div class="content" >
          <div class="left icon-xtxx"></div>
          <div class="right"><span>{{dashboardDataObj.message.num}}</span></div>
        </div>
      </el-aside>
      <el-main>
        <ul>
          <li v-for="context in dashboardDataObj.message.content" @click="jumpTarget(context.url)">
            <div :title=context.text class="content">{{context.text}}</div>
            <div class="datetime">{{context.dateTime}}</div>
          </li>
        </ul>
      </el-main>
    </el-container>
    <!-- 系统消息结束 -->
  </div>
</template>

<script>
// 页面单独引用element-ui 2.x样式
import './element-ui/lib/theme-chalk/index.css'
import elContainer from './element-ui/packages/container'
import elAside from './element-ui/packages/aside'
import elMain from './element-ui/packages/main'
const testData = {
        todo:{
          num:199,
          url:'#',
          content:[
            {
              dateTime:'2018-00-00 18:18:18',
              url:'#',
              text:
              `
                对于没心眼儿的人来说，他们总是不长记性，一个人可以连续伤害他们很多次，
                本来上一次就已经受伤很严重了，但是只要对方稍稍对他好一点，那他就会忘了疼，
                给对方再一次伤害他的机会，所以说他们好了伤疤忘了疼，总是把自己带进沟里，
                其实真的应该改一改冲动的性格，要不然还会在同一个地方继续跌倒，下面就来扒一扒这样的四个星座。
              `
            },
            {
              dateTime:'2018-00-00 18:18:18',
              text:
              `
                金牛座就是心太软，明明对方已经把他弄得遍体鳞伤
              `
            },
            {
              dateTime:'2018-00-00 18:18:18',
              text:
              `
                因为他们是在给那些伤害他的人新的机会，当然，金牛座就是这样容易在感情里迷失自己的人。
              `
            },
            {
              dateTime:'2018-00-00 18:18:18',
              text:
              `
              双子座老是不长记性
              `
            },
            {
              dateTime:'2018-00-00 18:18:18',
              text:
              `
              天秤座虽然智商高，但是他们太不会看人
              `
            },
            {
              dateTime:'2018-00-00 18:18:18',
              text:
              `
              处女座就是好了伤疤忘了疼的那种人
              `
            },

          ]
        },
        done:{
          num:0,
          url:'#',
          content:[
            {
              dateTime:'2018-00-00 18:18:18',
              text:
              `
                对于没心眼儿的人来说，他们总是不长记性，一个人可以连续伤害他们很多次，
               
              `
            }
          ]
        },
        message:{
          num:1223,
          url:'#',
          content:[
            {
              dateTime:'2018-00-00 18:18:18',
              text:
              `
               太容易把对方想得太善良了，但这个世界并不是他们想的那么简单而善良。
              `
            }
          ]
        }
      }
export default {
  components: {
    elContainer,
    elAside,
    elMain
  },
  data() {
    return {
      contentStyleObj: {
        height: "",
        asideWidth:'260px',
      },
      // 目前不用
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        }
      ],
      // 首页数据
      dashboardDataObj : testData,
    };
  },
  methods: {
    getHeight() {
      //   获取容器高度
      //   this.contentStyleObj.height = window.innerHeight - 100 + "px";
    },
    // 页面跳转操作
    jumpTarget(url){
      this.$router.push({path: url})
    },
  },
  created() {
    // window.addEventListener("resize", this.getHeight);
    // this.getHeight();
  },
  destroyed() {
    // window.removeEventListener("resize", this.getHeight);
  }
};
</script>


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
  height: -moz-calc(100vh - 84px);
  /*chrome safari*/
  height: -webkit-calc(100vh - 84px);
  /*Standard */
  height: calc(100vh - 84px);
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
  order: 1;
  align-self: center;
  font-family: "微软雅黑";
  font-size: 24px;
  color: #ffffff;
  width: 80%;
  height: 1px;
  background: rgba(255, 255, 255, 0.5);
}
.el-aside .content {
  order: 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 156px;
}
.el-aside .content .left {
  height: 100%;
  width: 50%;
  background-repeat: no-repeat;
}
.el-aside .content .right {
  color: #ffffff;
  width: 50%;
  text-align: center;
  line-height: 200px;
  font-size: 18px;
}
.el-aside .content .right span {
  font-family: "微软雅黑";
  font-size: 40px;
  color: #ffffff;
  text-align: center;
}
.el-aside .content .right::after {
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
}
.el-main ul {
  width: 100%;
  height: 100%;
  margin: 0;
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
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
