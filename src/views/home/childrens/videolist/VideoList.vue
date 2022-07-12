<template>
  <div style="display: flex; justify-content: center; width: 100%">
    <div v-if="permission" style="width: 100%">
      <div id="musiclist">
        <search-header>
          <div class="option">
            <div class="sing-id option-active">
              <span>时间查询：</span>
              <el-date-picker
                style="300px"
                v-model="timeValue"
                value-format="timestamp"
                type="daterange"
                range-separator="至"
                @change="timeChange"
                size="mini"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>

            <div class="sing-id option-active">
              <span>歌曲名称：</span>
              <el-input
                v-model="seachName"
                size="mini"
                placeholder="请输入歌曲名称"
                style="width: 150px"
              />
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
            <div class="sing-musictype option-active">
              <span>发布状态：</span>
              <el-select
                size="mini"
                v-model="notDone"
                style="width: 150px"
                placeholder="请选择发布状态查询"
                @change="handleChangeState"
              >
                <el-option label="全部" value="0">全部</el-option>
                <el-option label="未收到合同" value="4">未收到合同</el-option>
                <el-option label="未收到首笔款" value="5"
                  >未收到首笔款</el-option
                >
                <el-option label="未发布" value="6">未发布</el-option>
              </el-select>
            </div>
            <div class="sing-musictype option-active">
              <span>客户：</span>
              <el-select
                v-model="roleValue"
                placeholder="请选择客户"
                style="width: 170px"
                size="mini"
                @change="changeRole"
              >
                <el-option
                  v-for="(item, index) in roleList"
                  :label="item.nick"
                  :value="item.account"
                  :key="index"
                ></el-option>
              </el-select>
            </div>

            <div class="btn option-active">
              <div class="refresh" style="margin-left: 0px">
                <el-button type="primary" @click="toUploadMix()" size="mini"
                  >查询有效歌单</el-button
                >
                <el-button type="danger" @click="toMoveToMixAll()" size="mini"
                  >批量移除锁定至缩混</el-button
                >
              </div>
              <div class="refresh" style="margin-left: 20px">
                <el-button
                  type="primary"
                  size="mini"
                  @click="seachInfo()"
                  icon="el-icon-zoom-in"
                  >查询</el-button
                >
              </div>
              <div class="refresh" style="margin-left: 20px">
                <el-button
                  type=""
                  size="mini"
                  @click="refreshInfo()"
                  icon="el-icon-zoom-in"
                  >重置</el-button
                >
              </div>
            </div>
          </div>
        </search-header>
        <el-table
          :data="tableData"
          border
          style="width: 100%; margin-top: 20px"
          stripe
          size="mini"
          ref="multipleTable"
          :default-sort="{ prop: 'musicid', order: 'ascending' }"
          @selection-change="handleSelectionChange"
        >
          <template slot="empty">
            <p>{{ dataText }}</p>
          </template>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column
            prop="idActive"
            label="歌曲编号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="songName"
            label="歌曲名称"
            width="200"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="tag"
            label="歌曲风格"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="lyricist"
            label="作词人"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="composer"
            label="作曲人"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="client"
            label="买入客户"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="collaborateName"
            label="合作模式"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="copyrightName"
            label="版权模式"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="startLockTime"
            label="确定意向时间"
            width="140"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="contractTime"
            label="签合同时间"
            width="140"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.startLockTime }}</span>
              <el-button
                :disabled="scope.row.progressRate !== 720"
                type="primary"
                size="mini"
                @click="onclick(scope.row, 'contract')"
                >确认收到合同</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="cashDepositTime"
            label="收到首笔款时间"
            width="140"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.cashDepositTime }}</span>
              <el-button
                :disabled="scope.row.progressRate !== 730"
                type="primary"
                size="mini"
                @click="onclick(scope.row, 'payment')"
                >确认首笔付款</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="publishTime"
            label="发布时间"
            width="140"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.publishTime }}</span>
              <el-button
                :disabled="scope.row.progressRate !== 740"
                type="primary"
                size="mini"
                @click="onclick(scope.row, 'publish')"
                >发布</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="finishLockTime"
            label="锁定到期时间"
            width="140"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="account"
            label="发行人员"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <div>
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link" style="color: #409eff">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toAudition(scope.row)"
                      >选择试听</el-dropdown-item
                    >
                    <el-dropdown-item @click.native="toLock(scope.row)"
                      >延期锁定</el-dropdown-item
                    >
                    <el-dropdown-item
                      type="text"
                      size="mini"
                      @click.native="removeLockSong(scope.row)"
                      >解除锁定</el-dropdown-item
                    >

                    <el-dropdown-item
                      @click.native="toDistribute(scope.row, 'producer', '200')"
                      >查看试听情况</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="toUploadArrangemen(scope.row)"
                      >更新信息</el-dropdown-item
                    >
                    <el-dropdown-item @click.native="toMoveToMix(scope.row)"
                      >移除锁定至缩混</el-dropdown-item
                    >
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
            style="textalign: right"
          ></el-pagination>
        </div>
        <el-dialog
          :close-on-click-modal="false"
          :footer="false"
          title="试听"
          :visible.sync="dialogVisibleAudition"
          customClass="customWidth-audition"
        >
          <music-audition
            :userInfo="userInfo"
            @editInfo="editInfo"
          ></music-audition>
        </el-dialog>
        <el-dialog
          :close-on-click-modal="false"
          :footer="false"
          title="查看试听记录"
          :visible.sync="dialogVisibleDistribute"
          customClass="customWidth-distribute"
        >
          <music-distribute
            :userInfo="userInfo"
            @editDistributeSt="editDistributeSt"
          ></music-distribute>
        </el-dialog>
        <el-dialog
          :close-on-click-modal="false"
          :footer="false"
          title="更新信息"
          :visible.sync="dialogVisibleUpload"
          customClass="customWidth-distribute"
        >
          <music-upload
            :userInfo="userInfo"
            @editUpdateInfo="editUpdateInfo"
          ></music-upload>
        </el-dialog>
        <el-dialog
          :close-on-click-modal="false"
          :footer="false"
          title="上传录音"
          :visible.sync="dialogVisibleUploadRecorder"
          customClass="customWidth-distribute"
        >
          <music-upload-recorder
            :userInfo="userInfo"
            @editDistributeRecorder="editDistributeRecorder"
          ></music-upload-recorder>
        </el-dialog>
        <el-dialog
          :close-on-click-modal="false"
          :footer="false"
          :modal="false"
          title="查看有效歌单"
          :visible.sync="dialogVisibleUploadMix"
          customClass="customWidth-distribute-list"
          style="z-index: 2000"
        >
          <music-upload-mix
            :userInfo="userInfo"
            @editDistributeRecorderList="editDistributeRecorderList"
          ></music-upload-mix>
        </el-dialog>
        <el-dialog
          :close-on-click-modal="false"
          :footer="true"
          title="延迟锁定"
          :visible.sync="lockType"
          customClass="customWidth-distribute"
        >
          <div>
            <el-form class="userfrom">
              <el-form-item
                label="歌曲名"
                prop="userName"
                :label-width="formLabelWidth"
              >
                <el-input
                  :disabled="true"
                  v-model="songName"
                  ref="ipt"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="延迟天数"
                prop="userName"
                :label-width="formLabelWidth"
              >
                <el-input v-model="extendDays" ref="ipt"></el-input>
              </el-form-item>
              <el-form-item style="display: flex; justify-content: end">
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button type="primary" @click="onBack">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
      </div>
    </div>
    <div v-if="!permission">
      <img
        class="permission-img"
        src="@/assets/permission.webp"
        width="900"
        height="420"
      />
      <div class="permission-text">
        对不起，您暂无权限访问该页面，请联系管理员授权！
      </div>
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
  doWork,
  extendLock,
  removeLockSong,
} from "network/home.js";

