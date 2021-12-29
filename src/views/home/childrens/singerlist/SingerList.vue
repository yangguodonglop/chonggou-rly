<template>
  <div id="singer-list">
    <search-header>
      <div class="option">
        <div class="singer-id">
          <span>歌手编号：</span
          ><el-input
            v-model="search.singerId"
            size="mini"
            placeholder="请输入歌手编号"
            style="width: 150px"
            @focus="inputChange('singerId')"
          />
        </div>
        <div class="singer-name">
          <span>歌手名称：</span
          ><el-input
            v-model="search.singerName"
            size="mini"
            placeholder="请输入歌曲名称"
            style="width: 150px"
            @focus="inputChange('singerName')"
          />
        </div>
        <div class="singer-type">
          <span>歌手类型：</span>
          <el-select
            v-model="search.singerType"
            placeholder="请选择歌手类型"
            style="width: 150px"
            size="mini"
            @change="Change('type', search.singerType)"
          >
            <el-option
              v-for="(item, index) in singerType"
              :label="item.typename"
              :value="item.typename"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div class="singer-address">
          <span>歌手所属：</span>
          <el-select
            v-model="search.singerAddress"
            placeholder="请选择歌手所属"
            style="width: 150px"
            size="mini"
            @change="Change('address', search.singerAddress)"
          >
            <el-option
              v-for="(item, index) in singerAddress"
              :label="item"
              :value="item"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div class="btn">
          <singer-add
            :singer-type="singerType"
            :singer-address="singerAddress"
          ></singer-add>
          <singer-detele
            :multiple-selection="multipleSelection"
          ></singer-detele>
          <div class="refresh">
            <el-button
              type="info"
              @click="refresh"
              size="small"
              icon="el-icon-refresh"
            ></el-button>
          </div>
        </div>
      </div>
    </search-header>
    <el-table
      :data="getTableData"
      height="330"
      border
      style="width: 100%"
      stripe
      size="mini"
      :default-sort="{ prop: 'singerid', order: 'ascending' }"
      @selection-change="handleSelectionChange"
    >
      <template slot="empty">
        <p>{{ dataText }}</p>
      </template>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="singerid"
        label="歌手编号"
        width="100"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="singername"
        label="歌手名称"
        sortable
        width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="singerphotourl"
        label="歌手图片"
        width="250"
        align="center"
      >
        <!-- 可以使用scope获得改行的数据，row、column、$index、data -->
        <template slot-scope="scope">
          <img :src="scope.row.singerphotourl" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        prop="singerhot"
        label="歌手热度"
        width="110"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="singertype.typename"
        label="歌手类型"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="歌手所属"
        width="110"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
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
import { singerList, singerTypeList, deleteSingerById } from "network/home.js";
import SearchHeader from "components/common/header/SearchHeader.vue";
import SingerAdd from "./singerlistchildrens/SingerAdd.vue";
import SingerDetele from "./singerlistchildrens/SingerDelete.vue";
export default {
  components: { SearchHeader, SingerAdd, SingerDetele },
  name: "SingerList",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      search: {
        singerId: "",
        singerName: "",
        singerType: "",
        singerAddress: ""
      },
      singerType: [],
      singerAddress: ["内地", "港台", "韩国", "日本", "欧美", "其他"],
      // 表格数据的总个数
      total: 0,
      //当前页数
      currentPage: 1,
      //1页10个数据
      pagesize: 10,
      multipleSelection: [],
      dataText: ""
    };
  },
  created() {
    this.singerList();
    this.singerTypeList();
  },
  methods: {
    refresh() {
      this.reload();
    },
    //点击之后的当前页数
    handleCurrentChange(val) {
      // 当前页数
      this.currentPage = val;
    },
    // 检测表单的变化
    inputChange(param) {
      if (param === "singerId") {
        this.search.singerName = "";
        this.search.singerType = "";
        this.search.singerAddress = "";
      } else if (param === "singerName") {
        this.search.singerId = "";
        this.search.singerType = "";
        this.search.singerAddress = "";
      }
    },
    // 检测下拉列表的变化
    Change(param, val) {
      if (param === "type" && val !== "") {
        this.search.singerName = "";
        this.search.singerId = "";
        this.search.singerAddress = "";
      } else if (param === "address" && val !== "") {
        this.search.singerName = "";
        this.search.singerId = "";
        this.search.singerType = "";
      }
    },
    // 多选框选择的信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 热度过滤以万为单位
    hotFilter(val) {
      if (val < 10000) {
        return val;
      } else if (val < 100000000) {
        return val / 10000 + "万";
      } else {
        return val / 100000000 + "亿";
      }
    },
    // 添加歌手列表
    singerList() {
      singerList().then(res => {
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
          res[i].singerhot = this.hotFilter(res[i].singerhot);
          res[i].singerphotourl =
            "http://localhost:8090/musicstatic/" + res[i].singerphotourl;
        }
        this.tableData = res;
        if (this.tableData.length === 0) {
          this.dataText = "暂无数据";
        }
      });
    },
    // 添加歌手类型列表
    singerTypeList() {
      singerTypeList().then(res => {
        // console.log(res);
        this.singerType = res;
      });
    },
    checkClick(row) {
      console.log(row);
      this.$router.push({
        path: "/singercheck",
        query: {
          sid: row.singerid
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
          deleteSingerById(row.singerid).then(res => {
            // console.log(res);
            if (res === "success") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
          this.refresh();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    updateClick(row) {
      this.$router.push({
        path: "/singerupdate",
        query: {
          sid: row.singerid
        }
      });
    }
  },
  computed: {
    getTableData() {
      if (this.search.singerId) {
        return this.tableData
          .filter(data => {
            if (data.singerid == this.search.singerId) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.singerName) {
        return this.tableData
          .filter(data => {
            if (
              data.singername
                .toLowerCase()
                .includes(this.search.singerName.toLowerCase())
            ) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.singerType) {
        return this.tableData
          .filter(data => {
            if (
              data.singertype.typename
                .toLowerCase()
                .includes(this.search.singerType)
            ) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.singerAddress) {
        return this.tableData
          .filter(data => {
            if (
              data.address
                .toLowerCase()
                .includes(this.search.singerAddress.toLowerCase())
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
      if (this.search.singerId) {
        return this.tableData.filter(data => {
          if (data.singerid == this.search.singerId) {
            return data;
          }
        }).length;
      }
      if (this.search.singerName) {
        return this.tableData.filter(data => {
          if (
            data.singername
              .toLowerCase()
              .includes(this.search.singerName.toLowerCase())
          ) {
            return data;
          }
        }).length;
      }
      if (this.search.singerType) {
        return this.tableData.filter(data => {
          if (
            data.singertype.typename
              .toLowerCase()
              .includes(this.search.singerType)
          ) {
            return data;
          }
        }).length;
      }
      if (this.search.singerAddress) {
        return this.tableData.filter(data => {
          if (
            data.address
              .toLowerCase()
              .includes(this.search.singerAddress.toLowerCase())
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
.option {
  display: flex;
  flex-wrap: wrap;
}

.option div {
  margin-left: 20px;
  margin-top: 5px;
}

.option .btn {
  display: flex;
  justify-content: space-around;
  margin-left: 770px;
  margin-top: 5px;
}

span {
  font-size: 12px;
}

.block {
  margin-top: 15px;
}

img {
  width: 50px;
  height: 50px;
}
</style>
