<template>
  <div style="display: flex;
    justify-content: center;width:100%;">
    <div v-if="permission" style="width:100%">
      <div id="musiclist">
        <search-header>
          <div class="option">
            <div class="sing-id option-active">
              <span>时间查询：</span>
              <el-date-picker
                v-model="timeValue"
                value-format="timestamp"
                type="daterange"
                range-separator="至"
                @change="timeChange"
                size="mini"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>

            <div class="sing-id option-active">
              <span>歌曲名称：</span>
              <el-input v-model="seachName" size="mini" placeholder="请输入歌曲名称" style="width: 150px" />
            </div>
            <div class="sing-name option-active">
              <span>作词者：</span>
              <el-input
                v-model="seachLyricist"
                size="mini"
                placeholder="请输入作词者"
                style="width: 150px"
              />
            </div>
            <div class="sing-singer option-active">
              <span>作曲者:</span>

              <el-input
                v-model="seachComposer"
                size="mini"
                placeholder="请输入作词者"
                style="width: 150px"
              />
            </div>
            <div class="sing-musictype option-active">
              <span>歌曲类型：</span>
              <el-select
                v-model="tagValue"
                placeholder="请选择歌曲类型"
                style="width: 150px"
                size="mini"
                @change="changeMusic"
              >
                <el-option
                  v-for="(item, index) in styleType"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
            <div class="btn option-active">
              <div class="refresh" style="margin-left:0px">
                <el-button type="primary" @click="toUploadArrangemen" size="mini">生成试听列表</el-button>
              </div>
              <div class="refresh" style="margin-left:20px">
                <el-button type="primary" size="mini" @click="seachInfo()" icon="el-icon-zoom-in">查询</el-button>
              </div>
              <div class="refresh" style="margin-left:20px">
                <el-button type="info" size="mini" @click="refreshInfo()" icon="el-icon-refresh">重置</el-button>
              </div>
            </div>
          </div>
        </search-header>
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px;"
          stripe
          size="mini"
          :default-sort="{ prop: 'musicid', order: 'ascending' }"
          @selection-change="handleSelectionChange"
        >
          <template slot="empty">
            <p>{{ dataText }}</p>
          </template>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="idActive" label="歌曲编号" width="100" align="center"></el-table-column>
          <el-table-column prop="songName" label="歌曲名称" width="300" align="center"></el-table-column>
          <el-table-column prop="lyricist" label="作词人" width="120" align="center"></el-table-column>
          <el-table-column prop="composer" label="作曲人" width="120" align="center"></el-table-column>
          <el-table-column prop="tag" label="歌曲风格" width="200" align="center"></el-table-column>

          <el-table-column prop="createTime" label="创建时间" width="200" align="center"></el-table-column>
          <el-table-column prop="lastUpdateTime" label="结束时间" width="200" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" style="color:#409eff;">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toLock(scope.row)">锁定</el-dropdown-item>
                    <el-dropdown-item @click.native="toAudition(scope.row)">选择试听</el-dropdown-item>
                    <el-dropdown-item @click.native="toUploadRecorder(scope.row)">查看试听情况</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10]"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            background
            :total="getTotal"
            style="textAlign: right"
          ></el-pagination>
        </div>

        <music-audition :userInfo="userInfo" @editaudition="editaudition" v-if="auditionType"></music-audition>

     
          <music-upload :userInfo="userInfo" @editToAuditionList="editToAuditionList" v-if='toAuditionListType'></music-upload>
        <el-dialog
          :close-on-click-modal="false"
          :footer="false"
          title="查看试听情况"
          :visible.sync="dialogVisibleUploadRecorder"
          customClass="customWidth-distribute"
        >
          <music-upload-recorder
            :userInfo="userInfo"
            @editDistributeRecorder="editDistributeRecorder"
          ></music-upload-recorder>
        </el-dialog>
     
          <music-upload-mix :userInfo="userInfo" @editLock="editLock" v-if="lockType"></music-upload-mix>
        <el-dialog
          :close-on-click-modal="false"
          :footer="false"
          title="复制地址"
          :visible.sync="dialogVisibleUrl"
          customClass="customWidth-distribute"
        >
          <div style="display: flex;justify-content: center;flex-direction: column;">
            <div style="display: flex;justify-content: center;align-items: center;">
              <div
                style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:250px;"
              >{{customerAddress}}</div>
              <el-button
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
    </div>
    <div v-if="!permission">
      <img class="permission-img" src="@/assets/permission.webp" width="900" height="420" />
      <div class="permission-text">对不起，您暂无权限访问该页面，请联系管理员授权！</div>
    </div>
  </div>
