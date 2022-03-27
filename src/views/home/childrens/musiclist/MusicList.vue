<template>
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
          <el-input v-model="seachLyricist" size="mini" placeholder="请输入作词者" style="width: 150px" />
        </div>
        <div class="sing-singer option-active">
          <span>作曲者:</span>

          <el-input v-model="seachComposer" size="mini" placeholder="请输入作词者" style="width: 150px" />
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
          <el-button type="primary"  icon="el-icon-zoom-in" size="mini" @click="addMusicActive()">上传成品</el-button>
          <el-button type="primary" icon="el-icon-zoom-in"  style="margin-left:20px;" size="mini" @click="addMusic()">上传小样</el-button>
            <el-button type="danger" size="mini" @click="deleteAll()" style="margin-left:20px;"  icon="el-icon-delete">删除</el-button>

          <!-- <music-delete style="margin-left:20px" :multiple-selection="multipleSelection"></music-delete> -->

          <div class="refresh" style="margin-left:20px">
            <el-button  type="primary"  size="mini" @click="seachInfo()" icon="el-icon-zoom-in">查询</el-button>
          </div>
          <div class="refresh" style="margin-left:20px">
            <el-button type="info" size="mini" @click="refreshInfo()" icon="el-icon-refresh">重置</el-button>
          </div>
        </div>
      </div>
    </search-header>
    <el-table :data="tableData" border ref="multipleTable" @selection-change="handleSelectionChange" style="width: 100%;margin-top:20px;" stripe size="mini">
      <template slot="empty">
        <p>{{ dataText }}</p>
      </template>
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="musicid" label="歌曲编号" width="100" align="left"></el-table-column>
      <el-table-column label="歌曲名称" align="left">
        <template slot-scope="scope">
          <div>
            <span
              v-if="scope.row.progressRateActive>=720"
              style="color:green"
            >{{ scope.row.songName }}(已发布)</span>
            <span
              v-if="scope.row.progressRateActive<720"
              style="color:red"
            >{{ scope.row.songName }}(未发布)</span>
            <el-button
              style="margin-left:20px;"
              type="primary"
              size="mini"
              @click="toRemark(scope.row)"
            >确 定</el-button>
            <el-button
              style="margin-left:20px;"
              type="primary"
              v-if="scope.row.remark.length>0"
              size="mini"
              @click="toCheck(scope.row)"
            >查看</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="歌曲风格" width="150" align="left"></el-table-column>
      <el-table-column prop="lyricist" label="作词人" width="120" align="left"></el-table-column>
      <el-table-column prop="composer" label="作曲人" width="120" align="left"></el-table-column>
      <el-table-column prop="producerNick" label="制作人" width="120" align="left"></el-table-column>
      <el-table-column label="歌曲状态" width="150" align="left">
        <template slot-scope="scope">
          <div>
            <span style="color:#ffa500">{{ scope.row.progressRate }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150" align="left"></el-table-column>

      <el-table-column prop="publishTime" label="发布时间" width="150" align="left"></el-table-column>

      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <div>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link" style="color:#409eff;">
                操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toAudition(scope.row)">选择试听</el-dropdown-item>
                <el-dropdown-item
                  v-if="producerHideMain"
                  @click.native="toDistribute(scope.row, 'producer', '200')"
                >分配制作人</el-dropdown-item>
                <el-dropdown-item
                  v-if="producerHide"
                  @click.native="toDistribute(scope.row, 'arrangementM', '300')"
                >分配编曲组长</el-dropdown-item>
                <el-dropdown-item
                  v-if="arrangementHideM"
                  @click.native="toDistribute(scope.row, 'arrangement', '351')"
                >分配编曲师</el-dropdown-item>
                <el-dropdown-item
                  v-if="producerHide"
                  @click.native="toDistribute(scope.row, 'recorderM', '400')"
                >分配录音组长</el-dropdown-item>
                <el-dropdown-item
                  v-if="recorderHideM"
                  @click.native="toDistribute(scope.row, 'recorder', '451')"
                >分配录音师</el-dropdown-item>
                <el-dropdown-item
                  v-if="producerHide"
                  @click.native="toDistribute(scope.row, 'mixerM', '500')"
                >分配混音组长</el-dropdown-item>
                <el-dropdown-item
                  v-if="mixerHideM"
                  @click.native="toDistribute(scope.row, 'mixer', '551')"
                >分配混音师</el-dropdown-item>
                <el-dropdown-item
                  v-if="arrangementHide"
                  @click.native="toUploadArrangemen(scope.row)"
                >上传编曲</el-dropdown-item>
                <el-dropdown-item
                  v-if="recorderHide"
                  @click.native="toUploadRecorder(scope.row)"
                >上传录音</el-dropdown-item>
                <el-dropdown-item v-if="mixerHide" @click.native="toUploadMix(scope.row)">上传缩混</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row, 'arractive')">下载小样文件</el-dropdown-item>
                <el-dropdown-item
                  v-if="lyricsZzHide"
                  @click.native="todownLoadText(scope.row)"
                >重新上传歌词</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row, 'arr')">下载编曲小样文件</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row, 'arrPro')">下载编曲工程文件</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row, 'rec')">下载录音小样文件</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row, 'recPro')">下载录音工程文件</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row, 'mix')">下载缩混小样文件</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row, 'mixPro')">下载录缩混程文件</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row, 'mixPro')">下载导唱文件</el-dropdown-item>
                <el-dropdown-item v-if="producerHide" @click.native="toReview(scope.row, '30')">通过</el-dropdown-item>
                <el-dropdown-item
                  v-if="producerHide"
                  @click.native="toReview(scope.row, 'arrangement', '20')"
                >驳回</el-dropdown-item>
                <el-dropdown-item v-if="producerHide" @click.native="deleteClick(scope.row)">删除</el-dropdown-item>
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
   

    <el-dialog
      :close-on-click-modal="false"
      :footer="false"
      title="上传编曲"
      :visible.sync="dialogVisibleUpload"
      customClass="customWidth-distribute"
    >
      <music-upload :userInfo="userInfo" @editDistributeBq="editDistributeBq"></music-upload>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :footer="false"
      title="重新上传歌词"
      :visible.sync="dialogVisibleText"
      customClass="customWidth-distribute"
    >
      <music-upload-text :userInfo="userInfo" @editDistributeText="editDistributeText"></music-upload-text>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :footer="false"
      title="上传录音"
      :visible.sync="dialogVisibleUploadRecorder"
      customClass="customWidth-distribute"
    >
      <music-upload-recorder :userInfo="userInfo" @editDistributeRecorder="editDistributeRecorder"></music-upload-recorder>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :footer="false"
      title="上传缩混"
      :visible.sync="dialogVisibleUploadMix"
      customClass="customWidth-distribute"
    >
      <music-upload-mix :userInfo="userInfo" @editDistributeSh="editDistributeSh"></music-upload-mix>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :footer="false"
      title="添加备注"
      :visible.sync="dialogVisibleRemark"
      customClass="customWidth-distribute"
    >
      <music-remark :userInfo="userInfo" @editRemark="editRemark"></music-remark>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :footer="false"
      title="查看备注"
      :visible.sync="dialogVisibleRemarkActive"
      customClass="customWidth-distribute"
    >
      <music-remark-active :userInfo="userInfo" @editRemarkActive="editRemarkActive"></music-remark-active>
    </el-dialog>

    <music-add-active
      v-if="addMusicTypeCp"
      style="margin-left:0px"
      :music-type-list="musicTypes"
      @addMusicCp="addMusicCp"
    ></music-add-active>

    <music-add
      v-if="addMusicTypeXy"
      style="margin-left:20px"
      :music-type-list="musicTypes"
      @addMusicXy="addMusicXy"
    ></music-add>
          <music-distribute :userInfo="userInfo" v-if="processType" @editProcess="editProcess"></music-distribute>

  </div>
