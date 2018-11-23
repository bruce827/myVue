<template>
    <div :class="className" :id="id" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";
// 全国各省市的地图都可以在此模块的包中找到，尽量使用js格式
require("echarts/map/js/china");
require("echarts/theme/macarons"); // 根据页面风格，使用马卡龙主题
import { debounce } from "@/utils";

// 随机测试数据
function randomData() {
  return Math.round(Math.random() * 2500);
}
// 渐变设置
function getGradientColor(start, end, max, val) {
  var rgb = /#((?:[0-9]|[a-fA-F]){2})((?:[0-9]|[a-fA-F]){2})((?:[0-9]|[a-fA-F]){2})/;
  var sM = start.match(rgb);
  var eM = end.match(rgb);
  var err = "";
  max = max || 1;
  val = val || 0;
  if (sM === null) {
    err = "start";
  }
  if (eM === null) {
    err = "end";
  }
  if (err.length > 0) {
    throw new Error("Invalid " + err + " color format, required hex color");
  }
  var sR = parseInt(sM[1], 16),
    sG = parseInt(sM[2], 16),
    sB = parseInt(sM[3], 16);
  var eR = parseInt(eM[1], 16),
    eG = parseInt(eM[2], 16),
    eB = parseInt(eM[3], 16);
  var p = val / max;
  var gR = Math.round(sR + (eR - sR) * p).toString(16),
    gG = Math.round(sG + (eG - sG) * p).toString(16),
    gB = Math.round(sB + (eB - sB) * p).toString(16);
  return "#" + gR + gG + gB;
}

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.initChart();
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.addEventListener("transitionend", this.sidebarResizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHandler);
    }

    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.removeEventListener("transitionend", this.sidebarResizeHandler);

    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === "width") {
        this.__resizeHandler();
      }
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: "全国员工分布",
          z: 1987,
          right: "0",
          textStyle: {
            color: "#3A71A8",
            fontWeight: "bolder",
            fontSize: 20
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c}"
        },
        visualMap: {
          seriesIndex: 0,
          min: 0,
          max: 2500,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true
        },
        grid: {
          height: 200,
          width: 8,
          right: 80,
          bottom: 10
        },
        xAxis: {
          type: "category",
          data: [],
          splitNumber: 1,
          show: false
        },
        yAxis: {
          position: "right",
          min: 0,
          max: 20,
          splitNumber: 20,
          inverse: true,
          axisLabel: {
            show: true
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: []
        },
        series: [
          {
            zlevel: 1,
            name: "中国",
            type: "map",
            mapType: "china",
            selectedMode: "multiple",
            roam: true,
            left: 0,
            right: "15%",
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: "北京", value: randomData() },
              { name: "天津", value: randomData() },
              { name: "上海", value: randomData() },
              { name: "重庆", value: randomData() },
              { name: "河北", value: randomData() },
              { name: "河南", value: randomData() },
              { name: "云南", value: randomData() },
              { name: "辽宁", value: randomData() },
              { name: "黑龙江", value: randomData() },
              { name: "湖南", value: randomData() },
              { name: "安徽", value: randomData() },
              { name: "山东", value: randomData() },
              { name: "新疆", value: randomData() },
              { name: "江苏", value: randomData() },
              { name: "浙江", value: randomData() },
              { name: "江西", value: randomData() },
              { name: "湖北", value: randomData() },
              { name: "广西", value: randomData() },
              { name: "甘肃", value: randomData() },
              { name: "山西", value: randomData() },
              { name: "内蒙古", value: randomData() },
              { name: "陕西", value: randomData() },
              { name: "吉林", value: randomData() },
              { name: "福建", value: randomData() },
              { name: "贵州", value: randomData() },
              { name: "广东", value: randomData() },
              { name: "青海", value: randomData() },
              { name: "西藏", value: randomData() },
              { name: "四川", value: randomData() },
              { name: "宁夏", value: randomData() },
              { name: "海南", value: randomData() },
              { name: "台湾", value: randomData() },
              { name: "香港", value: randomData() },
              { name: "澳门", value: randomData() }
            ]
          },
          {
            zlevel: 2,
            name: "地图指示",
            type: "bar",
            barWidth: 5,
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "red" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "blue" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10
              }
            },
            data: [20]
          }
        ]
      });
      var TOPN = 15;

      var option = this.chart.getOption();
      // 修改top
      option.grid[0].height = TOPN * 20;
      option.yAxis[0].max = TOPN;
      option.yAxis[0].splitNumber = TOPN;
      option.series[1].data[0] = TOPN;
      // 排序
      var data = option.series[0].data.sort(function(a, b) {
        return b.value - a.value;
      });

      var maxValue = data[0].value,
        minValue =
          data.length > TOPN
            ? data[TOPN - 1].value
            : data[data.length - 1].value;

      var s = option.visualMap[0].controller.inRange.color[0],
        e = option.visualMap[0].controller.inRange.color.slice(-1)[0];
      var sColor = getGradientColor(s, e, maxValue, minValue);
      var eColor = getGradientColor(s, e, maxValue, maxValue);

      option.series[1].itemStyle.normal = {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 1,
              color: sColor // 0% 处的颜色
            },
            {
              offset: 0,
              color: eColor // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        }
      };

      // yAxis
      var newYAxisArr = [];
      echarts.util.each(data, function(item, i) {
        if (i >= TOPN) {
          return false;
        }
        var c = getGradientColor(sColor, eColor, maxValue, item.value);
        newYAxisArr.push({
          value: item.name,
          textStyle: {
            color: c
          }
        });
      });
      option.yAxis[0].data = newYAxisArr;
      option.yAxis[0].axisLabel.formatter = (function(data) {
        return function(value, i) {
          if (!value) return "";
          return value + " " + data[i].value;
        };
      })(data);
      this.chart.setOption(option);
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    }
  }
};

