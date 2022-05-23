<template>
   <el-dialog
          :close-on-click-modal="false"
          :footer="false"
           :before-close="handleDialogClose" 
          title="锁定歌曲"
          :visible="true"
          customClass="customWidth-distribute"
        >
  <div id="add">
    <el-form :model="music">
      <el-form-item label="歌曲名称:" :label-width="formLabelWidth">
        <el-input
          :disabled="true"
          v-model="userInfo.songName"
          autocomplete="off"
          placeholder="请输入歌曲名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="版权方式:" :label-width="formLabelWidth">
        <el-select
          style="width:100%;"
          @change="onChangeMode"
          v-model="collaborateMode"
          placeholder="请选择版权方式"
        >
          <el-option
            v-for="(item, index) in copyrightModeList"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作方式:" :label-width="formLabelWidth">
        <el-select
          style="width:100%;"
          @change="onChangeRightMode"
          v-model="copyrightMode"
          placeholder="请选择合作方式"
        >
          <el-option
            v-for="(item, index) in CooperativeList"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作伙伴:" :label-width="formLabelWidth">
        <el-select style="width:100%;" @change="onChange" v-model="publisher" placeholder="请选择歌曲风格">
          <el-option
            v-for="(item, index) in publisherList"
            :key="index"
            :label="item.nick"
            :value="item.account"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="display: flex;justify-content: center;">
      <el-button @click="closeMoadl()" size="small">取 消</el-button>
      <el-button type="primary" @click="confirm()" size="small">确 定</el-button>
    </div>
  </div>
   </el-dialog>
</template>



<script>
import {
  uploadFile,
  aboutMusicTag,
  commitDemo,
  commitArrangement,
  userListActive,
  makeAuditionList,
  aboutCooperative,
  aboutCopyrightMode,
  putLockIngList
} from "network/home.js";

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
      listName: "",
      validTime: 15,
      lockTime: 7,
      publisher: "",
      publisherList: [],
      collaborateMode: "",
      copyrightMode: "",
      CooperativeList: [],
      copyrightModeList: [],
      // "songID":["61baa9143790470b7935b544"]

      music: {
        fileList: [],
        musicName: "",
        musicType: [],
        musicPicture: "",
        musicHot: "",
        musicSinger: "",
        musicAdress: "",
        musicLric: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "150px",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      fileList: [],
      param: {},
      musicTypeList: [],
      lyricsCode: "",
      demoCode: "",
      fileCode: "",
      projectCode: "",
      daoChangCode: "",
      msg: "111"
    };
  },

  created() {
    this.param = new FormData();
  },
  mounted() {
    this.queryInfo();
    this.findUserInfo();
    this.findcooperativeList();
    this.findCopyrightModeList();

    console.log(this.userInfo);
  },
  watch: {
    userInfo(val) {
      console.log(val);
      // this.keyArr = [];
      // this.keyArr = val.funcGroup;
      this.$nextTick(() => {
        this.findUserInfo();
        this.findcooperativeList();
        this.findCopyrightModeList();
        // console.log(baseUrl)

        // this.musicListlyricsFile()
        // this.musicListDemo()
      });
    }
  },
  methods: {
    onChange(val) {
      console.log(val);
      this.publisher = val;
    },
    onChangeMode(val) {
       
      console.log(this.copyrightModeList)
      this.collaborateMode = val;
    },
    onChangeRightMode(val) {
       
      console.log(this.CooperativeList)
      this.copyrightMode = val;
    },
    findCopyrightModeList() {
      const param = {
        token: this.token,
        action: "get"
        //  updateItem:this.editInfo.value,
        // updateValue:this.inputActive
      };
      // this.loading = true;
      //向后端发送请求并接受数据库中的用户列表
      aboutCopyrightMode(param).then(res => {
         ;
        console.log(res);
        if (res.status == 0) {
          this.loading = false;
          this.copyrightModeList = res.data;
          //this.getTotal = res.data.count;
        } else {
          this.copyrightModeList = [];
          //this.getTotal = 0;
        }
        console.log(this.copyrightModeList);
      });
    },

    findcooperativeList() {
      const param = {
        token: this.token,
        action: "get"
        //  updateItem:this.editInfo.value,
        // updateValue:this.inputActive
      };
      // this.loading = true;
      //向后端发送请求并接受数据库中的用户列表
      aboutCooperative(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.loading = false;
          this.CooperativeList = res.data;
          //this.getTotal = res.data.count;
        } else {
          this.CooperativeList = [];
          //this.getTotal = 0;
        }
        console.log(this.CooperativeList);
      });
    },
    //查找用户列表
    findUserInfo() {
      const param = {
        token: this.token,
        pageSize: 100,
        curPage: 0,
        fFuncGroup: 1000
      };
      this.loading = true;
      //向后端发送请求并接受数据库中的用户列表
      userListActive(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.loading = false;
          this.publisherList = res.data.item;
          //this.getTotal = res.data.count;
        } else {
          this.publisherList = [];
          //this.getTotal = 0;
        }
        console.log(this.publisherList);
      });
    },
    //选择制作人
    onChange(val) {
      console.log(val);
    },
    //查询合作模式
    queryInfo() {
      const param = {
        token: this.token,
        action: "get"
      };
      aboutMusicTag(param).then(res => {
        if (res.status == 0) {
          this.musicTypeList = res.data;
          this.tableData = [];
          this.tableData = res.data;
        } else {
          this.musicTypeList = [];
          this.tableData = [];
        }
      });
    },

    refresh() {
      this.reload();
    },

    confirm() {
      const param = {
        token: this.token,
        songIDs: [this.userInfo.id],
        collaborateMode:this.copyrightMode,
        copyrightMode: this.collaborateMode,
        godAccount: this.publisher
      };

      putLockIngList(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "锁定成功！"
          });
          // this.dialogFormVisible=false
          //this.submitForm();//提交表单
  this.$emit('editLock')
          } else {
          this.lyricsCode = "";

          this.$message({
            type: "error",
                                    message: `锁定失败！错误码：${res.status}--错误原因：${res.des}`

          });
        }
      });
    },
    //取消锁定
    closeMoadl() {

      this.$emit('editLock')
    },
    handleDialogClose(){
 this.$emit('editLock')
    }
  }
};
</script>

<style>
.customWidth-addSong {
  width: 500px;
}
</style>
