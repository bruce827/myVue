import Mock from 'mockjs'

const List = []

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b1' +
  '12-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

const count = {
  needJob: 10,
  doneJob: 20,
  systemMsg: 30
};

const runningTaskList = {
  list: []
};
for (let i = 0; i < 50; i++) {
    runningTaskList.list.push(Mock.mock({
    id: '@increment',
    createTime: '@date()',
    instanceName: '@ctitle(5, 77)'
  }));
}
export default {
  //   getList: config => {     // debugger     const { importance, type, title,
  // page = 1, limit = 20, sort } = param2Obj(config.url)     let mockList =
  // List.filter(item => {       if (importance && item.importance !==
  // +importance) return false       if (type && item.type !== type) return false
  //      // 筛选符合条件的名称       if (title && item.title.indexOf(title) < 0) return
  // false       return true     })     if (sort === '-id') {       mockList =
  // mockList.reverse()     }     const pageList = mockList.filter((item, index)
  // => index < limit * page && index >= limit * (page - 1))     return {
  // total: mockList.length,       items: pageList     }   },   getPv: () => ({
  //  pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key:
  // 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]   }),   getArticle: (config)
  // => {     const { id } = param2Obj(config.url)     for (const article of List)
  // {       if (article.id === +id) {         return article       }     }   },
  // createArticle: () => ({     data: 'success'   }),   updateArticle: () => ({
  //   data: 'success'   }),

  getMsgCount: () => {
    for (let key in count) {
      count[key] = Mock
        .Random
        .integer(0, 1000);
    }

    return count
  },
  getrunningTask: () => {

    return runningTaskList
  },
  historyTasks:() =>{

    return runningTaskList
  },
  systemMsg:() =>{

    return runningTaskList
  },

}
