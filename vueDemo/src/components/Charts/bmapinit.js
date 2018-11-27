/*
 * @作者: 徐健 
 * @日期: 2018-11-26 15:25:15 
 * @最后修改:   徐健 
 * @最后修改时间: 2018-11-26 15:25:15 
 */
export default {
  init: function (){
    const AK = "GeyimPRL9swh7rFCL3kZfF4R3THE9vVm";
    const BMAP_URL = "https://api.map.baidu.com/api?v=2.0&ak="+ AK +"&s=1&callback=onBMapCallback";
    // 创建Promise对象统一处理百度地图连接
    return new Promise((resolve, reject) => {
      // 如果已加载直接返回
      if(typeof BMap !== "undefined") {
        resolve(BMap);
        return true;
      }
      // 百度地图异步加载回调处理
      window.onBMapCallback = function () {
        resolve(BMap);
      };

      // 插入script脚本
      let scriptNode = document.createElement("script");
      scriptNode.setAttribute("type", "text/javascript");
      scriptNode.setAttribute("src", BMAP_URL);
      document.body.appendChild(scriptNode);
    });
  }
}  