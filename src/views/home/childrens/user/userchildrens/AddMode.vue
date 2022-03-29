<template>
  <div id="add1" style="width:100%;">
    <el-button
      type="primary"
      size="small"
      style="margin-left:20px;"
      @click="dialogFormVisible = true"
    >新增版权合作</el-button>
    <el-dialog :close-on-click-modal='false'
      :modal-append-to-body="false"
      title="新增版权合作"
      customClass="customWidthMode"
      :visible.sync="dialogFormVisible"
    >
      <div class="add-mode">
        <div>新增版权合作:</div>
        <el-input
          v-model="input"
          size="small"
          style="width:200px;margin-left:20px;"
          placeholder="请输入内容"
        ></el-input>
        <el-button type="primary" size="small" style="margin-left:20px;" @click="addMode">确认</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popconfirm title="确定要删除该版权合作？" @confirm="deleteClick(scope.row)">
              <el-button type="text" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>

            <el-button
              style="margin-left:20px;"
              type="text"
              size="mini"
              @click="updateClick(scope.row)"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :close-on-click-modal='false'
      customClass="customWidthMode1"
      :modal-append-to-body="false"
      title="编辑版权合作"
      :visible.sync="dialogVisibleEdit"
    >
      <div>
        <el-input
          v-model="inputActive"
          size="small"
          style="width:300px;margin-left:20px;"
          placeholder="请输入内容"
        ></el-input>
        <el-button type="primary" size="small" style="margin-left:20px;" @click="addEdit">确认</el-button>
      </div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>





<script>
import { insertUser, addUser, aboutCopyrightMode } from "network/home.js";
export default {
  name: "Add",
  inject: ["reload"],
  data() {
    return {
      token: JSON.parse(localStorage.getItem("userInfo")).token,

      dialogFormVisible: false,
      dialogVisibleEdit: false,
      inputActive: "",
      input: "",

      tableData: [],
      editInfo: {}
    };
  },
  created() {
    // this.$nextTick(() => {
    //   this.$refs.ipt.focus();
    // });
  },
  mounted() {
    this.queryInfo();
  },
  methods: {
    //确认编辑
    addEdit() {
      const param = {
        token: this.token,
        action: "update",
        updateItem: this.editInfo.value,
        updateValue: this.inputActive
      };
      aboutCopyrightMode(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "修改成功！"
          });
          this.dialogVisibleEdit = false;

          this.inputActive = "";
          this.queryInfo();
        } else {
          this.$message({
            type: "error",
            message: `操作失败！错误码：${res.status}--错误原因：${res.des}`

          });
        }
      });
    },
    //编辑

    updateClick(row) {
      this.editInfo = { ...row };
      this.inputActive = row.name;
      this.dialogVisibleEdit = true;
    },
    //确认删除
    deleteClick(row) {
      const param = {
        token: this.token,
        delItem: row.value,
        action: "del"
      };
      aboutCopyrightMode(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "删除成功！"
          });
          this.queryInfo();
        } else {
          this.$message({
            type: "error",
            message: `操作失败！错误码：${res.status}--错误原因：${res.des}`
          });
        }
      });
    },
    //查询合作模式
    queryInfo() {
      const param = {
        token: this.token,
        action: "get"
      };
      aboutCopyrightMode(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.tableData = [];
          this.tableData = res.data;
        } else {
          this.tableData = [];
        }
      });
    },
    //新增合作方式确认
    addMode() {
      const param = {
        token: this.token,
        action: "put",

        putValue: this.input
      };
      aboutCopyrightMode(param).then(res => {
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "添加成功！"
          });
          this.input = "";
          this.queryInfo();
        } else {
          this.$message({
            type: "error",
            message: `操作失败！错误码：${res.status}--错误原因：${res.des}`
          });
        }
      });
    },
    back() {
      this.$confirm("此操作将会退出, 请确认是否保存,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dialogFormVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.insertUser();
        } else {
          this.$message.error("请输入完整的用户信息!");
        }
      });
    },
    //刷新
    refresh() {
      this.reload();
    },
    insertUser() {
      const param = {
        user: this.form.user,
        password: this.form.password,
        nick: this.form.nick,
        telephone: this.form.telephone,
        weiXin: this.form.weiXin
      };
      //发送请求更新用户
      addUser(param)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            this.$message({
              type: "success",
              message: "添加成功！"
            });
                      this.input = "";
          this.dialogFormVisible = false;
          this.$emit("quryInfo");
          }else{
             this.$message({
              type: "success",
                        message: `操作失败！错误码：${res.status}--错误原因：${res.des}`
            });

          }

        })
    }
  }
};
</script>

<style>
.customWidthMode {
  width: 500px;
}
.customWidthMode1 {
  width: 500px;
}
.add-mode {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.el-dialog__body {
  padding-top: 10px !important;
}
.el-table .el-table__cell {
  padding: 5px 0 !important;
}
</style>