</template>

<script>
import {
  musicTypeList,
  musicList,
  deleteMusicById,
  singerList,
  deleteSong,
  getPublishSong,
  putLockIngList
} from "network/home.js";

import SearchHeader from "components/common/header/SearchHeader.vue";
import MusicAdd from "./singerlistchildrens/MusicAdd.vue";
import MusicAudition from "./singerlistchildrens/MusicAudition.vue";
import MusicDistribute from "./singerlistchildrens/MusicDistribute.vue";
import MusicUpload from "./singerlistchildrens/MusicUpload.vue";
import MusicUploadRecorder from "./singerlistchildrens/MusicUploadRecorder.vue";
import MusicUploadMix from "./singerlistchildrens/MusicUploadMix.vue";

import fmtDate from "common/js/Date.js";
import {
  getProductionSong,
  aboutMusicTag,
  openFile,
  openFileActive,
  checkWork,
  baseUrlBuy
} from "network/home.js";

export default {
  name: "MusicList",
  inject: ["reload"],
  components: {
    SearchHeader,
    MusicAdd,
    MusicAudition,
    MusicDistribute,
    MusicUpload,
    MusicUploadRecorder,
    MusicUploadMix,
    getProductionSong
  },

  data() {
    return {
      //音乐列表
      musicInfo: {
        musicName: null,
        musciType: null,
        musicPicture: null,
        musicHot: null,
        musicWordAdress: null,
        musicUrl: null,
        musicSonger: null
      },
      //音乐类型
      musicTypes: [],

      // 歌手列表
      singerList: [],
      //歌手名字列表
      singerNameList: [],
      //歌手搜索框的占位符
      singerContent: "请输入歌手名称",
      dialogVisibleUrl: false,
      // 表单验证

      //表格数据
      tableData: [],
      //搜索框的属性
      search: { musicid: "", musicname: "", musictype: "", singer: "" },

      // 表格数据的总个数
      total: 0,
      //当前页数
      currentPage: 1,
      //1页10个数据
      pagesize: 10,

      //多选
      multipleSelection: [],

      //数据没加载前显示的文本
      dataText: "",
      token: JSON.parse(localStorage.getItem("userInfo")).token,
      styleType: [],
      dialogVisibleAudition: false,
      dialogVisibleDistribute: false,
      dialogVisibleUpload: false,
      dialogVisibleUploadRecorder: false,
      dialogVisibleUploadMix: false,
      userInfo: {},
      editInfo: {},
      songIdArr: [],
      customerAddress: "2323232323232",
      getTotal: 0,
      seachName: "",
      seachLyricist: "",
      seachComposer: "",
      timeValue: "",
      startTime: 0,
      endTime: 0,
      tagValue: "",
      permission: true,
      auditionType: false,
      lockType:false,
      toAuditionListType:false
    };
  },
  created() {
    this.funcGroupArr = JSON.parse(
      localStorage.getItem("userInfo")
    ).account.funcGroup;
    console.log(this.funcGroupArr);
    if (this.funcGroupArr.includes(100) || this.funcGroupArr.includes(651) || this.funcGroupArr.includes(600) ) {
      this.permission = true;
    } else {
      this.permission = false;
    }
    console.log(baseUrlBuy)
    //获取音乐类型列表
    // this.musicTypeList();
    // 获取音乐列表
    this.musicList();
    //this.musicList1();
    this.queryInfoStyle();
  },
  methods: {
    //选择歌曲类型
    changeMusic(val) {
      console.log(val);
      this.tagValue = val;
    },
    //选择时间
    timeChange(val) {
      console.log(val);
      this.startTime = parseInt(val[0] / 1000);
      this.endTime = parseInt(val[1] / 1000);

      // console.log(fmtDate(val[0]))
      //   console.log(this.$moment(val[0]).format.valueOf())
    },
    seachInfo() {
      this.currentPage = 1;

      this.musicList();
    },
    refreshInfo() {
      this.tagValue = "";
      this.currentPage = 1;
      this.timeValue = "";
      this.startTime = 0;

      this.seachName = "";
      (this.seachLyricist = ""), (this.seachComposer = "");
      this.musicList();
    },
    //锁定歌曲
    toLock(row) {
      this.userInfo = { ...row };

      this.lockType = true;
    },
    // 复制成功时的回调函数
    onCopy(e) {
      this.$message.success("内容已复制到剪切板！");
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
        //"http://106.53.61.91:8990/html/clientLogin.html?type=" + val.url;
        `${baseUrlBuy}/html/clientLogin.html?type=` + val.url;
    },

    //上传编曲取消

    editDistributeRecorder() {
      this.dialogVisibleUploadRecorder = false;
      this.musicList();
    },
    editLock() {
      this.lockType = false;
      this.musicList();
    },
    editDistributeActive(data) {
      console.log(data);
      this.dialogVisibleUpload = false;
      this.dialogVisibleUrl = true;
      this.customerAddress =
        `${baseUrlBuy}/html/clientLogin.html?type=` + data;
      this.musicList();
    },
    //审核
    toReview(row, type, typeNum) {
      // console.log(row)
      // let tempType=''
      // if(row.producerNick=='录音完成'){
      //   tempType='record'
      // }
      // else if(rwo.producerNick=='编曲完成'){
      //   tempType='arrangement'
      // }else{
      //   tempType='arrangement'
      // }
      // return false
      let tempType = "";
      if (row.progressRate == "录音师已提交") {
        tempType = "record";
      } else if (row.progressRate == "编曲师已提交") {
        tempType = "arrangement";
      } else {
        tempType = "mix";
      }
      console.log(row);
      const param = {
        token: this.token,
        songID: row.id,
        step: tempType,
        operation: parseInt(typeNum),
        remark: "暂无备注"
      };
      checkWork(param).then(res => {
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "操作成功！"
          });
          //this.submitForm();//提交表单
        } else {
          this.$message({
            type: "error",
            message: "操作失败！"
          });
        }
      });
    },
    //上传编曲文件
    toUploadArrangemen(row) {
      console.log(this.songIdArr);
      if(this.songIdArr.length==0){
            this.$message({
            type: "error",
            message: "请至少选择一首歌！"
          });
          return false
      }
      this.userInfo = { ...row, songIdArr: this.songIdArr };
      this.toAuditionListType = true;
    },
    //取消生成试听列表
    editToAuditionList(val){
      console.log(val)
      if(val){
    this.toAuditionListType = false;
       this.customerAddress =
        `${baseUrlBuy}/html/clientLogin.html?type=` + val;
            this.dialogVisibleUrl = true;
            
      }
      else{
            this.toAuditionListType = false;
      }
  

     // this.musicList();

    },
    //上传录音文件
    toUploadRecorder(row) {
      this.userInfo = { ...row };
      this.dialogVisibleUploadRecorder=true
      //this.lockType = true;
    },

    editDistribute() {
      this.dialogVisibleDistribute = false;
      this.musicList();
    },

    //试听
    toAudition(row) {
      console.log("***8");
      this.userInfo = { ...row };
      this.auditionType = true;
    },
    //取消试听
    editaudition() {
      this.auditionType = false;
    },

    //查询合作模式
    queryInfoStyle() {
      const param = {
        token: this.token,
        action: "get"
      };
      aboutMusicTag(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          // this.tableData=[]
          // this.tableData=res.data
          this.styleType = res.data;
        } else {
          this.styleType = res.data;
        }
      });
    },

    //获得音乐类型列表
    musicTypeList() {
      musicTypeList().then(res => {
        this.musicTypes = res;
      });
    },

    //获取音乐列表
    musicList() {
      let createTimeReg = [];
      if (this.startTime == 0) {
        createTimeReg = [];
      } else {
        createTimeReg = [this.startTime, this.endTime];
      }
      let tagValue = [];
      if (this.tagValue == "") {
        tagValue = [];
      } else {
        tagValue = [this.tagValue];
      }
      const param = {
        token: this.token,
        pageSize: 10,
        curPage: this.currentPage - 1,
        filter: {
          progressRateReg: [599, 599],
          createTimeReg: createTimeReg,
          songName: this.seachName,
          lyricist: this.seachLyricist,
          composer: this.seachComposer,
          tag: tagValue
        }
      };
      getProductionSong(param).then(res => {
        console.log(res);
        console.log(this.styleType);
        this.tableData = [];
        this.getTotal = res.data.count;
        res.data.item.forEach((items, index) => {
          let tempStatus = "";
          switch (items.progressRate) {
            case 0:
              tempStatus = "已提交小样";
              break;
            case 100:
              tempStatus = "已提交小样";
              break;
            case 150:
              tempStatus = "已分配编曲组长";
              break;
            case 200:
              tempStatus = "已分配编曲师";
              break;
            case 220:
              tempStatus = "编曲师已提交";
              break;
            case 299:
              tempStatus = "编曲已完成";
              break;
            case 300:
              tempStatus = "已分配录音组长";
              break;
            case 350:
              tempStatus = "已分配录音师";
              break;
            case 370:
              tempStatus = "录音师已提交";
              break;
            case 499:
              tempStatus = "录音完成";
              break;
            case 500:
              tempStatus = "已分配缩混组长";
              break;
            case 550:
              tempStatus = "已分配缩混师";
              break;
            case 570:
              tempStatus = "缩混师已提交";
              break;
            case 599:
              tempStatus = "缩混完成";
              break;
          }
          let obj = {
            createTime: this.dateFmt(items.createTime),
            lastUpdateTime: this.dateFmt(items.lastUpdateTime),

            songName: items.submitter.songName,
            composer: items.submitter.composer,
            lyricist: items.submitter.lyricist,
            tag: items.submitter.tagName.join(","),
            id: items.id,
            // idActive: items.id.substring(items.id.length-5),
            idActive: items.no,
            demoFile: items.submitter.demoFile,
            lyricsFile: items.submitter.lyricsFile,
            producerNick: items.producerNick,
            progressRate: tempStatus,
            progressRateActive: items.progressRate,
            mixFile: items.mix.auditionFile
          };
          this.tableData.push(obj);
        });
      });
    },

    handleSelectionChange(val) {
      console.log(val);
      this.songIdArr = [];
      val.filter((item, index) => {
        this.songIdArr.push(item.id);
      });
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },

    //点击之后的当前页数
    handleCurrentChange(val) {
      console.log(val)
      // 当前页数
      this.currentPage = val;
         this.musicList();
    },

    //时间转化
    dateFmt(date) {
      let d = new Date(date);
      return fmtDate(d, "yyyy-MM-dd hh:mm:ss");
    },
    //刷新
    refresh() {
      this.reload();
    }
  }
};
</script>

<style >
.customWidth-audition {
  width: 500px;
}
.customWidth-distribute {
  width: 500px;
}
.option {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

/* .option div {
  margin-left: 20px;
  margin-top: 5px;
} */
.option .option-active {
  /* margin-left: 20px;
  margin-top: 5px; */
  display: flex;
  align-items: center;
  height: 40px;
}

.option .btn {
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
  /* margin-left: 770px;
  margin-top: 5px; */
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
.permission-img {
  width: 900px;
  height: 420px;
   display: flex;
  justify-content: center;
  text-align: center
}
.permission-text {
  display: flex;
  justify-content: center;
  font-size: 30px;
  color: #9abee3;
}
</style>
