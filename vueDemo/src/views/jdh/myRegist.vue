<template>
  <div class="app-container">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <!-- 标题搜索，过滤首尾空格 -->
      <el-input
        v-model.trim="listQuery.businessType"
        placeholder="回车搜索业务"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"/>
      <!-- 重要性筛选，添加清空选项，改变不触发查询 -->
      <el-select
        v-model="listQuery.importance"
        :placeholder="$t('table.importance')"
        clearable
        style="width: 90px"
        class="filter-item">
        <el-option
          v-for="(item,index) in importanceOptions"
          :key="index"
          :label="item.label"
          :value="item.value">
          <span>
            <svg-icon v-for="n in item.value" :key="n" icon-class="star"/>
          </span>
          <span>({{ item.label }})</span>
        </el-option>
      </el-select>
      <!-- 类型 -->
      <el-select
        v-show="false"
        v-model="listQuery.type"
        :placeholder="$t('table.type')"
        clearable
        class="filter-item"
        style="width: 130px">
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"/>
      </el-select>
      <!-- 排序，改变触发查询 -->
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter">
        <el-option
          v-for="item in sortOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>

      </el-select>
      <!-- 搜索 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter">{{ $t('table.search') }}</el-button>
      <!-- 添加 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate">{{ $t('table.add') }}</el-button>
      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload">{{ $t('table.export') }}</el-button>
      <!-- 动态列,动态列表需要绑定key -->
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1">{{ $t('table.reviewer') }}</el-checkbox>
    </div>
    <!-- 搜索条件结束 -->
    <!-- table主体，具备加载等待动画、边框、宽度自适应、高亮当前行等交互 -->
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      element-loading-text="列表加载中"
      element-loading-spinner="el-icon-loading"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <!-- 序号 -->
       <el-table-column :label="$t('table.id')" align="center" width="65" prop="id"/>
      <!-- 操作栏，根据当前行的不同状态显示按钮 -->
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- 详情 -->
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">详情

          </el-button>
          <!-- 展期登记 -->
          <el-button
            v-if="scope.row.status!='published'"
            size="mini"
            type="success"
            @click="handleModifyStatus(scope.row,'published')">展期
          </el-button>
          <!-- 变更 -->
          <el-button
            v-if="scope.row.status!='draft'"
            size="mini"
            @click="handleModifyStatus(scope.row,'draft')">变更
          </el-button>
          <!-- 注销登记 -->
          <el-button
            v-if="scope.row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleModifyStatus(scope.row,'deleted')">注销
          </el-button>
        </template>
      </el-table-column>
      <!-- 登记编号 -->
     <el-table-column :label="$t('table.number')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.date')" width="150px" align="center">
        <!-- 过滤日期格式 -->
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <!-- 业务类型 -->
      <el-table-column :label="$t('table.businessType')" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.businessType }}</span>
          <!-- 添加地区属性标签，需要传入码表 -->
          <!-- <el-tag>{{ scope.row.businessType}}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.people')"
        width="110px"
        align="center"
        prop="author"/>
      <!-- 审核人，默认隐藏，通过按钮添加该列 -->
      <el-table-column
        v-if="showReviewer"
        :label="$t('table.reviewer')"
        width="110px"
        align="center">
        <!-- 文字的样式需要通过插槽来改变 -->
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.reviewer }}</span>
        </template>
      </el-table-column>
      <!-- 重要性 -->
      <el-table-column :label="$t('table.importance')" width="80px">
        <!-- svg图标的样式可以直接添加样式修改 -->
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            icon-class="star"
            class="blue"/>
        </template>
      </el-table-column>
      <!-- 阅读数 -->
      <el-table-column :label="$t('table.money')" align="center" width="95">
        <!-- 如果没有值填写0，文字使用全局样式 -->
        <template slot-scope="scope">
          <span
            v-if="scope.row.pageviews"
            class="link-type"
            @click="handleFetchPv(scope.row.pageviews)">{{ scope.row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <!-- 重写了element-ui的样式 -->
      <el-table-column
        :label="$t('table.status')"
        class-name="status-col"
        width="100">
        <!-- 根据不同的状态改变tag的样式，且提示显示中文 -->
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusMsgFilter }}</el-tag>
        </template>
      </el-table-column>
      
    </el-table>
    <!-- table主体结束 -->
    <!-- 分页组件，如果没有数据默认不显示，如果显示器高度大于1000px则默认每页显示20条
        这里封装了el-pagination，具体配置项可以查看组件的注释，很多非常规需求在这里没有列出
         -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"/>
    <!-- 添加弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <!-- 自定义表单的校验规则 -->
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;">
        <!-- 类型 -->
        <el-form-item :label="$t('table.type')" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"/>
          </el-select>
        </el-form-item>
        <!-- 时间 -->
        <el-form-item :label="$t('table.date')" prop="timestamp">
          <el-date-picker
            v-model="temp.timestamp"
            type="datetime"
            placeholder="Please pick a date"/>
        </el-form-item>
        <!-- 标题 -->
        <el-form-item :label="$t('table.title')" prop="title">
          <el-input v-model="temp.title" placeholder="在此输入标题"/>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item :label="$t('table.status')">
          <el-select v-model="temp.status" class="filter-item">
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
        <!-- 重要性 -->
        <el-form-item :label="$t('table.importance')">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"/>
        </el-form-item>
        <!-- 评价 -->
        <el-form-item :label="$t('table.remark')" prop="remark">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="temp.remark"
            type="textarea"
            placeholder="请在此输入您宝贵的点评"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!--  添加弹窗结束-->
    <!-- 点击阅读数的弹窗 -->
    <el-dialog :visible.sync="dialogPvVisible" title="阅读设备统计">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="平台"/>
        <el-table-column prop="pv" label="点击量"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
    <!-- 点击阅读数弹窗结束 -->
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
// 分页组件，封装了element组件
import Pagination from '@/components/Pagination'