</template>

<script>
import {
  musicTypeList,
  musicList,
  deleteMusicById,
  singerList,
  deleteSong,
  baseUrl
} from "network/home.js";

import SearchHeader from "components/common/header/SearchHeader.vue";
import SearchInput from "components/common/searchinput/SearchInput.vue";

import MusicAdd from "./musiclistchildrens/MusicAdd.vue";
import MusicAddActive from "./musiclistchildrens/MusicAddActive.vue";
import MusicDelete from "./musiclistchildrens/MusicDelete.vue";
import MusicAudition from "./musiclistchildrens/MusicAudition.vue";
import MusicDistribute from "./musiclistchildrens/MusicDistribute.vue";
import MusicUpload from "./musiclistchildrens/MusicUpload.vue";
import MusicUploadText from "./musiclistchildrens/MusicUploadText.vue";
import MusicUploadRecorder from "./musiclistchildrens/MusicUploadRecorder.vue";
import MusicUploadMix from "./musiclistchildrens/MusicUploadMix.vue";
import MusicRemark from "./musiclistchildrens/MusicRemark.vue";
import MusicRemarkActive from "./musiclistchildrens/MusicRemarkActive.vue";

import fmtDate from "common/js/Date.js";
import {
  getProductionSong,
  aboutMusicTag,
  openFile,
  openFileActive,
  checkWork,
  uploadFile,
  downloadFile,
  tempDownLoadFile
} from "network/home.js";

