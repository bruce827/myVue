<template>
  <div v-cloak>
    <el-row>
      <el-tag style="margin:10px">基于elementUI实现</el-tag>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :formatter="formatter"
        >
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-tag style="margin:10px">
        此例子为表头排序的另一种实现思路，可根据table添加主题样式从新打造，如果样式需求不高，可以直接使用element官方给出的排序例子</el-tag>
      <v-table
        :data="data"
        :columns="columns"
      ></v-table>
      <button
        @click="add"
        class="pan-btn tiffany-btn"
      >新增</button>
    </el-row>

  </div>
</template>

<script>
import {getInlineSortTable} from '@/api/article'
import vTable from "./vTable";
export default {
  name: "inlineSortTable",
  components: { vTable },
  data() {
    return {
      //title 、key 与 width 必填；sortable 选填
      columns: [
        {
          title: "名称",
          key: "name",
          width: "60%"
        },
        {
          title: "数量",
          key: "num",
          width: "20%",
          sortable: true
        },
        {
          title: "单价",
          key: "unitPrice",
          width: "20%",
          sortable: true
        }
      ],
      data: [
        {
          name: "真果粒牛奶饮品",
          num: 2,
          unitPrice: 59.9
        },
        {
          name: "苏泊尔（SUPOR）电压力锅 ",
          num: 1,
          unitPrice: 378.0
        },
        {
          name: "乐事（Lay's）薯片",
          num: 3,
          unitPrice: 63.0
        }
      ],
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        list:null
    
    
    };
  },
  created(){
      this.getList()
  },
  methods: {
    getList() {
        getInlineSortTable().then(response => {
            this.list = response.data
        })
    },
    add: function() {
      this.data.push({
        name: "良品铺子 休闲零食大礼包",
        num: 5,
        unitPrice: 59.8
      });
    },
     formatter(row, column) {
        return row.address;
      }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}

table {
  width: 100%;
  margin-bottom: 24px;
  /*合并边框模型*/
  border-collapse: collapse;
  border-spacing: 0;
  /*在空单元格周围绘制边框*/
  empty-cells: show;
  border: 1px solid #e9e9e9;
}

table th {
  font: bold 14px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
  background: #cae8ea;
  color: #5c6b77;
  /*设置文本粗细*/
  font-weight: 600;
  /*段落中的文本不进行换行*/
  white-space: nowrap;
  border-top: 1px solid #c1dad7;
}

table td,
table th {
  padding: 8px 16px;
  text-align: left;
  border-right: 1px solid #c1dad7;
  border-bottom: 1px solid #c1dad7;
}

table th a {
  /*不独占一行的块级元素*/
  display: inline-block;
  margin: 0 4px;
  cursor: pointer;
}

table th a.on {
  color: #3399ff;
}

table th a:hover {
  color: #3399ff;
}
</style>


