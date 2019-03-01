<template>
  <div class="app-container">
    <!-- 标签编辑 -->
    <el-card>
      <el-collapse accordion>
        <el-collapse-item name="tag">
          <template slot="title">
            <h3>
              <svg-icon icon-class="tag2" />
              标签管理
            </h3>
          </template>
          <el-tag
            :key="tag.$index"
            v-for="tag in dynamicTags"
            :closable="tag.del"
            :disable-transitions="false"
            :style="tag"
            v-show="tag.flag == true"
            @close="handleClose(tag)"
          >
            {{tag.name}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="medium"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="pan-btn tiffany-btn"
            @click="showInput"
          >
            <svg-icon icon-class="addtag" />
            添加</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!-- 标签编辑结束 -->
    <!-- 类别编辑树表 -->
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <h3 style="font-size:15px;">
          <svg-icon icon-class="goodsclassify" />
          物品类别管理</h3>
      </div>

      <tree-table
        :data="data"
        :eval-func="func"
        :eval-args="args"
        :expand-all="expandAll"
        border
      >
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span style="color:sandybrown">{{ scope.row.name || scope.row.event }}</span>
            <!-- 每個類別也可以添加標籤，這裡暫不添加 -->
            <!-- <el-tag
              :key="tagcode"
              v-for=" tagcode in scope.row.usedTags"
              :type="tagcode | tagStyleFilter"
            >
              {{ tagcode | tagFilter}}</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">
            <span v-text="scope.row.comment || ''"></span>
          </template>
        </el-table-column>
        <el-table-column label="限值">
          <template slot-scope="scope" v-show="scope.row.children">
            <span v-text="scope.row.limitNum || ''"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <!-- 二級節點不允許添加子節點 -->
            <el-button
              type="text"
              @click="handleAddNode(scope.row)"
              v-show="scope.row.children"
            >

              添加子节点</el-button>

            <el-button
              type="text"
              @click="message(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </tree-table>
    </el-card>
    <!-- 类别编辑树表结束 -->

    <!-- 添加节点弹窗 -->
    <el-dialog
      title="添加节点"
      :visible.sync="dialogFormVisible"
    >
      <!-- 自定义表单的校验规则 -->
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- 标题 -->
        <el-form-item
          label="节点名称"
          prop="subtext"
        >
          <el-input
            v-model="temp.subtext"
            placeholder="名称不能为空"
          />
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="updateNode()"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeTable from "@/components/TreeTable";

import treeToArray from "./customEval";

import compareStr from "./compareText";

// 更新静态json文件保存到本地
// import fileSaver from "file-saver";

// 物品分类
import goodscate from "./goods_cate.json";

// 标签码表
import tagStyleOptions from "./goods_tag.json";

// 标签查询
const tagKeyValue = tagStyleOptions.reduce((acc, cur) => {
  acc[cur.code] = cur.name;
  return acc;
}, {});

// 标签样式查询
const tagStyleKeyValue = tagStyleOptions.reduce((acc, cur) => {
  // 如果没有样式则添加默认
  if (cur.tagStyle == undefined) {
    cur.tagStyle = "";
  }
  acc[cur.code] = cur.tagStyle;
  return acc;
}, {});

// 返回树节点最后一项
const findTreeLastNodeId = function(arr) {
  let _node = arr[arr.length - 1];
  if (_node.children) {
    return _node.children[_node.children.length - 1].id;
  } else {
    return _node.id;
  }
};

/**
 * 名称输入框验证
 * params:text[string|number]=>输入的内容；callback[fun]：回调
 */
const titleValidator = (rule, text, callback) => {
  // 将输入的文字与现有的类别进行比较，如果重复则提醒

  if (!text) {
    callback(new Error("必须输入文字才可以哦"));
  }
  // TODO:同级目录唯一
  if (text === "有了") {
    callback(new Error("在同级目录下已有相同的名称"));
  }
  callback();
};
export default {
  name: "CustomTreeTableDemo",

  components: {
    treeTable
  },

  filters: {
    tagFilter(code) {
      return tagKeyValue[code];
    },
    tagStyleFilter(code) {
      return tagStyleKeyValue[code];
    }
  },

  data() {
    return {
      // 添加子节点模态窗
      dialogFormVisible: false,
      // 绑定添加表单
      temp: {
        id: undefined,
        timestamp: new Date(),
        code: "",
        name: "",
        subtext: ""
      },
      // 表单校验
      rules: {
        title: [
          {
            // 必填
            required: true,
            message: "标题为必填",
            // 失去焦点时候触发
            trigger: "blur"
          },
          {
            // 自定义校验
            validator: titleValidator, // 自定义验证
            trigger: "blur"
          }
        ]
      },
      // 上方标签管理
      dynamicTags: tagStyles,
      inputVisible: false,
      inputValue: "",

      //下方树表
      func: treeToArray,

      expandAll: false,

      // data:
      data: goodscate,
      args: [null, null, "timeLine"]
    };
  },

  created() {
    // this.getList();
  },

  methods: {
    message(row) {
      this.$message.info(row.event);
    },

    getTree() {
      fetchTree(this.listQuery).then(response => {
        this.$message({
          message: "刷新成功",

          type: "success"
        });
      });
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        let _self = this;
        // 只取最接近的标签，如果出现相同则取第一个匹配到的
        let _defultNum = 0;
        let targetStyle = {};
        for (let i of this.dynamicTags) {
          // 只判断默认且有效的标签
          if (i.flag == true && i.del != true) {
            if (compareStr(i.name, inputValue) > _defultNum) {
              _defultNum = compareStr(i.name, inputValue);
              targetStyle = i;
            } else {
              continue;
            }
          }
        }
        let _tag = {
          name: inputValue,
          del: true,
          flag: true,
          "background-color": targetStyle["background-color"],
          color: targetStyle.color
        };
        this.dynamicTags.push(_tag);
      }
      // 重置按钮
      this.inputVisible = false;
      this.inputValue = "";
    },

    handleAddNode(row) {
      this.temp = Object.assign({}, row); // 深拷贝
      // this.temp = row;
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogFormVisible = true;
      // 清除校验
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateNode() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          // 获得最新id
          let _lastNum = findTreeLastNodeId(goodscate);
          for (let i = 0; i < goodscate.length; i++) {
            if (this.temp.code === goodscate[i].code) {
              if (goodscate[i].children) {
                goodscate[i].children.push({
                  id: _lastNum + 1,
                  name: this.temp.subtext
                });
              }
            }
          }
          console.log(goodscate);

          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "更新成功",
            type: "success",
            duration: 2000
          });
        }
      });
    }
  }
};

