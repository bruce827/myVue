<template>
  <div class="app-container">

    <!-- <el-tag style="margin-bottom:20px;">
      <a href="https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable" target="_blank">Documentation</a>
    </el-tag> -->

    <tree-table :data="data" :columns="columns" border/>

  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'

export default {
  name: 'TreeTableDemo',
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          text: '大关',
          value: 'event',
          width: 200
        },
        {
          text: '小关',
          value: 'id'
        },
        {
          text: '试卷',
          value: 'timeLine'
        },
        {
          text: '试题',
          value: 'comment'
        }
      ],
      data: [
        {
          id: 0,
          event: '大关1',
          timeLine: '小关1',
          comment: '试题1'
        },
        {
          id: 1,
          event: '大关2',
          timeLine: '',
          comment: '',
          children: [
            {
              id: 2,
              event: '',
              timeLine: '小关1',
              comment: '试题1'
            },
            {
              id: 3,
              event: '',
              timeLine: '小关2',
              comment: '试题2'
              // children: [
              //   {
              //     id: 4,
              //     event: '',
              //     timeLine: 5,
              //     comment: '无'
              //   },
              //   {
              //     id: 5,
              //     event: '',
              //     timeLine: 10,
              //     comment: '无'
              //   },
              //   {
              //     id: 6,
              //     event: '事件6',
              //     timeLine: 75,
              //     comment: '无',
              //     children: [
              //       {
              //         id: 7,
              //         event: '事件7',
              //         timeLine: 50,
              //         comment: '无',
              //         children: [
              //           {
              //             id: 71,
              //             event: '事件71',
              //             timeLine: 25,
              //             comment: 'xx'
              //           },
              //           {
              //             id: 72,
              //             event: '事件72',
              //             timeLine: 5,
              //             comment: 'xx'
              //           },
              //           {
              //             id: 73,
              //             event: '事件73',
              //             timeLine: 20,
              //             comment: 'xx'
              //           }
              //         ]
              //       },
              //       {
              //         id: 8,
              //         event: '事件8',
              //         timeLine: 25,
              //         comment: '无'
              //       }
              //     ]
              //   }
              // ]
            }
          ]
        }
      ]
    }
  }
}
</script>
