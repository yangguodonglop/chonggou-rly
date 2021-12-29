<template>
  <div id="productlist">
    <el-table
      :data="
        tableData.filter(
          data =>
            !search ||
            data.musictypename.toLowerCase().includes(search.toLowerCase()) ||
            data.musictypeid === Number(search)
        )
      "
      style="width: 100%"
      stripe
      size="mini"
      :default-sort="{ prop: 'musictypeid', order: 'ascending' }"
      @selection-change="handleSelectionChange"
      ><el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        label="歌曲类型编号"
        prop="musictypeid"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column label="歌曲类型" prop="musictypename" align="center">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <div class="option">
            <el-input
              v-model="search"
              size="small"
              placeholder="输入关键字"
              style="marginRight: 10px;"
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
            slot="reference"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  musicTypeList,
  insertMusicType,
  updateMusicTypeById,
  deleteMusicTypeById,
  deletesMusicTypeById
} from "network/home.js";
export default {
  name: "ProductList",
  inject: ["reload"],
  data() {
    return {
      activeIndex: "1",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      tableData: [],
      search: "",
      musicTypeForm: { musicTypeName: null },
      updateForm: { musictypeid: "", musicTypeName: "" },
      rules: {
        musicTypeName: [
          {
            required: true,
            message: "请输入要添加的音乐类型",
            trigger: "blur"
          }
        ]
      },
      multipleSelection: []
    };
  },
  created() {
    this.musicTypeList();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //修改
    handleEdit(index, row) {
      this.updateForm.musicTypeId = row.musictypeid;
      this.updateForm.musicTypeName = row.musictypename;
      this.$prompt("请输入歌曲类型", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: this.updateForm.musicTypeName
      }).then(({ value }) => {
        if (value === null) {
          this.$message.error("歌曲类型不能为空！");
        } else {
          this.updateMusicTypeById(this.updateForm.musicTypeId, value);
          this.refresh();
        }
      });
    },
    //删除
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该条歌曲类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteMusicTypeById(row.musictypeid);
        this.refresh();
      });
    },
    //刷新
    refresh() {
      this.reload();
    },
    //展示音乐类型
    musicTypeList() {
      musicTypeList().then(res => {
        // console.log(res);
        this.tableData = res;
      });
    },
    //添加音乐类型
    insertMusicType(musicTypeName) {
      insertMusicType(musicTypeName)
        .then(res => {
          // console.log(res);
          if (res === "success") {
            //没有页面之间的跳转的刷新，需要先局部刷新然后在调用音乐类型列表
            //不要在确认后刷新
            //在成功返回后刷新
            this.$message({
              message: "添加成功！",
              type: "success"
            });
          } else {
            this.$message.error("添加失败！");
          }
        })
        .catch(() => {
          this.$message.error("请输入完整信息！");
        });
    },
    //更新音乐类型
    updateMusicTypeById(musicTypeId, musicTypeName) {
      updateMusicTypeById(musicTypeId, musicTypeName)
        .then(res => {
          if (res === "success") {
            this.$message({
              message: "更新成功！",
              type: "success"
            });
          } else {
            this.$message.error("更新失败！已存在！");
          }
        })
        .catch(() => {
          this.$message.error("请输入完整信息！");
        });
    },
    //删除音乐类型
    deleteMusicTypeById(musicTypeid) {
      deleteMusicTypeById(musicTypeid).then(res => {
        // console.log(res);
        if (res === "success") {
          this.$message({
            message: "删除成功！",
            type: "success"
          });
        } else {
          this.$message.error("删除失败！");
        }
      });
    },
    insert() {
      this.$prompt("请输入歌曲类型", "添加", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value === null) {
            this.$message.error("歌曲类型不能为空！");
          } else {
            insertMusicType(value).then(res => {
              console.log(res);
              if (res === "success") {
                this.$message({
                  type: "success",
                  message: "添加成功！ "
                });
              } else {
                this.$message.error("添加失败！已存在！");
              }
              this.refresh();
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
              ids[i] = this.multipleSelection[i].musictypeid;
            }
            deletesMusicTypeById(JSON.stringify(ids)).then(res => {
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
.el-menu-demo {
  position: relative;
}

.refresh {
  position: absolute;
  right: 0;
}

.option {
  display: flex;
}
</style>
