<template>
  <div id="singer-type">
    <el-table
      :data="
        tableData.filter(
          data =>
            !search ||
            data.typename.toLowerCase().includes(search.toLowerCase()) ||
            data.typeid == search
        )
      "
      style="width: 100%"
      size="mini"
      :default-sort="{ prop: 'typeid', order: 'ascending' }"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        label="歌手类型编号"
        prop="typeid"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column label="歌手类型" prop="typename" align="center">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <div class="option">
            <el-input
              v-model="search"
              size="small"
              placeholder="输入关键字"
              style="marginRight: 10px;textAlign: center"
            />
            <el-button type="primary" size="small" @click="insert"
              >添加</el-button
            >
            <el-button type="danger" size="small" @click="deletes"
              >删除</el-button
            >
            <el-button
              type="info"
              size="small"
              icon="el-icon-refresh"
              @click="refresh"
            ></el-button>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  singerTypeList,
  insertType,
  updateType,
  deleteType,
  deletesSinerTypeByid
} from "network/home.js";
export default {
  name: "SingerType",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      search: ""
    };
  },
  created() {
    this.singerTypeList();
  },
  methods: {
    refresh() {
      this.reload();
    },
    singerTypeList() {
      singerTypeList().then(res => {
        // console.log(res);
        this.tableData = res;
      });
    },
    insert() {
      this.$prompt("请输入歌手类型", "添加", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          console.log(value);
          if (value === null) {
            this.$message.error("歌手类型不能为空！");
          } else {
            insertType(value)
              .then(res => {
                // console.log(res);
                if (res === "success") {
                  this.$message({
                    type: "success",
                    message: "添加成功！ "
                  });
                } else {
                  this.$message.error("添加失败！已存在");
                }
                this.refresh();
              })
              .catch(() => {
                this.$message.error("请输入完整信息！");
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleEdit(index, row) {
      this.$prompt("请输入歌手类型", "修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value === null) {
            this.$message.error("歌手类型不能为空！");
          } else {
            updateType(row.typeid, value).then(res => {
              // console.log(res);
              if (res === "success") {
                this.$message({
                  type: "success",
                  message: "更新成功！ "
                });
              } else {
                this.$message.error("更新失败！已存在！");
              }
              this.refresh();
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入！"
          });
        });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该条歌手类型记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteType(row.typeid).then(res => {
            // console.log(res);
            if (res === "success") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message.error("删除失败！");
            }
            this.refresh();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deletes() {
      if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var ids = new Array();
            for (var i = 0; i < this.multipleSelection.length; i++) {
              ids[i] = this.multipleSelection[i].typeid;
            }
            deletesSinerTypeByid(JSON.stringify(ids)).then(res => {
              // console.log(res);
              if (res === "success") {
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
                this.refresh();
              } else {
                this.$message.error("删除失败！");
              }
            });
            // this.axios({
            //   url: "http://localhost:8090/music/deletesMusic",
            //   method: "post",
            //   data: JSON.stringify(ids),
            //   headers: { "Content-Type": "application/json; charset=UTF-8" }
            // });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.option {
  display: flex;
}
</style>
