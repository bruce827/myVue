<template>
  <div class="app-container">

    <!-- loading 各行高亮 横向滚动 -->
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row>
      <!-- 操作栏 -->
      <el-table-column align="center" label="操作" width="120" fixed>
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline"
            @click="confirmEdit(scope.row)">Ok</el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">编辑
          </el-button>
        </template>
      </el-table-column>
      <!-- 序号 -->
      <el-table-column align="center" type='index' label="#" width="40" fixed />
      <!-- 员工编号 -->
      <el-table-column align="center" prop="empNum" label="员工编号" width="150" fixed />
      <!-- 姓名 -->
      <el-table-column align="center" prop="empName" label="姓名" fixed />
      <!-- 出生日期 -->
      <!-- <el-table-column align="center" prop="birthday" label="出生日期" width="100" /> -->
      <!-- 所属公司 -->
      <el-table-column align="center" prop="company" label="所属公司" />
      <!-- 二级组织单元 -->
      <el-table-column align="center" prop="secondUnit" label="二级组织单元" width="120" />
      <!-- 三级组织单元 -->
      <el-table-column align="center" prop="thirdUnit" label="三级组织单元" />
      <!-- 调休假所属年份 -->
      <el-table-column align="center" prop="vacationYear" label="所属年份">
        <template slot-scope="scope">
          <template v-if="scope.row.edit" >
          <el-date-picker v-model="scope.row.vacationYear" type="year">
          </el-date-picker>
        </template>
        <span v-else>
          {{scope.row.vacationYear}}
        </span>
        </template>
        
      </el-table-column>
      <!-- 到期日期 -->
      <el-table-column align="center" prop="expireDate" label="到期日期" width="120" />
      <!-- 补休天数 -->
      <el-table-column align="center" prop="repairDays" label="补休天数" />
      <!-- 已休天数 -->
      <el-table-column align="center" prop="alreadyDays" label="已休天数" />
      <!-- 剩余天数 -->
      <el-table-column align="center" prop="residueDays" label="剩余天数" />
      <!-- 补休原因 -->
      <el-table-column align="left" prop="vacationReason" label="补休原因" width="200" />
      <!-- 是否可折现 -->
      <el-table-column align="center" prop="isCash" label="可折现" />
      <!-- 是否已过期 -->
      <el-table-column align="center" prop="isDated" label="是否过期" />
      <!-- 录入人 -->
      <el-table-column align="center" prop="enteringPerson" label="录入人" />
      <!-- 录入日期 -->
      <el-table-column align="center" prop="enteringDate" label="录入日期" width="100" />
      <!-- <el-table-column align="center" prop="contractCity" label="合同履行地" width="150" /> -->
      <!-- <el-table-column align="center" prop="signCity" label="签约地点" width="80" /> -->
      <!-- 合同类型，采用标签的形式展现 -->
      <!-- <el-table-column :label="'合同类型'" align="left" min-width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.contractType }}</span>
          <el-tag>{{ scope.row.contractlimitType }}</el-tag>
        </template>
      </el-table-column> -->
      <!-- 合同编号 -->
      <!-- <el-table-column align="center" prop="contrtactCode" label="合同编号" width="240">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.contrtactCode" class="edit-input" size="small" />
            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning"
              @click="cancelEdit(scope.row)">
              取消
            </el-button>
          </template>
          <span v-else>{{ scope.row.contrtactCode }}</span>
        </template>
      </el-table-column> -->

    </el-table>
  </div>
</template>

<script>
  import {
    fetchList
  } from "@/api/ceshi";
  export default {
    name: "lineEditTable",
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: "success",
          draft: "info",
          deleted: "danger"
        };
        return statusMap[status];
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          const items = response.data.items;
          this.list = items.map(v => {
            this.$set(v, "edit", false);

            // 取消编辑重置数据
            v.originalContrtactCode = v.contrtactCode;
            v.originalVacationYear =v.vacationYear;
            return v;
          });
          this.listLoading = false;
        });
      },
      cancelEdit(row) {

        row.contrtactCode = row.originalContrtactCode;
        // 调休假年份
        row.vacationYear = row.originalVacationYear;
        row.edit = false;
        this.$message({
          message: "取消编辑",
          type: "warning"
        });
      },
      confirmEdit(row) {
        row.edit = false;
        row.originalContrtactCode = row.contrtactCode;
        // 调休假所属年份
        row.originalVacationYear = row.vacationYear;

        this.$message({
          message: "数据已保存",
          type: "success"
        });
      }
    }
  };

</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }

</style>