// 标签的配色方案，flag代表是否启用，del代表是否可删除(系统自带不可删除)
const tagStyles = [
  {
    name: "默认",
    "background-color": "#ffffff",
    color: "#be8492",
    flag: true,
    del: false
  },
  {
    name: "节日福利",
    "background-color": "#261412",
    color: "#9b864f",
    flag: true,
    del: false
  },
  {
    name: "公司活动",
    "background-color": "#12110f",
    color: "#cfc7df",
    flag: true,
    del: false
  },
  {
    name: "季度盘点",
    "background-color": "#fafd00",
    color: "#8a7c01",
    flag: true,
    del: false
  },
  {
    name: "奖品",
    "background-color": "#e0001a",
    color: "#851f1d",
    flag: false,
    del: false
  },
  {
    name: "月度盘点",
    "background-color": "#eee0ed",
    color: "#7c8888",
    flag: true,
    del: false
  },
  {
    "background-color": "#ffffff",
    color: "#777777",
    name: "保留",
    flag: false,
    del: false
  },
  {
    "background-color": "#0c61a4",
    color: "#ffffff",
    name: "打打",
    flag: false,
    del: false
  },
  {
    "background-color": "#e33b9a",
    color: "#fdbfee",
    name: "年会一等奖",
    flag: true,
    del: false
  },
  {
    "background-color": "#70c005",
    color: "#ffffff",
    name: "年会二等奖",
    flag: true,
    del: false
  },
  {
    "background-color": "#9d0e2c",
    color: "#c25c4e",
    name: "一等奖",
    flag: false,
    del: false
  },
  {
    "background-color": "#ffa7bf",
    color: "#da9e86",
    name: "二等奖",
    flag: false,
    del: false
  },
  {
    "background-color": "#18223d",
    color: "#797c83",
    name: "年会三等奖",
    flag: true,
    del: false
  }
];
</script>

<style lang="scss">
// 标签的配色方案,暂时不用
.tag {
  .one {
    background-color: #261412;
    color: #9b864f;
  }
  .one {
    background-color: #261412;
    color: #9b864f;
  }
  .one {
    background-color: #261412;
    color: #9b864f;
  }
  .one {
    background-color: #261412;
    color: #9b864f;
  }
  .one {
    background-color: #261412;
    color: #9b864f;
  }
  .one {
    background-color: #261412;
    color: #9b864f;
  }
  .one {
    background-color: #261412;
    color: #9b864f;
  }
  .one {
    background-color: #261412;
    color: #9b864f;
  }
}
</style>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
/* 重写按钮样式 */
.pan-btn {
  font-size: 12px;
  padding: 10px;
}
</style>