// 地区码表
const calendarTypeOptions = [
  {
    key: 'CN',
    display_name: 'China'
  }, {
    key: 'US',
    display_name: 'USA'
  }, {
    key: 'JP',
    display_name: 'Japan'
  }, {
    key: 'EU',
    display_name: 'Eurozone'
  }
]

/**
 * 用于过滤地区码表,数组转对象
 * params: acc[obj] => 上一次的值；cur[obj] => 当前对象
 * return：[obj]
 */
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

/**
 * 点评输入框验证
 * params:text[string|number]=>输入的内容；callback[fun]：回调
 */
const remarkValidator = (rule, text, callback) => {
  if (!text) {
    callback(new Error('必须输入文字才可以哦'))
  } else {
    callback()
  }
}
export default {
  name: 'ComplexTable',
  components: {
    Pagination
  },
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      /**
       * el-tag标签共支持4种样式，分别是正常、成功、提醒、警告和危险
       * 如果需要自定义样式可在scoped中定义，避免污染全局
       */
      const statusMap = {
        normal: '', // 正常
        published: 'success', // 发布
        draft: 'info', // 草稿
        warning: 'warning', // 警告
        deleted: 'danger' // 删除
      }

      return statusMap[status]
    },
    statusMsgFilter(msg) {
      const msgMap = {
        normal: '',
        published: '已展期',
        draft: '已变更',
        warning: '异议',
        deleted: '已注销'
      }

      return msgMap[msg]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      // 查询条件
      listQuery: {
        page: 1,
        limit: 10, // 为适应低分辨浏览器，默认每页显示10条
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      // 重要性码表，展现形式为图形
      importanceOptions: [
        {
          value: 1,
          label: '低'
        }, {
          value: 2,
          label: '中'
        }, {
          value: 3,
          label: '高'
        }
      ],
      calendarTypeOptions,
      sortOptions: [
        {
          label: 'ID 升序',
          // key: "+id",
          value: '+id'
        }, {
          label: 'ID 降序',
          // key: "-id",
          value: '-id'

        }
      ],
      statusOptions: [
        'published', 'draft', 'deleted'
      ],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          {
            // 必填
            required: true,
            // 提示信息
            message: '类型为必填',
            // 更改时候触发
            trigger: 'change'
          }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: '时间为必填',
            trigger: 'change'
          }
        ],
        title: [
          {
            required: true,
            message: '标题为必填',
            // 失去焦点时候触发
            trigger: 'blur'
          }
        ],
        // 可以添加自定义验证
        remark: [
          {
            validator: remarkValidator, // 自定义验证
            trigger: 'blur'
          }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getDy()
  },
  methods: {
    getList() {
      this.listLoading = true

      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // 模拟请求延时效果 setTimeout(() => {     this.listLoading = false; }, 2.6 * 1000);
        this.listLoading = false
      })

      console.log(this.list);
      
    },
    handleFilter() {
      // 跳转到第一页
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({ message: '操作成功', type: 'success' })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      // 重置表单
      this.resetTemp()
      // 弹窗状态
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.
          $refs['dataForm'].
        // 初始页面不需要进行校验
          clearValidate()
      })
    },
    createData() {
      this.
        $refs['dataForm'].
        validate(valid => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + Math.pow(100, 2) // 随机生成id
            this.temp.author = '徐健'
            // 模拟请求，不需要返回结果
            createArticle(this.temp).then(() => {
              this.
                list.
                unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
    },
    // 确认按钮的逻辑
    handleUpdate(row) {
      this.temp = Object.assign({}, row) 
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.
          $refs['dataForm'].
          clearValidate()
      })
    },
    updateData() {
      this.
        $refs['dataForm'].
        validate(valid => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.
                    list.
                    indexOf(v)
                  this.
                    list.
                    splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({ title: '成功', message: '更新成功', type: 'success', duration: 2000 })
            })
          }
        })
    },
    handleDelete(row) {
      this.$notify({ title: '成功', message: '删除成功', type: 'success', duration: 2000 })
      const index = this.
        list.
        indexOf(row)
      this.
        list.
        splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      // 应用file-saver实现导出（导入实现方式相同）
      this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                  const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
                  const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
                  const data = this.formatJson(filterVal, this.list)
                  excel.export_json_to_excel({ header: tHeader, data, filename: 'table-list' })
                  this.downloadLoading = false
                })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getDy() {
      const dyHeight = document.body.clientHeight
      // 浏览器视窗高度-上方的组件，这里的930是估计值
      if (dyHeight > 930) {
        this.listQuery.limit = 20
      }
    }
  }
}
</script>

<style scoped>
    /* 随便写的测试样式，可以删除 */
    .meta-item__icon {
        fill: red;
    }
    .blue {
        fill: royalblue;
    }
    .filter-item {
        margin-bottom: 0
    }
</style>
