<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :footer="false"
      :title="userInfo.process.processType"
      :visible="true"
      :before-close="handleDialogClose"
      customClass="customWidth-distribute"
    >
      <div id="music-check">
        <div style="display: flex;justify-content: center;flex-direction: column;">
          <el-select
            style="width:100%;"
            @change="onChange"
            v-model="distributeType"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in distributeTypeList"
              :key="index"
              :label="item.nick"
              :value="item.account"
            ></el-option>
          </el-select>
        </div>
        <div
          slot="footer"
          class="dialog-footer"
          style="margin-top: 20px;display: flex;justify-content: center;"
        >
          <el-button @click="back()" size="small">取 消</el-button>
          <el-button type="primary" @click="confirm()" size="small" :disabled="saveType">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findMusicById,
  userList,
  userListActive,
  assignWork
} from "network/home.js";
import fmtDate from "common/js/Date.js";
export default {
  name: "MusicCheck",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      size: "",
      mid: this.$route.query.mid,
      music: {},
      singer: {},
      musicType: {},
      musicPictureUrl: "",
      musicUrl: "",
      distributeType: "",
      distributeTypeList: [],
      currentPage: 1,
      //1页10个数据
      pagesize: 10,
      dataText: "",
      multipleSelection: [],
      token: JSON.parse(localStorage.getItem("userInfo")).token,
      saveType:false,

      songText: "sdsads",
      auditionCodeUrl:
        "http://47.114.141.171:8990/song/44CK5Lq66Ze05LiA5Y-256eL44CLYnBt77yaNjUg5aWz6ZmNQS5tcDM",
      token: JSON.parse(localStorage.getItem("userInfo")).token
    };
  },
  mounted() {
    this.findUserInfo();
    console.log(this.userInfo);
  },
  watch: {
    userInfo(val) {
      console.log(val);
      this.$nextTick(() => {
        this.findUserInfo();
      });
    }
  },

  methods: {
    //选择制作人
    onChange(val) {
      console.log(val);
    },
    back() {
      this.$emit("editProcess");
    },
    handleDialogClose() {
      this.$emit("editProcess");
    },
    //确定
    confirm() {
      console.log(this.userInfo);
      console.log(JSON.parse(JSON.stringify(this.userInfo.process.plIds)));
      const param = {
        token: this.token,
        songID: JSON.parse(JSON.stringify(this.userInfo.process.plIds)),
        work: this.userInfo.selecttype,
        to: this.distributeType
      };
      if(this.distributeType==''){
            this.$message({
            type: "error",
            message: "请选择要分配的人员！"
          });
          return false
      }
      this.saveType=true
      assignWork(param).then(res => {
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "分配成功！"
          });
          this.$emit("editProcess");
          //this.submitForm();//提交表单
        } else {
                this.saveType=false

          this.demoCode = "";
          this.$message({
            type: "error",
            message: `分配失败！请查看歌曲状态!错误码：${res.status}--错误原因：${res.des}`
          });
        }
        //  if(res.code===0){
        //    this.submitForm();//提交表单
        //  }
      });
    },
    //查找用户列表
    findUserInfo() {
      const param = {
        token: this.token,
        pageSize: 100,
        curPage: this.currentPage - 1,
        fFuncGroup: parseInt(this.userInfo.fFuncGroup)
      };
      this.loading = true;
      //向后端发送请求并接受数据库中的用户列表
      userListActive(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.loading = false;
          this.distributeTypeList = res.data.item;
          //this.getTotal = res.data.count;
        } else {
          this.distributeTypeList = [];
          //this.getTotal = 0;
        }
        console.log(this.distributeTypeList);
      });
    },

    findMusicById(mid) {
      findMusicById(mid).then(res => {
        // console.log(res);
        res.musicphotourl =
          "http://localhost:8090/musicstatic/" + res.musicphotourl;
        this.music = res;
        this.singer = res.singer;
        this.musicType = res.musictype;
      });
    }
  },
  filters: {
    dateFmt(date) {
      let d = new Date(date);
      return fmtDate(d, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