export default {
  name: "MusicList",
  inject: ["reload"],
  components: {
    SearchHeader,
    SearchInput,
    MusicAdd,
    MusicDelete,
    MusicAudition,
    MusicDistribute,
    MusicUpload,
    MusicUploadRecorder,
    MusicUploadMix,
    MusicAddActive,
    MusicRemark,
    MusicRemarkActive,
    MusicUploadText
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
      getTotal: 0,
      dialogVisibleRemark: false,
      dialogVisibleRemarkActive: false,
      dialogVisibleText: false,
      //音乐类型
      musicTypes: [],

      // 歌手列表
      singerList: [],
      //歌手名字列表
      singerNameList: [],
      //歌手搜索框的占位符
      singerContent: "请输入歌手名称",
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
      producerHideMain: false,
      funcGroupArr: [],
      seachName: "",
      seachLyricist: "",
      seachComposer: "",
      timeValue: "",
      startTime: 0,
      endTime: 0,
      tagValue: "",
      producerHide: false,
      producerHideMain: false,
      arrangementHide: false,
      recorderHide: false,
      mixerHide: false,
      arrangementHideM: false,
      lyricsZzHide: false,
      recorderHideM: false,
      mixerHideM: false,
      permission: true,

      addMusicTypeCp: false,
      addMusicTypeXy: false,
      titleFp: "分配制作人",
      processType:false,
      auditionType:false,
      plIds:[]
    };
  },
  created() {
    // console.log(JSON.parse(localStorage.getItem("userInfo")).account.funcGroup )
    this.funcGroupArr = JSON.parse(
      localStorage.getItem("userInfo")
    ).account.funcGroup;
    console.log(this.funcGroupArr);
    if (this.funcGroupArr.includes(100)) {
      this.permission = true;
    } else {
      this.permission = false;
    }
    if (
      this.funcGroupArr.includes(150) == true ||
      this.funcGroupArr.includes(100) == true
    ) {
      this.producerHideMain = true;
    }
    if (
      this.funcGroupArr.includes(200) == true ||
      this.funcGroupArr.includes(100) == true
    ) {
      this.producerHide = true;
    }
    if (
      this.funcGroupArr.includes(300) == true ||
      this.funcGroupArr.includes(100) == true
    ) {
      this.arrangementHideM = true;
    }
    if (
      this.funcGroupArr.includes(251) == true ||
      this.funcGroupArr.includes(100) == true
    ) {
      this.lyricsZzHide = true;
    }
    if (
      this.funcGroupArr.includes(400) == true ||
      this.funcGroupArr.includes(100) == true
    ) {
      this.recorderHideM = true;
    }
    if (
      this.funcGroupArr.includes(500) == true ||
      this.funcGroupArr.includes(100) == true
    ) {
      this.mixerHideM = true;
    }
    if (
      this.funcGroupArr.includes(351) == true ||
      this.funcGroupArr.includes(100) == true
    ) {
      this.arrangementHide = true;
    }
    if (
      this.funcGroupArr.includes(451) == true ||
      this.funcGroupArr.includes(100) == true
    ) {
      this.recorderHide = true;
    }
    if (
      this.funcGroupArr.includes(551) == true ||
      this.funcGroupArr.includes(100) == true
    ) {
      this.mixerHide = true;
    }

    //获取音乐类型列表
    // this.musicTypeList();
    // 获取音乐列表
    this.queryAuthInfo();
    this.musicList();
    //this.musicList1();
    this.queryInfoStyle();
    //获取歌手列表
    // this.getSingerList();
  },
  mounted() {},
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
    //重新上传歌词
    todownLoadText(row) {
      this.userInfo = { ...row };

      this.dialogVisibleText = true;
    },

    //添加备注
    toRemark(row) {
      this.userInfo = { ...row };

      this.dialogVisibleRemark = true;
    },
    //查看备注
    toCheck(row) {
      this.userInfo = { ...row };

      this.dialogVisibleRemarkActive = true;
    },
    //权限查询
    queryAuthInfo() {
      this.funcGroupArr = localStorage.getItem("userInfo").split(",");
    },
    //批量勾选
    handleSelectionChange(val){
      console.log(val)
      this.plIds=[]
      if(val.length>0){
        this.plIds.push(val.id)
      }
        this.multipleSelection = val;
      console.log(this.multipleSelection);
      console.log(this.$refs.multipleTable.selection)
    },

    //下载小样
    todownLoad(val, item) {
      console.log(val, item);
      const param = {
        token: this.token,
        songID: val.id,
        category: item
      };
      // this.postExcelFile(param,"http://106.53.61.91:6325/rylBGM/productLine/downloadFile", );
      downloadFile(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          let tempMd5 = res.data;
          //     const Base64 = require("js-base64").Base64;
          // const exStr = Base64.encodeURI(type);
          // const fileName = val.cr_songName;
          let openUrl = baseUrl + "/productLine/tempDownLoadFile/" + tempMd5;
          window.open(openUrl, "_blank");
          // tempDownLoadFile(tempMd5)
        }
      });
    },
    //点击之后的当前页数
    handleCurrentChange(val) {
      // 当前页数
      this.currentPage = val;
      this.musicList();
    },
    //删除歌曲
    deleteClick(row) {
      const param = {
        token: this.token,
        songID: row.id
      };
      this.$confirm("完成信息核对, 确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteSong(param).then(res => {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.findUserInfo();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {});
    },
    deleteAll(){

    },
    //上传编曲取消
    editDistributeText() {
      this.dialogVisibleText = false;
      this.musicList();
    },

    editDistributeRecorder() {
      this.dialogVisibleUploadRecorder = false;
      this.musicList();
    },
    //备注确认
    editRemark() {
      this.dialogVisibleRemark = false;
      this.musicList();
    },
    //查看备注确认
    editRemarkActive() {
      this.dialogVisibleRemarkActive = false;
      this.musicList();
    },
    //审核
    toReview(row, typeNum) {
      console.log(row);
      console.log(typeNum);
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
      if (row.progressRateActive == 370) {
        tempType = "record";
      } else if (row.progressRateActive == 220) {
        tempType = "arrangement";
      } else if (row.progressRateActive == 570) {
        tempType = "mix";
      }
      console.log(row);
      const param = {
        token: this.token,
        songID: [row.id],
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
        this.musicList();
      });
    },
    //上传编曲文件
    toUploadArrangemen(row) {
      this.userInfo = { ...row };
      this.dialogVisibleUpload = true;
    },
    //上传录音文件
    toUploadRecorder(row) {
      this.userInfo = { ...row };
      this.dialogVisibleUploadRecorder = true;
    },
    toUploadMix(row) {
      this.userInfo = { ...row };
      this.dialogVisibleUploadMix = true;
    },
    editDistributeBq() {
      this.dialogVisibleUpload = false;
      this.musicList();
    },
    editDistributeSh() {
      this.dialogVisibleUploadMix = false;
      this.musicList();
    },
    //上传成品
    addMusicActive() {
      this.addMusicTypeCp = true;
      // this.musicList();
    },
    //上传小样
    addMusic() {
      this.addMusicTypeXy = true;
      // this.musicList();
    },
    //成品返回确认查询
    addMusicCp() {
      this.addMusicTypeCp = false;
      this.musicList();
    },
    //小样返回确认查询
    addMusicXy() {
      this.addMusicTypeXy = false;
      this.musicList();
    },
    editDistribute() {
      this.dialogVisibleDistribute = false;
      this.musicList();
    },
    //分配制作人
    toDistribute(row, type, group) {
    
      console.log(group);
      switch (group) {
        case "200":
          this.titleFp = "分配制作人";
          break;
        case "300":
          this.titleFp = "分配编曲组长";
          break;
        case "351":
          this.titleFp = "分配编曲师";
          break;
        case "400":
          this.titleFp = "分配录音组长";
          break;
        case "451":
          this.titleFp = "分配录音师";
          break;
        case "500":
          this.titleFp = "分配混音组长";
          break;
        case "551":
          this.titleFp = "分配混音师";
          break;
      }
      const param = {
        selecttype: type,
        fFuncGroup: group
      };
      const process={
        processType:this.titleFp,
        plIds:this.plIds
      }
      this.userInfo = { ...row, ...param,process };
      this.processType = true;
    },
    editProcess(){
     this.processType = false; 
        this.musicList();
    },
    //试听
    toAudition(row) {
      console.log("***8");
      this.userInfo = { ...row };
      this.auditionType = true;
    },
    //取消试听
    editaudition(){
        this.auditionType = false;
    },
    // 操作
    handleCommand() {},
    //删除
    deleteClick(row) {
      console.log(row);
      const param = {
        token: this.token,
        songID: [row.id]
      };
      // console.log(row);
      this.$confirm("完成信息核对, 确认提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteSong(param).then(res => {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.musicList();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {});
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
    checkClick(row) {
      this.$router.push({
        path: "/musiccheck",
        query: {
          mid: row.musicid
        }
      });
    },

    updateClick(row) {
      this.$router.push({
        path: "/musicupdate",
        query: {
          mid: row.musicid
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
          progressRateReg: [],
          createTimeReg: createTimeReg,
          songName: this.seachName,
          lyricist: this.seachLyricist,
          composer: this.seachComposer,
          tag: tagValue
        }
      };
      getProductionSong(param).then(res => {
        console.log(res);
        this.tableData = [];
        res.data.item.forEach((items, index) => {
          let tempStatus = "";
          switch (items.progressRate) {
            case 0:
              tempStatus = "已提交小样";
              break;
            case 100:
              tempStatus = "已分配制作人";
              break;
            case 150:
              tempStatus = `已分配编曲组长--${items.producer}`;
              break;
            case 200:
              tempStatus = `已分配编曲师--${items.arrangement.workerNick}`;
              break;
            case 220:
              tempStatus = `编曲师已提交--${items.arrangement.workerNick}`;
              break;
            case 299:
              tempStatus = "编曲已完成且已通过审核";
              break;
            case 300:
              tempStatus = `已分配录音组长--${items.recording.leaderNick}`;
              break;
            case 350:
              tempStatus = `已分配录音师--${items.recording.workerNick}`;
              break;
            case 370:
              tempStatus = `录音师已提交--${items.recording.workerNick}`;
              break;
            case 499:
              tempStatus = "录音完成且已通过审核";
              break;
            case 500:
              tempStatus = `已分配缩混组长--${items.mix.leaderNick}`;
              break;
            case 550:
              tempStatus = `已分配缩混师--${items.mix.workerNick}`;
              break;
            case 570:
              tempStatus = `缩混师已提交--${items.mix.workerNick}`;
              break;
            case 599:
              tempStatus = "缩混完成且已通过审核";
              break;
            case 720:
              tempStatus = "客户已经买入";
              break;
            case 730:
              tempStatus = "已收到合同";
              break;
            case 740:
              tempStatus = "收到首笔款";
              break;
            case 1000:
              tempStatus = "发布等一系列流程完毕";
              break;
          }
          let obj = {
            songName: items.submitter.songName,
            composer: items.submitter.composer,
            lyricist: items.submitter.lyricist,
            tag: items.submitter.tagName.join(","),
            id: items.id,
            demoFile: items.submitter.demoFile,
            lyricsFile: items.submitter.lyricsFile,
            producerNick: items.producerNick,
            progressRate: tempStatus,
            progressRateActive: items.progressRate,
            mixFile: items.mix.auditionFile,
            remark: items.remark,
            createTime: this.dateFmt(items.createTime),
            publishTime: this.dateFmt(items.publish.publishTime)
          };
          this.tableData.push(obj);
        });
        console.log(this.tableData);
        this.getTotal = res.data.count;
      });
    },
    //获取歌手列表
    getSingerList() {
      singerList().then(res => {
        // console.log(res);
        this.singerList = res;
        for (var i = 0; i < res.length; i++) {
          //将其转化为value：singername的形式
          this.singerNameList.push({ value: res[i].singername });
        }
        // console.log(this.singerNameList);
      });
    },

    //从搜索框的子组件的事件获取search值
    getSearch(value) {
      this.search.singer = value;
    },
    //当表单下拉框有值时，消除其余的表单下拉框的值
    Change(param, val) {
      if (param === "type" && val != "") {
        this.search.musicid = "";
        this.search.musicname = "";
        this.search.singer = "";
      }
    },
    //当表单搜索框有值时，消除其余的表单搜索框的值
    inputchange(param) {
      if (param === "musicid") {
        this.search.musicname = "";
        this.search.musictype = "";
        this.search.singer = "";
      } else if (param === "musicname") {
        this.search.musicid = "";
        this.search.singer = "";
        this.search.musictype = "";
      }
    },
    //获取歌手搜索框的焦点
    getFocus() {
      this.search.musicid = "";
      this.search.musicname = "";
      this.search.musictype = "";
      this.search.singer = "";
    },

    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    //   // console.log(this.multipleSelection);
    // },

    hotFilter(val) {
      if (val < 10000) {
        return val;
      } else if (10000 <= val < 100000000) {
        return val / 10000 + "万";
      } else {
        return val / 100000000 + "亿";
      }
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
  },
  computed: {
    getTableData() {
      if (this.search.musicid) {
        return this.tableData
          .filter(data => {
            if (data.musicid == this.search.musicid) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.musicname) {
        return this.tableData
          .filter(data => {
            if (
              data.musicname
                .toLowerCase()
                .includes(this.search.musicname.toLowerCase())
            ) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.singer) {
        return this.tableData
          .filter(data => {
            if (
              data.singer.singername
                .toLowerCase()
                .includes(this.search.singer.toLowerCase())
            ) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.musictype) {
        return this.tableData
          .filter(data => {
            if (
              data.musictype.musictypename
                .toLowerCase()
                .includes(this.search.musictype.toLowerCase())
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
    }
  }
};
</script>

<style>
.el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}
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
  display: flex;
  align-items: center;
  height: 40px;
  margin-left: 20px;
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
}
.permission-text {
  display: flex;
  justify-content: center;
  font-size: 30px;
  color: #9abee3;
}
</style>