// export default {
//   mixins: [resize],
//   props: {
//     className: {
//       type: String,
//       default: 'chart'
//     },
//     id: {
//       type: String,
//       default: 'chart'
//     },
//     width: {
//       type: String,
//       default: '200px'
//     },
//     height: {
//       type: String,
//       default: '200px'
//     }
//   },
//   data() {
//     return {
//       chart: null
//     }
//   },
//   mounted() {
//     this.initChart()
//   },
//   beforeDestroy() {
//     if (!this.chart) {
//       return
//     }
//     this.chart.dispose()
//     this.chart = null
//   },
//   methods: {
//     initChart() {
//       this.chart = echarts.init(document.getElementById(this.id))
//       const xData = (function() {
//         const data = []
//         for (let i = 1; i < 13; i++) {
//           data.push(i + 'month')
//         }
//         return data
//       }())
//       this.chart.setOption({
//         backgroundColor: '#344b58',
//         title: {
//           text: 'statistics',
//           x: '20',
//           top: '20',
//           textStyle: {
//             color: '#fff',
//             fontSize: '22'
//           },
//           subtextStyle: {
//             color: '#90979c',
//             fontSize: '16'
//           }
//         },
//         tooltip: {
//           trigger: 'axis',
//           axisPointer: {
//             textStyle: {
//               color: '#fff'
//             }
//           }
//         },
//         grid: {
//           left: '5%',
//           right: '5%',
//           borderWidth: 0,
//           top: 150,
//           bottom: 95,
//           textStyle: {
//             color: '#fff'
//           }
//         },
//         legend: {
//           x: '5%',
//           top: '10%',
//           textStyle: {
//             color: '#90979c'
//           },
//           data: ['female', 'male', 'average']
//         },
//         calculable: true,
//         xAxis: [{
//           type: 'category',
//           axisLine: {
//             lineStyle: {
//               color: '#90979c'
//             }
//           },
//           splitLine: {
//             show: false
//           },
//           axisTick: {
//             show: false
//           },
//           splitArea: {
//             show: false
//           },
//           axisLabel: {
//             interval: 0

//           },
//           data: xData
//         }],
//         yAxis: [{
//           type: 'value',
//           splitLine: {
//             show: false
//           },
//           axisLine: {
//             lineStyle: {
//               color: '#90979c'
//             }
//           },
//           axisTick: {
//             show: false
//           },
//           axisLabel: {
//             interval: 0
//           },
//           splitArea: {
//             show: false
//           }
//         }],
//         dataZoom: [{
//           show: true,
//           height: 30,
//           xAxisIndex: [
//             0
//           ],
//           bottom: 30,
//           start: 10,
//           end: 80,
//           handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
//           handleSize: '110%',
//           handleStyle: {
//             color: '#d3dee5'

//           },
//           textStyle: {
//             color: '#fff' },
//           borderColor: '#90979c'

//         }, {
//           type: 'inside',
//           show: true,
//           height: 15,
//           start: 1,
//           end: 35
//         }],
//         series: [{
//           name: 'female',
//           type: 'bar',
//           stack: 'total',
//           barMaxWidth: 35,
//           barGap: '10%',
//           itemStyle: {
//             normal: {
//               color: 'rgba(255,144,128,1)',
//               label: {
//                 show: true,
//                 textStyle: {
//                   color: '#fff'
//                 },
//                 position: 'insideTop',
//                 formatter(p) {
//                   return p.value > 0 ? p.value : ''
//                 }
//               }
//             }
//           },
//           data: [
//             709,
//             1917,
//             2455,
//             2610,
//             1719,
//             1433,
//             1544,
//             3285,
//             5208,
//             3372,
//             2484,
//             4078
//           ]
//         },

//         {
//           name: 'male',
//           type: 'bar',
//           stack: 'total',
//           itemStyle: {
//             normal: {
//               color: 'rgba(0,191,183,1)',
//               barBorderRadius: 0,
//               label: {
//                 show: true,
//                 position: 'top',
//                 formatter(p) {
//                   return p.value > 0 ? p.value : ''
//                 }
//               }
//             }
//           },
//           data: [
//             327,
//             1776,
//             507,
//             1200,
//             800,
//             482,
//             204,
//             1390,
//             1001,
//             951,
//             381,
//             220
//           ]
//         }, {
//           name: 'average',
//           type: 'line',
//           stack: 'total',
//           symbolSize: 10,
//           symbol: 'circle',
//           itemStyle: {
//             normal: {
//               color: 'rgba(252,230,48,1)',
//               barBorderRadius: 0,
//               label: {
//                 show: true,
//                 position: 'top',
//                 formatter(p) {
//                   return p.value > 0 ? p.value : ''
//                 }
//               }
//             }
//           },
//           data: [
//             1036,
//             3693,
//             2962,
//             3810,
//             2519,
//             1915,
//             1748,
//             4675,
//             6209,
//             4323,
//             2865,
//             4298
//           ]
//         }
//         ]
//       })
//     }
//   }
// }
</script>
