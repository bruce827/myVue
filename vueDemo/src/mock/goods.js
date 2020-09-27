import Mock from 'mockjs'
import { param2Obj } from '@/utils'


const priceList = Mock.mock({
  'list | 10':[{
    dateTime:'@datetime()',
    price:'@float(0,200,2,2)'
  }]
})

const data = Mock.mock({
  'items|50': [{
    id: '@id',
    // 商品编码
    skuCode: '@string(5)',
    // 商品名称
    skuName: '@cword(5,20)',
    // 定价
    costPrice: '@float(0,200,2,2)',
    // 历史售价
    historyPriceList:priceList,
    // 销售数量
    saleNum: '@integer(0,9999)',
    // 广告词
    skuAd:'@csentence(0,10)',
    // 商品状态(0:在售 1; 已下架，2：未发布)
    "skuStatus|1" : ['0','1','2'],
    // 删除标记
    "IsDelete|1" : ['0','1'],
    // 创建时间
    createdTime : '@datetime()',
    // 创建人
    createdBy : '@cname()',
    // 修改人
    updateBy:'@cname()',
    // 修改时间
    updateTime:'@datetime()',
    // 商家名称
    businessName:'@cword(6)',
    // 商家编码
    businessCode:'@string(6)'

  }]
})

// export default [
//   {
//     url: '/vue-admin-template/goods/listGoods',
//     type: 'post',
//     response: (req,res) => {
//       var {page=1,limit=20,skuName,skuStatus,skuAd} = param2Obj(req.url);
//       // 模拟筛选条件
//       const items = data.items.filter(item => {
//         // 只要有一个条件不符合就过滤掉
//         if(skuName && item.skuName.indexOf(skuName)<0) return false
//         if(skuStatus && item.skuStatus !== skuStatus) return false
//         if(skuAd && item.skuAd.indexOf(skuAd)<0)return false
        
//         return true
//       });
      
//       // 过滤数据的页码,只返回符合页码要求的数据
//       var pageList = items.filter(
//         (item,index) => index < limit * page && index >= limit * (page - 1)
//       );
//       return {
//         code: 1,
//         data: {
//           total: items.length,
//           items: pageList
//         }
//       }
//     }
//   },{
//     url: '/vue-admin-template/goods/addGoods',
//     type: 'post',
//     response: (req,res) => {
//       console.log(param2Obj(req.url));
      
//       return {
//         code: 1,
//         msg:'添加商品成功',
//         success:true,
//         data:{}
//       }
//     }
//   },{
//     url: '/vue-admin-template/goods/updateGoodsInfo',
//     type: 'post',
//     response: (req,res) => {
//       console.log(param2Obj(req.url));
      
//       return {
//         code: 1,
//         msg:'更新数据成功',
//         success:true,
//         // 无法模拟数据入库
//         data:{}
//       }
//     }
//   },{
//     url: '/vue-admin-template/goods/deleteGoods',
//     type: 'get',
//     response: config => {
//       console.log(param2Obj(config.url));
      
//       return {
//         code: 1,
//         msg:'删除成功',
//         success:true,
//         data:{}
//       }
//     }
//   },{
//     url: '/vue-admin-template/goods/uploadImage',
//     type: 'post',
//     response: config => {
//       return {
//         code: 1,
//         msg:'成功',
//         success:true,
//         // 无法模拟数据入库
//         data:{
//           url:'https://images-cn.ssl-images-amazon.com/images/G/28/kindle/2019/hongyun/newbook_PCtop_1500x200.jpg'
//         }
//       }
//     }
//   },{
//     url: '/vue-admin-template/goods/listBusiness',
//     type: 'get',
//     response: config => {
//       var A_businessList = data.items.reduce((acc,cur)=>{
//           acc.push({
//               businessCode:cur.businessCode,
//               businessName:cur.businessName
//           })
//         return acc
//       }
//       ,[])
//       return {
//         code: 1,
//         msg:'成功',
//         success:true,
//         // 无法模拟数据入库
//         data:A_businessList
//       }
//     }
//   },{
//     url: '/vue-admin-template/goods/findGoodsBySkuCode',
//     type: 'get',
//     response: config => {
//       console.log(param2Obj(config.url));
//       const {skuCode} = param2Obj(config.url);
//       var item = data.items[0];
//       item.images = [
//         'https://images-cn.ssl-images-amazon.com/images/I/41QWunu4rJL.jpg',
//         "https://images-cn.ssl-images-amazon.com/images/I/41VVvp3JXVL.jpg"
//       ]
//       return {
//         code: 1,
//         msg:'成功',
//         success:true,
//         // 无法模拟数据入库
//         data:item
//       }
//     }
//   },{
//     url: '/vue-admin-template/goods/updateGoodsStatus',
//     type: 'get',
//     response: config => {
//       console.log(param2Obj(config.url));
//       return {
//         code: 1,
//         msg:'修改状态成功',
//         success:true,
//         // 无法模拟数据入库
//         data:{}
//       }
//     }
//   },
// ]

export default {
  listGoods: (req,res) =>{
    var {page=1,limit=20,skuName,skuStatus,skuAd} = param2Obj(req.url);
      // 模拟筛选条件
      const items = data.items.filter(item => {
        // 只要有一个条件不符合就过滤掉
        if(skuName && item.skuName.indexOf(skuName)<0) return false
        if(skuStatus && item.skuStatus !== skuStatus) return false
        if(skuAd && item.skuAd.indexOf(skuAd)<0)return false
        
        return true
      });
      
      // 过滤数据的页码,只返回符合页码要求的数据
      var pageList = items.filter(
        (item,index) => index < limit * page && index >= limit * (page - 1)
      );
    return {
        total: items.length,
        items: pageList
    }
  },
  createGood:(req)=>{
    console.log(param2Obj(req.url));
      return {
        data:'success'
      }
  },
  updateGood:(req)=>{
    console.log(param2Obj(req.url));
    return {
      data:'success'
    }
  },
  deleteGood:(req)=>{
    console.log(param2Obj(req.url));
    return {
      data:'success'
    }
  },
  uploadImage:()=>{
    return {
      data:{
        url:'https://images-cn.ssl-images-amazon.com/images/G/28/kindle/2019/hongyun/newbook_PCtop_1500x200.jpg'
      }
    }
  },
  listBusiness:()=>{
    var A_businessList = data.items.reduce((acc,cur)=>{
        acc.push({
            businessCode:cur.businessCode,
            businessName:cur.businessName
        })
      return acc
    },[]);
    return {
      data:A_businessList
    }
  },
  findGoodsBySkuCode:(req)=>{
    console.log(param2Obj(req.url));
    const {skuCode} = param2Obj(req.url);
    // 理论上SKU一定唯一，故只模拟第一条符合条件的数据
    const item = data.items.find(item => {
      return (item.skuCode == skuCode)
    })
    // 模拟商品图片
    item.images = [
      'https://images-cn.ssl-images-amazon.com/images/I/41QWunu4rJL.jpg',
      "https://images-cn.ssl-images-amazon.com/images/I/41VVvp3JXVL.jpg"
    ];
    return {
      data:item || []
    }

  },
  updateGoodsStatus:()=>{
    return {
      data:'success'
    }
  }
}