<template>
  <div class="dashboard-editor-container">
    <el-tag style="margin-bottom:18px;">
      简单图表建议直接使用V-charts插件(按需引入)，由于是对echarts的封装，所以肯定不够灵活。
      建议在使用v-charts之前应先想好图表的类型，如果没想好可以
    </el-tag>
    <el-button
      type="text"
      class="button"
      @click="showImg = !showImg"
    >参考下图↓</el-button>
    <transition
      name="el-zoom-in-center"
      v-if="showImg"
    >
      <el-row
        :gutter="32"
        style="margin-bottom:18px;"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="./pic/chartGuide.png"
            alt=""
            preview="99"
            preview-text="圖表輔助決策引導"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="showImg = !showImg"
              >好了，我知道了</el-button>
            </div>
          </div>
        </el-card>

      </el-row>
    </transition>
    <el-row :gutter="32">
      <el-col
        :xs="24"
        :md="12"
      >
        <el-card>
          <ve-line
            :data="chartData.lineData"
            :grid="grid"
            :title="title.line"
            :legend="{show:false}"
          ></ve-line>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :md="12"
      >
        <el-card>
          <ve-bar
            :data="chartData.barData"
            :grid="grid"
            :title="title.bar"
            :legend="{show:true,right:'right'}"
            :settings="chartSettings.bar"
            :xAxis="xAxis.bar"
            :tooltip="tooltip.bar"
            :extend="chartExtends.bar"
          ></ve-bar>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col
        :xs="24"
        :md="12"
      >
        <el-card>
          <ve-pie
            :data="chartData.pieData"
            :grid="grid"
            :title="title.pie"
            :legend="{show:false,right:'right'}"
          >
          </ve-pie>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :md="12"
      >
        <el-card>
          <ve-bar
            :data="chartData.barData"
            :grid="grid"
            :title="title.bar"
            :legend="{show:true,right:'right'}"
            :settings="chartSettings.bar"
            :xAxis="xAxis.bar"
            :tooltip="tooltip.bar"
            :extend="chartExtends.bar"
          ></ve-bar>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col
        :xs="24"
        :md="12"
      >
        <el-card>
          <ve-pie
            :data="chartData.pieData"
            :grid="grid"
            :title="title.wordCloud"
            :legend="{show:false,right:'right'}"
          >
          </ve-pie>
        </el-card>
      </el-col>
      <!-- <el-col
        :xs="24"
        :md="12"
      >
        <el-card>
          <ve-bar
            :data="chartData.barData"
            :grid="grid"
            :title="title.bar"
            :legend="{show:true,right:'right'}"
            :settings="chartSettings.bar"
            :xAxis="xAxis.bar"
            :tooltip="tooltip.bar"
            :extend="chartExtends.bar"
          ></ve-bar>
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
// 图片预览插件
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
// 如果项目需要，可以全部引入，建议按需按需引入
import { VeLine, VeBar, VePie } from "v-charts";

import lineData from "./chartData/line.json";
import barData_original from "./chartData/bar.json";
import pieData_original from "./chartData/pie.json";


// 数组对象属性降序排序
function compareObj(property) {
  return function(obj1, obj2) {
    var value1 = obj1[property];
    var value2 = obj2[property];
    return value2 - value1; // 降序
  };
}

