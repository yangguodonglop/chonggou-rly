<template>
  <div id="musiclist">
    <search-header>
      <div class="option">
        <div class="sing-id option-active">
          <span>歌曲编号：</span>
          <el-input
            v-model="search.musicid"
            size="mini"
            placeholder="请输入歌曲编号"
            style="width: 150px"
            @focus="inputchange('musicid')"
          />
        </div>
        <div class="sing-name option-active">
          <span>歌曲名称：</span>
          <el-input
            v-model="search.musicname"
            size="mini"
            placeholder="请输入歌曲名称"
            style="width: 150px"
            @focus="inputchange('musicname')"
          />
        </div>
        <div class="sing-singer option-active">
          <span>歌手名称：</span>
          <search-input
            :search="search.singer"
            :list="singerNameList"
            @sentSearch="getSearch"
            :singerContent="singerContent"
            @sentFocus="getFocus"
          ></search-input>
        </div>
        <div class="sing-musictype option-active">
          <span>歌曲类型：</span>
          <el-select
            v-model="search.musictype"
            placeholder="请选择歌曲类型"
            style="width: 150px"
            size="mini"
            @change="Change('type', search.musictype)"
          >
            <el-option
              v-for="(item, index) in musicTypes"
              :label="item.musictypename"
              :value="item.musictypename"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div class="btn option-active">
          <music-add-active style="margin-left:20px" :music-type-list="musicTypes" @addMusic="addMusic"></music-add-active>
          <music-add style="margin-left:20px" :music-type-list="musicTypes" @addMusic="addMusic"></music-add>
          <music-delete style="margin-left:20px" :multiple-selection="multipleSelection"></music-delete>
          <div class="refresh" style="margin-left:20px">
            <el-button type="info" @click="refresh" size="small" icon="el-icon-refresh"></el-button>
          </div>
        </div>
      </div>
    </search-header>
    <el-table
      :data="tableData"
      border
      style="width: 100%;height:auto;"
      stripe
      size="mini"
      :default-sort="{ prop: 'musicid', order: 'ascending' }"
      @selection-change="handleSelectionChange"
    >
      <template slot="empty">
        <p>{{ dataText }}</p>
      </template>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="musicid" label="歌曲编号" width="100" align="center" sortable></el-table-column>
      <el-table-column prop="songName" label="歌曲名称" sortable width="120" align="center"></el-table-column>
      <el-table-column prop="tag" label="歌曲风格" width="150" align="center"></el-table-column>
      <el-table-column prop="lyricist" label="作词人" width="120" align="center"></el-table-column>
      <el-table-column prop="composer" label="作曲人" width="120" align="center"></el-table-column>
      <el-table-column prop="producerNick" label="制作人" width="120" align="center"></el-table-column>
      <el-table-column prop="progressRate" label="歌曲状态" width="150" align="center"></el-table-column>

      <el-table-column prop="lyricurl" label="歌词地址" width="80" align="center"></el-table-column>
      <el-table-column prop="time" label="创建时间" width="150" align="center" sortable></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button @click="checkClick(scope.row)" type="text" size="mini">查看</el-button>
          <el-button type="text" size="mini" @click="updateClick(scope.row)">修改</el-button>
          <el-button type="text" size="mini" @click="deleteClick(scope.row)">删除</el-button>-->
          <div>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link" style="color:#409eff;">
                操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toAudition(scope.row)">选择试听</el-dropdown-item>
                <el-dropdown-item @click.native="toDistribute(scope.row,'producer','200')">分配制作人</el-dropdown-item>
                <el-dropdown-item
                  @click.native="toDistribute(scope.row,'arrangementM','300')"
                >分配编曲组长</el-dropdown-item>
                <el-dropdown-item @click.native="toDistribute(scope.row,'arrangement','351')">分配编曲师</el-dropdown-item>
                <el-dropdown-item @click.native="toDistribute(scope.row,'recorderM','400')">分配录音组长</el-dropdown-item>
                <el-dropdown-item @click.native="toDistribute(scope.row,'recorder','451')">分配录音师</el-dropdown-item>
                <el-dropdown-item @click.native="toDistribute(scope.row,'mixerM','500')">分配混音组长</el-dropdown-item>
                <el-dropdown-item @click.native="toDistribute(scope.row,'mixer','551')">分配混音师</el-dropdown-item>
                <el-dropdown-item @click.native="toUploadArrangemen(scope.row)">上传编曲</el-dropdown-item>
                <el-dropdown-item @click.native="toUploadRecorder(scope.row)">上传录音</el-dropdown-item>
                <el-dropdown-item @click.native="toUploadMix(scope.row)">上传缩混</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row,'arr')">下载编曲</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row,'arrPro')">下载编曲工程文件</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row,'rec')">下载录音</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row,'recPro')">下载录音工程文件</el-dropdown-item> 
                    <el-dropdown-item @click.native="todownLoad(scope.row,'mix')">下载缩混</el-dropdown-item>
                <el-dropdown-item @click.native="todownLoad(scope.row,'mixPro')">下载录缩混程文件</el-dropdown-item>
                <el-dropdown-item @click.native="toReview(scope.row,'arrangement','30')">通过</el-dropdown-item>
                <el-dropdown-item @click.native="toReview(scope.row,'arrangement','20')">驳回</el-dropdown-item>
                <el-dropdown-item @click.native="deleteClick(scope.row)">删除</el-dropdown-item>
                <el-dropdown-item command="b">退出系统</el-dropdown-item>
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
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="getTotal"
        style="textAlign: right"
      ></el-pagination>
    </div>
    <el-dialog
      :footer="false"
      title="试听"
      :visible.sync="dialogVisibleAudition"
      customClass="customWidth-audition"
    >
      <music-audition :userInfo="userInfo" @editInfo="editInfo"></music-audition>
    </el-dialog>
    <el-dialog
      :footer="false"
      title="分配制作人"
      :visible.sync="dialogVisibleDistribute"
      customClass="customWidth-distribute"
    >
      <music-distribute :userInfo="userInfo" @editDistribute="editDistribute"></music-distribute>
    </el-dialog>
    <el-dialog
      :footer="false"
      title="上传编曲"
      :visible.sync="dialogVisibleUpload"
      customClass="customWidth-distribute"
    >
      <music-upload :userInfo="userInfo" @editDistribute="editDistribute"></music-upload>
    </el-dialog>
    <el-dialog
      :footer="false"
      title="上传录音"
      :visible.sync="dialogVisibleUploadRecorder"
      customClass="customWidth-distribute"
    >
      <music-upload-recorder :userInfo="userInfo" @editDistributeRecorder="editDistributeRecorder"></music-upload-recorder>
    </el-dialog>
       <el-dialog
      :footer="false"
      title="上传缩混"
      :visible.sync="dialogVisibleUploadMix"
      customClass="customWidth-distribute"
    >
      <music-upload-mix :userInfo="userInfo" @editDistributeRecorder="editDistributeRecorder"></music-upload-mix>
    </el-dialog>
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
import MusicUploadRecorder from "./musiclistchildrens/MusicUploadRecorder.vue";
import MusicUploadMix from "./musiclistchildrens/MusicUploadMix.vue";

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
    MusicAddActive
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
      getTotal:0,
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
      dialogVisibleUploadMix:false,
      userInfo: {},
      editInfo: {}
    };
  },
  created() {
    //获取音乐类型列表
    // this.musicTypeList();
    // 获取音乐列表
    this.musicList();
    //this.musicList1();
    this.queryInfoStyle();
    //获取歌手列表
    // this.getSingerList();
  },
  methods: {
    /*
        *功能： JS跳转页面，并已POST方式提交数据
        *参数： URL 跳转地址 PARAMTERS 参数
        */
        // function ShowReport_Click() {

        //     var parames = new Array();
        //     parames.push({ name: "name", value: "张三"});
        //     parames.push({ name: "code", value: "123456"});

        //     Post("www.baidu.com", parames);

        //     return false;
        // }

        /*
        *功能： 模拟form表单的提交
        *参数： URL 跳转地址 PARAMTERS 参数
        */
        postExcelFile(params, url) {
      //params是post请求需要的参数，url是请求url地址
      var form = document.createElement("form");
      form.style.display = "none";
      form.action = url;
      form.method = "post";
      document.body.appendChild(form);
    // 动态创建input并给value赋值
      for (var key in params) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key+'';
        input.value = params[key]+'';
        form.appendChild(input);
      }

      form.submit();
      form.remove();
    },

    //下载小样
    todownLoad(val,item){
      console.log(val,item)
  const param=    {
    token:this.token,
    songID:val.id,
    category:item
}
 // this.postExcelFile(param,"http://106.53.61.91:6325/rylBGM/productLine/downloadFile", );
downloadFile(param).then(res=>{
  console.log(res)
  if(res.status==0){
    let tempMd5=res.data
        //     const Base64 = require("js-base64").Base64;
        // const exStr = Base64.encodeURI(type);
        // const fileName = val.cr_songName;
        let openUrl = baseUrl + "/productLine/tempDownLoadFile/"+tempMd5;
        window.open(openUrl, "_blank");
    // tempDownLoadFile(tempMd5)
  }
})


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
    //上传编曲取消

    editDistributeRecorder() {
      this.dialogVisibleUploadRecorder = false;
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
      }else{
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
        this.musicList()
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
    toUploadMix(row){
      this.userInfo={...row}
      this.dialogVisibleUploadMix=true
    },
    //新增成功查询列表
    addMusic() {
      this.musicList();
    },
    editDistribute() {
      this.dialogVisibleDistribute = false;
      this.musicList();
    },
    //分配制作人
    toDistribute(row, type, group) {
      const param = {
        selecttype: type,
        fFuncGroup: group
      };
      this.userInfo = { ...row, ...param };
      this.dialogVisibleDistribute = true;
    },
    //试听
    toAudition(row) {
      console.log("***8");
      this.userInfo = { ...row };
      this.dialogVisibleAudition = true;
    },
    // 操作
    handleCommand() {},
    //删除
    deleteClick(row) {
      console.log(row);
      const param = {
        token: this.token,
        songID: row.id
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
      const param = {
        token: this.token,
        pageSize: 10,
        curPage: this.currentPage-1,
        filter: {
          progressRateReg: [],
          createTimeReg: [],
          songName: "",
          lyricist: "",
          composer: "",
          tag: []
        }
      };
      getProductionSong(param).then(res => {
        console.log(res)
        this.tableData = [];
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
              tempStatus = "编曲已完成且已通过审核";
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
              tempStatus = "录音完成且已通过审核";
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
              tempStatus = "缩混完成且已通过审核";
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
            progressRateActive:items.progressRate,
            mixFile:items.mix.auditionFile
          };
          this.tableData.push(obj);
        });
        console.log(this.tableData)
        this.getTotal=res.data.count
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

    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },



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
    },
    // getTotal() {
    //   if (this.search.musicid) {
    //     return this.tableData.filter(data => {
    //       if (data.musicid == this.search.musicid) {
    //         return data;
    //       }
    //     }).length;
    //   }
    //   if (this.search.musicname) {
    //     return this.tableData.filter(data => {
    //       if (
    //         data.musicname
    //           .toLowerCase()
    //           .includes(this.search.musicname.toLowerCase())
    //       ) {
    //         return data;
    //       }
    //     }).length;
    //   }
    //   if (this.search.singer) {
    //     return this.tableData.filter(data => {
    //       if (
    //         data.singer.singername
    //           .toLowerCase()
    //           .includes(this.search.singer.toLowerCase())
    //       ) {
    //         return data;
    //       }
    //     }).length;
    //   }
    //   if (this.search.musictype) {
    //     return this.tableData.filter(data => {
    //       if (
    //         data.musictype.musictypename
    //           .toLowerCase()
    //           .includes(this.search.musictype.toLowerCase())
    //       ) {
    //         return data;
    //       }
    //     }).length;
    //   }
    //   return this.tableData.length;
    // }
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
  margin-left: 20px;
  margin-top: 5px;
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
</style>
