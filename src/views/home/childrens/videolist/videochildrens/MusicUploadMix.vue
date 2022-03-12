<template>
  <div id="add">
    <el-table :data="tableData" border style="width: 100%;height:auto;" stripe size="mini">
      <el-table-column prop="creator" label="试听伙伴" width="100" align="center"></el-table-column>
      <el-table-column prop="expiredTime" label="试听时间" width="200" align="center"></el-table-column>
      <el-table-column prop="valid" label="试听次数" align="center"></el-table-column>
    </el-table>
     <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total, prev, pager, next, jumper"
        background
        :total="getTotal"
        style="textAlign: right"
      ></el-pagination>
      
    </div>

    <div
      slot="footer"
      class="dialog-footer"
      style="display: flex;justify-content: end; margin-top:20px"
    >
      <el-button @click="close()">取 消</el-button>
    </div>
  </div>
</template>

<script>
import { queryAuditionList } from "network/home.js";

export default {
  name: "MusicAdd",
  inject: ["reload"],
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      token: JSON.parse(localStorage.getItem("userInfo")).token,
      tableData: [],
      getTotal:0,
          currentPage: 1,
      //1页10个数据
      pagesize: 10,
    };
  },

  created() {
    this.param = new FormData();
  },
  mounted() {
    this.queryInfo();
    console.log(this.userInfo);
  },
  watch: {
    userInfo(val) {
      this.$nextTick(() => {
        this.queryInfo();
      });
    }
  },
  methods: {
    //查询合作模式
    queryInfo() {
      const param = {
        token: this.token,
        pageSize: 10,
        curPage: this.currentPage-1,

        filter: {
          listName: "",
          creatorID: "",
          publisher: "",
          songName: "",
          isValid: true
        }
      };
      queryAuditionList(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.tableData = [];
          this.tableData = res.data.item;
          this.getTotal=res.data.count
        } else {
          this.tableData = [];
                    this.getTotal=0

        }
      });
    },
          //点击之后的当前页数
    handleCurrentChange(val) {
      // 当前页数
      this.currentPage = val;
      this.queryInfo();
    },

    close() {
      this.$emit("editDistributeRecorderList");
    }
  }
};
</script>

<style>
.customWidth-addSong {
  width: 500px;
}
</style>
