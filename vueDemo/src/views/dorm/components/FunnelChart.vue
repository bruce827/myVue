<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts"
require("echarts/theme/macarons") // echarts 马卡龙主题
import { debounce } from "../utils"

export default {
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
      default: "510px"
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
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === "width") {
        this.__resizeHandler();
      }
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
            legend: {
        data: ['展现','点击','访问','咨询','订单']
    },
        "backgroundColor": "#fff",
    calculable: true,
    series: [
        {
            name:'漏斗图',
            type:'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'ascending',
            gap: 2,
            funnelAlign:'left',
            label: {
                normal: {
                    show: true,
                    position: 'left'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
            data: [
                {value: 100, name: 'B1'},
                {value: 90, name: 'F1'},
                {value: 75, name: 'F2'},
                {value: 70, name: 'F3'},
                {value: 50, name: 'F4'},
                {value: 30, name: 'F5'},
                {value: 18, name: 'F6'},
                {value: 100, name: 'B2'}
            ]
        }
    ]
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
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
};
</script>
