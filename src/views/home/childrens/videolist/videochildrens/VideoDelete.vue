<template>
  <div id="video-delete">
    <el-button type="danger" size="small" @click="open">删除</el-button>
  </div>
</template>

<script>
import { deletesVideoById } from "network/home.js";
export default {
  name: "VideoDelete",
  inject: ["reload"],
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
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
      } else {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var ids = new Array();
            for (var i = 0; i < this.multipleSelection.length; i++) {
              ids[i] = this.multipleSelection[i].videoid;
            }
            deletesVideoById(JSON.stringify(ids)).then(res => {
              console.log(res);
              if (res === "success") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
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
      }
    }
  }
};
</script>

<style scoped></style>
