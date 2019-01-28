<template>
  <div class="app-container">

    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="姓名">姓名</el-checkbox>
        <el-checkbox label="状态">状态</el-checkbox>
        <el-checkbox label="性别">性别</el-checkbox>
        <el-checkbox label="大区">大区</el-checkbox>
        <el-checkbox label="二级组织单元">二级组织单元</el-checkbox>
        <el-checkbox label="三级组织单元">三级组织单元</el-checkbox>
        <el-checkbox label="人员管理类型">人员管理类型</el-checkbox>
        <el-checkbox label="工作地">工作地</el-checkbox>
        <el-checkbox label="职位大类">职位大类</el-checkbox>
        <el-checkbox label="职位系列">职位系列</el-checkbox>
        <el-checkbox label="职位">职位</el-checkbox>
        <el-checkbox label="职级">职级</el-checkbox>
        <el-checkbox label="学历">学历</el-checkbox>
        <el-checkbox label="毕业院校">毕业院校</el-checkbox>
        <el-checkbox label="所学专业">所学专业</el-checkbox>
        <el-checkbox label="联系电话">联系电话</el-checkbox>
        <el-checkbox label="电子邮件">电子邮件</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" :key="key" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="员工编号" width="180" />
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
const defaultFormThead = ['姓名', '状态', '性别', '大区']

export default {
  data() {
    return {
      tableData: [
        {
          id: '001608090003',
          姓名: '陆芳芳',
          状态: '',
          性别: '',
          大区: '北区',
          二级组织单元: '沈阳分部',
          三级组织单元: '沈阳开发二部',
          人员管理类型: '报价',
          工作地: '工作地',
          职位大类: '',
          职位系列: '软件开发',
          职位: '见习软件工程师',
          职级: '1级',
          学历: '专科',
          毕业院校: '辽宁广告职业学院',
          所学专业: '社区管理与服务',
          联系电话: '15366963456',
          电子邮件: 'x.jian@neusoft.com'
        },
        {
          id: '001610170002',
          姓名: '张莹莹',
          状态: '',
          性别: '',
          大区: '北区',
          二级组织单元: '沈阳分部',
          三级组织单元: '沈阳开发二部',
          人员管理类型: '报价',
          工作地: '工作地',
          职位大类: '',
          职位系列: '软件开发',
          职位: '见习软件工程师',
          职级: '1级',
          学历: '专科',
          毕业院校: '辽宁广告职业学院',
          所学专业: '社区管理与服务',
          联系电话: '15366963456',
          电子邮件: 'x.jian@neusoft.com'
        }
      ],
      key: 1, // table key
      formTheadOptions: ['姓名', '状态', '性别', '大区', '二级组织单元', '三级组织单元', '人员管理类型', '工作地', '职位大类',
        '职位系列',
        '职位',
        '职级',
        '学历',
        '毕业院校',
        '所学专业',
        '联系电话',
        '电子邮件'
      ],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead // 默认表头 Default header
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(
        i => valArr.indexOf(i) >= 0
      )
      this.key = this.key + 1 // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  }
}
</script>

