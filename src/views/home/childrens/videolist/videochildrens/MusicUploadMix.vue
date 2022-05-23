<template>
  <div id="add">
    <el-table :data="tableData" border style="width: 100%;height:auto;" stripe size="mini">
      <el-table-column prop="name" label="歌单名称" width="150" align="center"></el-table-column>
      <el-table-column prop="creatorName" label="歌单创建者" width="100" align="center"></el-table-column>
      <el-table-column prop="valid" label="有效时长(天)" width="100" align="center"></el-table-column>
      <el-table-column prop="valid" label="锁定时长(天)" width="100" align="center"></el-table-column>
      <el-table-column prop="publisherName" label="合作人账号" width="100" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建歌单时间" width="200" align="center"></el-table-column>
      <el-table-column  label="操作"  align="center">
        <template slot-scope="scope">
               <el-button
               size="small"
            type="primary"
         
            @click="CopyUrl(scope.row.url)"
          >复制地址</el-button>
        </template>
      </el-table-column>
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
     <el-dialog :close-on-click-modal='false'
      :footer="false"
      :modal="false"
      title="复制地址"
       style="z-index:2002"
      :visible.sync="dialogVisibleUrl"
      customClass="customWidth-distribute"
    >
      <div style="display: flex;justify-content: center;flex-direction: column;">
        <div style="display: flex;justify-content: center;align-items: center;">
          <div
            style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:250px;"
          >{{customerAddress}}</div>
          <el-button size="small"
            type="primary"
            style="margin-left:20px"
            v-clipboard:copy="customerAddress"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >复制地址</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import { queryAuditionList,baseUrlBuy } from "network/home.js";
import fmtDate from 'common/js/Date.js';

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
      customerAddress:'',
      dialogVisibleUrl:false,
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
    CopyUrl(val){
      this.dialogVisibleUrl=true
 this.customerAddress =
        `${baseUrlBuy}/html/clientLogin.html?type=` + val;
   
    },
     // 复制成功时的回调函数
    onCopy(e) {
       
      this.$message.success("内容已复制到剪切板！");
       this.dialogVisibleUrl=false
    },

    // 复制失败时的回调函数
    onError(e) {
      this.$message.error("抱歉，复制失败！");
    },
    //复制地址
    copyAddress(val) {
      console.log(val);
      // this.visibleUrl = true;
      this.customerAddress =
        `${baseUrlBuy}/html/clientLogin.html?type=` + val;
    },
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
           res.data.item.forEach((element) => {
              element.createTime=this.dateFmt(element.createTime)
           });

          this.tableData = [];
          this.tableData = res.data.item;
          this.getTotal=res.data.count
        } else {
          this.tableData = [];
                    this.getTotal=0

        }
      });
    },
        //时间转化
    dateFmt(date) {
      let d = new Date(date);
      return fmtDate(d, 'yyyy-MM-dd hh:mm:ss');
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
  width: 900px;
}
</style>
