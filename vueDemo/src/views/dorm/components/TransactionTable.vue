<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="微信文章标题" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="发布日期" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.creatDate }}
      </template>
    </el-table-column>
    <el-table-column label="点击量" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter"> {{ scope.row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchList } from '../api/transaction.js'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '可用': 'success',
        '已删除': 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>