import SearchHeader from "components/common/header/SearchHeader.vue";
import SearchInput from "components/common/searchinput/SearchInput.vue";

import MusicAudition from "./videochildrens/MusicAudition.vue";
import MusicDistribute from "./videochildrens/MusicDistribute.vue";
import MusicUpload from "./videochildrens/MusicUpload.vue";
import MusicUploadRecorder from "./videochildrens/MusicUploadRecorder.vue";
import MusicUploadMix from "./videochildrens/MusicUploadMix.vue";

import fmtDate from "common/js/Date.js";
import {
  getProductionSong,
  aboutMusicTag,
  openFile,
  openFileActive,
  checkWork,
  getPublishSongSell,
  userListActive,
  moveToMix,
} from "network/home.js";

export default {
  name: "MusicList",
  inject: ["reload"],
  components: {
    SearchHeader,
    SearchInput,
    MusicAudition,
    MusicDistribute,
    MusicUpload,
    MusicUploadRecorder,
    MusicUploadMix,
    extendLock,
  },

  data() {
    return {
      formLabelWidth: "100px",
      //音乐列表
      musicInfo: {
        musicName: null,
        musciType: null,
        musicPicture: null,
        musicHot: null,
        musicWordAdress: null,
        musicUrl: null,
        musicSonger: null,
      },
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
      lockType: false,
      songIDs: [],
      extendDays: 3,
      songName: "",
      getTotal: 0,
      seachName: "",
      seachLyricist: "",
      seachComposer: "",
      timeValue: "",
      startTime: 0,
      endTime: 0,
      tagValue: "",
      publishstate: "",
      roleValue: "",
      progressRateReg: [720, 1000],
      permission: true,
      notDone: "0",
      roleList: [
        {
          value: 300,
          label: "编曲组长",
        },
        {
          value: 351,
          label: "编曲师",
        },
        {
          value: 400,
          label: "录音组长",
        },
        {
          value: 451,
          label: "录音师",
        },
        {
          value: 500,
          label: "混音组长",
        },
        {
          value: 551,
          label: "混音师",
        },
      ],
    };
  },
  created() {
    this.funcGroupArr = JSON.parse(
      localStorage.getItem("userInfo")
    ).account.funcGroup;
    console.log(this.funcGroupArr);

    if (
      this.funcGroupArr.includes(100) ||
      this.funcGroupArr.includes(600) ||
      this.funcGroupArr.includes(651)
    ) {
      this.permission = true;
    } else {
      this.permission = false;
    }
    //获取音乐类型列表
    // this.musicTypeList();
    // 获取音乐列表
    this.musicList();
    //this.musicList1();
    this.queryInfoStyle();
    this.findClientInfo();
    //获取歌手列表
    // this.getSingerList();
  },
  methods: {
    //批量勾选
    handleSelectionChange(val) {
      console.log(val);
      this.plIds = [];
      this.idsObj = [];
      if (val.length > 0) {
        val.forEach((item) => {
          this.plIds.push(item.id);
          this.idsObj.push(item);
        });
      }
      console.log(this.plIds);
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 批量移除锁定至缩混
    toMoveToMixAll(val) {
      console.log(val);
      console.log(this.multipleSelection);
      if (this.multipleSelection.length < 1) {
        this.$message({
          type: "error",
          message: "请至少选择一首歌曲进行操作！",
        });
        return false;
      }
      const tempArr = [];
      this.multipleSelection.forEach((item) => {
        tempArr.push(item["id"]);
      });

      const param = {
        token: this.token,
        songID: tempArr,
      };
      moveToMix(param).then((res) => {
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "移除锁定至缩混成功!",
          });
        } else {
          this.$message({
            type: "error",
            message: `移除锁定失败！错误码：${res.status}--错误原因：${res.des}`,
          });
        }
        this.lockType = false;
        this.musicList();
      });
    },

    // 移除锁定至缩混
    toMoveToMix(val) {
      console.log(val);
      const param = {
        token: this.token,
        songID: [val.id],
      };
      moveToMix(param).then((res) => {
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "移除锁定至缩混成功!",
          });
        } else {
          this.$message({
            type: "error",
            message: `移除锁定失败！错误码：${res.status}--错误原因：${res.des}`,
          });
        }
        this.lockType = false;
        this.musicList();
      });
    },
    // 查询客户账户列表
    findClientInfo() {
      const param = {
        token: this.token,
        pageSize: 100,
        curPage: this.currentPage - 1,
        fFuncGroup: 1000,
      };
      //向后端发送请求并接受数据库中的用户列表
      userListActive(param).then((res) => {
        console.log(res);
        this.roleList = [];
        if (res.status == 0) {
          this.roleList = res.data.item;
        }
        console.log(this.roleList);
      });
    },
    // 选择歌曲类型
    changeMusic(val) {
      console.log(val);
      this.tagValue = val;
    },
    // 按照客户查询
    changeRole(val) {
      this.roleValue = val;
      console.log(this.roleValue);
    },

    handleChangeState(val) {
      console.log(val);
      // this.publishstate = val;
      this.notDone = val;
      // switch(val){
      //   case '0':
      //   this.notDone=0
      //   break;
      //       case '4':
      //   this.notDone=4
      //   break;
      //       case '5':
      //   this.notDone=5
      //   break;
      //       case '6':
      //   this.notDone=6
      //   break;

      // }
      this.currentPage = 1;
      this.musicList();
    },
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
      this.notDone = "0";
      this.roleValue = "";

      this.seachName = "";
      (this.seachLyricist = ""), (this.seachComposer = "");
      this.musicList();
    },
    //取消更新信息
    editUpdateInfo() {
      this.dialogVisibleUpload = false;
      this.musicList();
    },
    //延迟锁定
    toLock(val) {
      console.log(val);
      this.lockType = true;
      this.songName = val.songName;
      this.songIDs = val.id;
    },
    //确定锁定
    onSubmit() {
      const param = {
        token: this.token,

        songIDs: [this.songIDs],
        extendDays: parseInt(this.extendDays),
      };
      extendLock(param).then((res) => {
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "延期锁定成功!",
          });
        } else {
          this.$message({
            type: "error",
            message: `上传成品失败！错误码：${res.status}--错误原因：${res.des}`,
          });
        }
        this.lockType = false;
        this.musicList();
      });
    },
    //接触锁定
    onBack() {
      this.lockType = false;
    },
    removeLockSong(row) {
      const param = {
        token: this.token,

        songIDs: [row.id],
      };
      this.$confirm("是否解除锁定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeLockSong(param).then((res) => {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "解除锁定成功!",
              });
              this.findUserInfo();
              this.musicList();
            } else {
              this.$message({
                type: "error",
                message: "解除锁定失败!",
              });
            }
          });
        })
        .catch(() => {});
    },

    //删除歌曲
    deleteClick(row) {
      const param = {
        token: this.token,
        songID: row.id,
      };
      this.$confirm("完成信息核对, 确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteSong(param).then((res) => {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.findUserInfo();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
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
    //取消试听记录查看
    editDistributeSt() {
      this.dialogVisibleDistribute = false;
    },
    editDistributeRecorderList() {
      this.dialogVisibleUploadMix = false;
      this.musicList();
    },
    //发布操作
    onclick(item, val) {
      console.log(item);
      console.log(val);
      const param = {
        token: this.token,
        songID: item.id,
        step: val,
      };
      doWork(param).then((res) => {
        console.log(res);

        if (res.status == 0) {
          switch (val) {
            case "contract":
              this.$message({
                type: "success",
                message: "确认收到合同成功！",
              });
              break;
            case "payment":
              this.$message({
                type: "success",
                message: "确认收到首笔款成功！",
              });
              break;
            case "publish":
              this.$message({
                type: "success",
                message: "发布成功！",
              });
              break;
          }

          this.musicList();
        } else {
          switch (val) {
            case "contract":
              this.$message({
                type: "error",
                message: "确认收到合同失败！",
              });
              break;
            case "payment":
              this.$message({
                type: "error",
                message: "确认收到首笔款失败！",
              });
              break;
            case "publish":
              this.$message({
                type: "error",
                message: "发布失败！",
              });
              break;
          }
          this.musicList();
        }
      });
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
        remark: "暂无备注",
      };
      checkWork(param).then((res) => {
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "操作成功！",
          });
          //this.submitForm();//提交表单
        } else {
          this.$message({
            type: "error",
            message: "操作失败！",
          });
        }
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
      // this.userInfo = { ...row };
      this.dialogVisibleUploadMix = true;
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
        fFuncGroup: group,
      };
      this.userInfo = { ...row, ...param };
      this.dialogVisibleDistribute = true;
    },
    //查看试听情况
    toDistribute(row) {
      this.userInfo = { ...row };
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
        songID: row.id,
      };
      // console.log(row);
      this.$confirm("完成信息核对, 确认提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteSong(param).then((res) => {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.musicList();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
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
        action: "get",
      };
      aboutMusicTag(param).then((res) => {
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
          mid: row.musicid,
        },
      });
    },

    updateClick(row) {
      this.$router.push({
        path: "/musicupdate",
        query: {
          mid: row.musicid,
        },
      });
    },

    //获得音乐类型列表
    musicTypeList() {
      musicTypeList().then((res) => {
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
          progressRateReg: this.progressRateReg,
          publishTime: createTimeReg,
          songName: this.seachName,
          publisher: this.roleValue,
          tag: tagValue,
          lyricist: this.seachLyricist,
          composer: this.seachComposer,
          notDone: parseInt(this.notDone),
        },
      };
      getPublishSongSell(param).then((res) => {
        console.log(res);
        this.tableData = [];
        if (res.data.item.length > 0) {
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
              songName: items.submitter.songName,
              composer: items.submitter.composer,
              lyricist: items.submitter.lyricist,
              tag: items.submitter.tagName.join(","),
              id: items.id,
              idActive: items.no,
              demoFile: items.mix.auditionFile,
              lyricsFile: items.submitter.lyricsFile,
              producerNick: items.producerNick,
              copyrightName: items.publish.copyrightName,
              collaborateName: items.publish.collaborateName,
              startLockTime: this.dateFmt(items.publish.startLockTime),
              contractTime: this.dateFmt(items.publish.contractTime),
              cashDepositTime: this.dateFmt(items.publish.cashDepositTime),
              publishTime: this.dateFmt(items.publish.publishTime),
              finishLockTime: this.dateFmt(items.publish.finishLockTime),
              account: items.publish.account,
              progressRate: items.progressRate,
              publisher: items.publish.publisher,
              tagActive: items.submitter.tag,
              collaborate: items.publish.collaborate,
              copyright: items.publish.copyright,
              lyricsCode: items.submitter.lyricsFile,
              demoCode: items.mix.auditionFile,
              account: items.publish.account,
              client: items.publish.publisherNick,
            };
            this.tableData.push(obj);
          });
          this.getTotal = res.data.count;
        } else {
          this.tableData = [];
          this.getTotal = res.data.count;
        }
      });
    },
    //获取歌手列表
    getSingerList() {
      singerList().then((res) => {
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

    //点击之后的当前页数
    handleCurrentChange(val) {
      // 当前页数
      this.currentPage = val;
      this.musicList();
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
    },
  },
  computed: {
    getTableData() {
      if (this.search.musicid) {
        return this.tableData
          .filter((data) => {
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
          .filter((data) => {
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
          .filter((data) => {
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
          .filter((data) => {
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
  },
};
</script>

<style >
.el-dialog__body {
  padding-top: 10px;
}
.el-table--mini .el-table__cell {
  padding: 4px 0 !important;
}
.customWidth-audition {
  width: 500px;
}
.customWidth-distribute {
  width: 500px;
}
.customWidth-distribute-list {
  width: 900px;
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
.el-range-editor.el-input__inner {
  width: 300px !important;
}
</style>
