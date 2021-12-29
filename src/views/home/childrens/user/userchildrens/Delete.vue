<template>
  <div id="delete">
    <el-button type="danger" size="small" @click="open">删除</el-button>
  </div>
</template>

<script>
import { deletesUser } from "network/home.js";
export default {
  name: "Delete",
  inject: ["reload"],
  data() {
    return {};
  },
  props: {
    multipleSelection: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    refresh() {
      this.reload();
    },
    open() {
      if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var ids = new Array();
            for (var i = 0; i < this.multipleSelection.length; i++) {
              ids[i] = this.multipleSelection[i].uid;
            }
            deletesUser(JSON.stringify(ids)).then(res => {
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
    }
  }
};
</script>

<style scoped></style>
