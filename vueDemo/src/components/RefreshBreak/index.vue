<template>
  <div>
    <p>
      刷新次数：{{warningMessage}}
    </p>
  </div>
</template>

<script>
export default {
  name: "RefreshBreak",
  props: {
    // 连续刷新次数,基本不需要改
    refreshCount:{
      type: Number,
      default: 3,
    },
    // 间隔时间，单位：秒
    intervalTime: {
      type: Number,
      default: 5,
    },
    // 默认值就是个玩笑，根据需求制定语料,一般页面是不需要提示语的
    warningMessages: {
      type: Array,
      default: [
        "还没有",
        "一次",
        "两次，告诉你啊，事不过三",
        "唉我去，你是不..."
      ]
      // required: true,
      // validator: function(value) {
      //   return value >= 0;
      // }
    }
  },
  data() {
    return {
      //   刷新次数
      reloadCount: 0,
      // warningMessages: [
      //   "还没有",
      //   "一次",
      //   "两次，告诉你啊，事不过三",
      //   "唉我去，你是不..."
      // ]
    };
  },
  computed: {
    //   数据绑定监听DOM
    warningMessage() {
      this.checkReload();
      return this.warningMessages[this.reloadCount];
    }
  },
  methods: {
    // 记录离开时间，并执行移除事件监听
    beforeUnloadHandler() {
      localStorage.setItem("lastUnloadAt", Math.floor(Date.now() / 1000));
    },
    /**
     * 检查localStage中的刷新次数
     * 检查reloadCount中是否有值，如果没有则记录，如果有则需要判断刷新时间
     */
    checkReload() {
      if (localStorage.getItem("reloadCount")) {
        this.reloadCount = parseInt(localStorage.getItem("reloadCount"));
      } else {
        //    如果没有则存储一次刷新记录
        this.reloadCount = 0;
        localStorage.setItem("reloadCount", this.reloadCount);
      }
      //   在此设置刷新的时间
      if (
        Math.floor(Date.now() / 1000) - localStorage.getItem("lastUnloadAt") <
        5
      ) {
        this.onReloadDetected();
      } else {
        this.reloadCount = 0;
        localStorage.setItem("reloadCount", this.reloadCount);
      }
    },
    // 确认用户刷新页面
    onReloadDetected() {
      this.reloadCount += 1;
      localStorage.setItem("reloadCount", this.reloadCount);
      // 事不过三，如果用户连续三次刷新页面，那么很遗憾。
      if (this.reloadCount === 3) {
        this.logout();
      }
    },
    // 注销用户
    logout(params) {
      // 初始化页面的localSortage
      this.resetReloadCount();
      // 注销用户
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    // 1、删除监听；2、删除localSortage中的key
    resetReloadCount() {
      window.removeEventListener("beforeunload", this.beforeUnloadHandler);
      localStorage.removeItem("lastUnloadAt");
      localStorage.removeItem("reloadCount");
    },
    // 为了记录window的beforerunload时间的时间，需要创建一个事件监听
    initializeReloadCount() {
      window.addEventListener("beforeunload", this.beforeUnloadHandler());
    }
  },
  created() {
    this.initializeReloadCount();
  },
  destroyed() {
    // 离开页面时解除绑定
    window.removeEventListener("beforeunload", this.checkReload());
  }
};
</script>

<style scoped>
</style>
