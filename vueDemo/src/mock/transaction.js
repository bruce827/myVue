import Mock from 'mockjs'

const List = []
const count = 20
let now = (new Date()).toLocaleDateString()

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    order_no: '@guid()',
    timestamp: +Mock.Random.date('T'),
    creatDate: now,
    username: '@name()',
    price: '@float(1000, 15000, 0, 2)',
    'status|1': ['可用', '已删除']
  }))
}

export default {
  getList: () => {
    return {
      total: List.length,
      items: List
    }
  }
}
