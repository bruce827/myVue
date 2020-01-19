<template>
  <div class="components-container">
    <el-card title="插件说明">
      <RefreshBreak 
        :refreshCount='3'
        :intervalTime='5'
        :warningMessages = 'warningMessages'
      />
      就如使用操作系统一样，一些用户可能会有喜欢频繁刷新页面的习惯，在BS端实现了数据绑定之后，其实反复的刷新页面并不能使数据刷新，反而会使得项目发生不可预知的问题。
      基于此背景，本插件解决如下问题：
      <ol>
        <li>要如何记录用户刷新页面的次数：</br>
          因为每次刷新页面都会重置变量，所以这里我打算采用<strong>localStorage</strong>进行记录。
        </li>
        <li>
          怎么判断用户是快速刷新网页还是过了好长时间再刷新的网页：</br>
          这个问题有点费劲，因为用户在页面停留30分钟以上的时间后，刷新页面是一件很正常不过的事情，我们不能要求用户手动去清楚浏览器缓存来来解决问题。
          为了保证用户在一段时间回来后可以正常的刷新页面，我们还必须记录用户离开页面的时间。
        </li>
        <li>
          我们如何判定用户何时离开：</br>
          使用浏览器的<strong>beforunload</strong>方法。
        </li>
      </ol>
    </el-card>
  </div>
</template>

<script>
import RefreshBreak from '@/components/RefreshBreak'
export default {
  name: "refreshBreak",
  components:{
    RefreshBreak
  },
  data() {
    return {
      warningMessages: [
        "还没有",
        "一次",
        "两次，告诉你啊，事不过三",
        "唉我去，你是不..."
      ]
    };
  },
};
</script>

<style  scoped>
.components-container {
  position: relative;
  height: 100vh;
}

.left-container {
  background-color: #f38181;
  height: 100%;
}

.right-container {
  background-color: #fce38a;
  height: 200px;
}

.top-container {
  background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95e1d3;
  height: 100%;
}
ol li {
    padding: 5px;
}
</style>