// 字符串只保留数字方法
String.prototype.GetNum = function() {
  var regEx = /[^\d]/g;
  return this.replace(regEx, "");
};
export default {
  name: "vCharts",
  components: {
    preview,
    VeLine,
    VeBar,
    VePie
  },
  data() {
    return {
      // 默认收起图表导航图片
      showImg: false,
      grid: {
        right: "7%",
        bottom: 0
      },
      title: {
        line: {
          text: "2016-2017年北京空气质量",
          subtext: "取值范围：[15-450]",
          left: "center"
        },
        bar: {
          text: "2016年虎牙主播打赏情况",
          subtext: "共统计556个知名主播主播",
          left: "center"
        },
        pie:{
          text: "电商内存品牌知名度",
          subtext:"统计商品评论数量",
          left:'center'

        },
        wordCloud:{
          text:"数据分析行业关键技能",
          subtext:'数据来源：招聘网站爬取',
          left:'center'

        }
      },
      xAxis: {
        bar: {
          axisLabel: {
            formatter: function(v) {
              return v / 10000 + "万";
            }
          }
        }
      },
      tooltip: {
        bar: {
          formatter: parmas => {
            let _temp = "";
            let _detail = this.barData.detail.filter(v => {
              return v.type == parmas.name;
            });
            _temp = (function() {
              for (let i = 1; i <= 3; i++) {
                //有些排行可能没有3个主播
                if (_detail[i - 1]) {
                  let _charge = _detail[i - 1].value / 10000 + "万";
                  _temp +=
                    i + ":" + _detail[i - 1].name + "(" + _charge + ")<br />";
                } else {
                  console.log("到头了");
                }
              }
              return _temp;
            })();
            return _temp;
          }
        },

      },
      chartSettings: {
        bar: {
          labelMap: {
            subscribed: "订阅数",
            exceptional: "打赏数"
          }
        }
      },
      chartExtends: {
        bar: {
          series: {
            label: { show: true, position: "right" },
            barMinHeight: 10
          }
        }
      },
      chartData: {
        lineData: {
          columns: ["date", "aqi"],
          rows: null
        },
        barData: {
          columns: ["type", "subscribed", "exceptional"],
          rows: null
        },
        pieData: {
          columns: ["类目", "评论数量"],
          rows: null
        },
        wordCloud:{
          columns: ['word', 'count'],
          rows: null
        }
      }
    };
  },
  created() {
    this.chartData.lineData.rows = lineData["北京"].reverse();
    this.chartData.barData.rows = this.barData.data;
    this.chartData.pieData.rows = this.pieData;
    this.chartData.wordCloud.rows = this.wordCloud;
  },
  computed: {
    barData: () => {
      let _d = [];
      let _cates = [];
      // 主播打赏数
      let _hostents = [];
      barData_original.forEach((element, index) => {
        if (_cates.indexOf(element.type) < 0) {
          _cates.push(element.type);
          _d.push(element);
        } else {
          _d.map((v, i) => {
            if (v.type == element.type) {
              // 订阅数相加
              _d[i].subscribed += element.subscribed;
              // 打赏数相加
              _d[i].exceptional += element.exceptional;
            }
          });
        }
        // 保存主播打赏数
        _hostents.push({
          name: element.person,
          value: element.exceptional,
          type: element.type
        });
      });
      _hostents.sort(compareObj("value"));
      return {
        data: _d,
        detail: _hostents
      };
    },
    pieData: () => {
      let _data = [];
      // 用于类目去重
      let _names = [];
      pieData_original.forEach(element => {
        if (element.num == "") {
          // TODO: 还没想好做什么处理
        }
        // 处理数字
        let _value = parseInt(element.num.GetNum());
        // 相同类目数量相加
        if (_names.includes(element.name)) {
          _data.forEach(item => {
            if (item["类目"] == element.name) {
              item["评论数量"] += _value;
            }
          });
        } else {
          // 添加新的类目
          _names.push(element.name);
          _data.push({
            类目: element.name,
            评论数量: _value
          });
        }
      });
      // 由于类目太多，只展现前十名,其余的都显示为其它
      _data.sort(compareObj('评论数量'));
      let _i = _data.length;
      let _obj = {
        "类目":"其它",
        "评论数量":0
      };
      while (_i>10){
        _obj["评论数量"] +=_data[_i-1]["评论数量"];
        // 相加后删除
        _data.splice(_i,1);
        _i--
      };
      _data.push(_obj);
      return _data;
    }
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
@mixin test_div($color) {
  border: 1px $color solid;
  height: 300px;
}

.el-row {
  // @include test_div(blue);
}
.el-col {
  // @include test_div(red);
  // padding: 6px 06px 0;
}
.el-card {
  // @include test_div(yellow);
  height: 100%;
}
img {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-row {
  margin-top: 10px;
}
</style>
