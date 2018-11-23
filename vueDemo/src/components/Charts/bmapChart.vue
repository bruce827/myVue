<template>
  <div>
    <div :class="className" :id="id" :style="{height:height,width:width}" />
  </div>
</template>
<script>
import echarts from "echarts";
import resize from "./mixins/resize";
// echarts的百度地图插件
// import bmap from "echarts/extension/bmap/bmap";
require("echarts/extension/bmap/bmap");
import baidu from "./bmapinit.js";

// var buslines = [
//   {coords: Array, lineStyle: {normal: {color: "rgba(223,90,90,1)"}}}
// ];
// 获取东软坐标

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    baidu.init().then(BMap => {
      // console.log(BMap);
      console.log("加载成功...");
      // this.initMap();
      this.initChart();
      // var map = new BMap.Map(this.id);          // 创建地图实例  
      // var point = new BMap.Point(116.331398,39.897445);  // 创建点坐标  
      // map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别      
      // map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放 

      // map.addControl(new BMap.NavigationControl());    
      // map.addControl(new BMap.ScaleControl());    
      // map.addControl(new BMap.OverviewMapControl());    
      // map.addControl(new BMap.MapTypeControl());    
      // map.setCurrentCity("武汉"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用

      // var opts = {type: BMAP_NAVIGATION_CONTROL_ZOOM} 
      // map.addControl(new BMap.NavigationControl(opts)); //自定义控件

      // map.setMapStyle({style:'midnight'});//地图风格
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      //   const xData = (function() {
      //     const data = [];
      //     for (let i = 1; i < 13; i++) {
      //       data.push(i + "month");
      //     }
      //     return data;
      //   })();
      this.chart.setOption({
         grid: {
          height: 200,
          width: 8,
          right: 80,
          bottom: 10
        },
        bmap: {
          // 东软A2
          center: [123.43851286180518,41.70582421119771],
          zoom: 15,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#031628"
                }
              },
              {
                featureType: "land",
                elementType: "geometry",
                stylers: {
                  color: "#000102"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#0b3d51"
                }
              },
              {
                featureType: "local",
                elementType: "geometry",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#08304b"
                }
              },
              {
                featureType: "subway",
                elementType: "geometry",
                stylers: {
                  lightness: -70
                }
              },
              {
                featureType: "building",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#857f7f"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "building",
                elementType: "geometry",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "green",
                elementType: "geometry",
                stylers: {
                  color: "#062032"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#465b6c"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "label",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        }
        //  series: [{
        //     type: 'lines',
        //     coordinateSystem: 'bmap',
        //     polyline: true,
        //     data: buslines,
        //     silent: true,
        //     lineStyle: {
        //         normal: {
        //             // color: '#c23531',
        //             // color: 'rgb(200, 35, 45)',
        //             opacity: 0.2,
        //             width: 1
        //         }
        //     },
        //     progressiveThreshold: 500,
        //     progressive: 200
        // }, {
        //     type: 'lines',
        //     coordinateSystem: 'bmap',
        //     polyline: true,
        //     data: buslines,
        //     lineStyle: {
        //         normal: {
        //             width: 0
        //         }
        //     },
        //     effect: {
        //         constantSpeed: 20,
        //         show: true,
        //         trailLength: 0.1,
        //         symbolSize: 1.5
        //     },
        //     zlevel: 1
        // }]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
 

</style>
