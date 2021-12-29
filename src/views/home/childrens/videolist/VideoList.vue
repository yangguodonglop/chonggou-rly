<template>
  <div id="video-list">
    <search-header>
      <div class="option">
        <div class="video-id">
          <span>视频编号</span
          ><el-input
            v-model="search.videoId"
            size="mini"
            placeholder="请输入视频编号"
            style="width: 150px"
            @focus="change('videoid')"
          />
        </div>
        <div class="video-name">
          <span>视频名称：</span
          ><el-input
            v-model="search.videoName"
            size="mini"
            placeholder="请输入视频名称"
            style="width: 150px"
            @focus="change('videoname')"
          />
        </div>
        <div class="video-author">
          <span>视频作者：</span
          ><el-input
            v-model="search.videoAuthor"
            size="mini"
            placeholder="请输入视频作者"
            style="width: 150px"
            @focus="change('videoauthor')"
          />
        </div>
        <div class="btn">
          <video-add></video-add>
          <video-delete :multiple-selection="multipleSelection"></video-delete>
          <div class="refresh">
            <el-button
              type="info"
              @click="refresh"
              size="small"
              icon="el-icon-refresh"
            ></el-button>
          </div>
        </div></div
    ></search-header>
    <el-table
      :data="getTableData"
      height="330"
      border
      style="width: 100%"
      stripe
      size="mini"
      :default-sort="{ prop: 'videoid', order: 'ascending' }"
      @selection-change="handleSelectionChange"
    >
      <template slot="empty">
        <p>{{ dataText }}</p>
      </template>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="videoid"
        label="视频编号"
        width="100"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="videoname"
        label="视频名称"
        sortable
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="videophoto"
        label="视频图片"
        width="250"
        align="center"
      >
        <!-- 可以使用scope获得改行的数据，row、column、$index、data -->
        <template slot-scope="scope">
          <img :src="scope.row.videophoto" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        prop="videoauthor"
        label="视频作者"
        width="110"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="videourl"
        label="视频地址"
        width="500"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="videotime"
        label="创建时间"
        width="150"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="checkClick(scope.row)" type="text" size="mini"
            >查看</el-button
          >
          <el-button type="text" size="mini" @click="updateClick(scope.row)"
            >修改</el-button
          >
          <el-button type="text" size="mini" @click="deleteClick(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="getTotal"
        style="textAlign: center"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import SearchHeader from "components/common/header/SearchHeader.vue";
import VideoAdd from "./videochildrens/VideoAdd.vue";
import VideoDelete from "./videochildrens/VideoDelete.vue";
import fmtDate from "common/js/Date.js";
import { videoList, deleteVideoById } from "network/home.js";
export default {
  name: "VideoList",
  inject: ["reload"],
  components: {
    SearchHeader,
    VideoAdd,
    VideoDelete
  },
  data() {
    return {
      // 表格数据的总个数
      total: 0,
      //当前页数
      currentPage: 1,
      //1页10个数据
      pagesize: 10,
      tableData: [],
      search: { videoId: "", videoName: "", videoAuthor: "" },
      multipleSelection: [],
      dataText: ""
    };
  },
  created() {
    this.videoList();
  },
  methods: {
    refresh() {
      this.reload();
    },
    videoList() {
      videoList().then(res => {
        // console.log(res);
        res.forEach(data => {
          data.videotime = this.dateFmt(data.videotime);
          data.videophoto =
            "http://localhost:8090/musicstatic/" + data.videophoto;
        });
        this.tableData = res;
        if (this.tableData.length === 0) {
          this.dataText = "暂无数据";
        }
      });
    },
    //点击之后的当前页数
    handleCurrentChange(val) {
      // 当前页数
      this.currentPage = val;
    },
    // 多选框选择的信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //时间转化
    dateFmt(date) {
      let d = new Date(date);
      return fmtDate(d, "yyyy-MM-dd hh:mm:ss");
    },
    change(param) {
      if (param === "videoid") {
        this.search.videoName = "";
        this.search.videoAuthor = "";
      } else if (param === "videoname") {
        this.search.videoId = "";
        this.search.videoAuthor = "";
      } else {
        this.search.videoId = "";
        this.search.videoName = "";
      }
    },
    checkClick(row) {
      this.$router.push({
        path: "/videocheck",
        query: {
          vid: row.videoid
        }
      });
    },
    deleteClick(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteVideoById(row.videoid).then(res => {
            // console.log(res);
            if (res === "success") {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
            }
          });
          this.refresh();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！"
          });
        });
    },
    updateClick(row) {
      this.$router.push({
        path: "/videoupdate",
        query: {
          vid: row.videoid
        }
      });
    }
  },
  computed: {
    getTableData() {
      if (this.search.videoId) {
        return this.tableData
          .filter(data => {
            if (data.videoid == this.search.videoId) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.videoName) {
        return this.tableData
          .filter(data => {
            if (
              data.videoname
                .toLowerCase()
                .includes(this.search.videoName.toLowerCase())
            ) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.videoAuthor) {
        return this.tableData
          .filter(data => {
            if (
              data.videoauthor
                .toLowerCase()
                .includes(this.search.videoAuthor.toLowerCase())
            ) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    getTotal() {
      if (this.search.videoId) {
        return this.tableData.filter(data => {
          if (data.videoid == this.search.videoId) {
            return data;
          }
        }).length;
      }
      if (this.search.videoName) {
        return this.tableData.filter(data => {
          if (
            data.videoname
              .toLowerCase()
              .includes(this.search.videoName.toLowerCase())
          ) {
            return data;
          }
        }).length;
      }
      if (this.search.videoAuthor) {
        return this.tableData.filter(data => {
          if (
            data.videoauthor
              .toLowerCase()
              .includes(this.search.videoAuthor.toLowerCase())
          ) {
            return data;
          }
        }).length;
      }
      return this.tableData.length;
    }
  }
};
</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
}

.option {
  display: flex;
  align-items: center;
}

.option div {
  margin-left: 20px;
  margin-top: 5px;
}

.option .btn {
  display: flex;
  justify-content: space-around;
}

span {
  font-size: 12px;
}

.block {
  margin-top: 15px;
}
</style>
