<template>
  <div id="add">
    <el-form :model="music">
      <div style="font-size:16px;margin-bottom:10px">歌曲基本信息</div>
      <div style="    border: 1px solid #409EFF;
    border-radius: 5px;
    padding-top: 10px;
    padding-right: 20px;">
      <el-form-item label="歌曲名称:" :label-width="formLabelWidth">
        <el-input
          :disabled="true"
          v-model="userInfo.songName"
          autocomplete="off"
          placeholder="请输入歌曲名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="作曲者:" :label-width="formLabelWidth">
        <el-input
          v-model="userInfo.composer"
          autocomplete="off"
          placeholder="请输入歌作曲者"
        ></el-input>
      </el-form-item>
      <el-form-item label="作词者:" :label-width="formLabelWidth">
        <el-input
          v-model="userInfo.lyricist"
          autocomplete="off"
          placeholder="请输入作词者"
        ></el-input>
      </el-form-item>
      <el-form-item label="歌曲风格:" :label-width="formLabelWidth">
        <el-select style="width:100%;" multiple v-model="userInfo.tagActive" placeholder="请选择歌曲风格">
          <el-option
            v-for="(item, index) in musicTypeList"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传歌词:" prop="file" :label-width="formLabelWidth">
        <el-upload
          action
          multiple
          ref="upload_img"
          accept=".jpg, .jpeg, .png"
          :http-request="httpRequest"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <span slot="tip" class="el-upload__tip">请选择.word格式的歌词文件上传</span>
        </el-upload>
      </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth" style="display: flex;
    justify-content: end;">
      <el-button type="primary" size="small" @click="confirm()">确 定</el-button>
      </el-form-item>
      </div>
            <div style="font-size:16px;margin:10px 0px;">歌曲发布信息</div>

       <div style="    border: 1px solid #409EFF;
    border-radius: 5px;
    padding-top: 10px;
    padding-right: 20px;">
      <el-form-item label="合作伙伴:" :label-width="formLabelWidth">
        <el-select
          style="width:100%;"
          @change="onChange"
          v-model="userInfo.publisher"
          placeholder="请选择合作伙伴"
        >
          <el-option
            v-for="(item, index) in publisherList"
            :key="index"
            :label="item.nick"
            :value="item.account"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版权方式:" :label-width="formLabelWidth">
        <el-select
          style="width:100%;"
          @change="onChangeMode"
          v-model="userInfo.collaborate"
          placeholder="请选择歌曲风格"
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
          v-model="userInfo.copyright"
          placeholder="请选择歌曲风格"
        >
          <el-option
            v-for="(item, index) in CooperativeList"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
  <el-form-item label="" :label-width="formLabelWidth" style="display: flex;
    justify-content: end;">
      <el-button type="primary" size="small" @click="confirmActive()">确 定</el-button>
      </el-form-item>
      
       </div>
    
    </el-form>

  </div>
</template>



<script>
import {
  uploadFile,
  aboutMusicTag,
  commitDemo,
  commitArrangement,
  userListActive,
  aboutCopyrightMode,
  aboutCooperative,
  updateSongInfo,
  updateDemo,
  updatePublish,
  updatePublishData

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
      publisherList: [],
      musicTypeList: [],
      copyrightModeList: [],
      CooperativeList: [],
      publisher: "",
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
      formLabelWidth: "120px",
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
      daoChangCode: ""
    };
  },

  created() {
    this.param = new FormData();
  },
  mounted() {
    this.queryInfo();
    this.findUserInfo();
    this.querystyleList();
    this.findCopyrightModeList();
    this.findcooperativeList();

    console.log(this.userInfo);
  },
  watch: {
    userInfo(val) {
      console.log(val);
      // this.keyArr = [];
      // this.keyArr = val.funcGroup;
      this.$nextTick(() => {
        this.queryInfo();

        this.findUserInfo();
        this.querystyleList();
        this.findCopyrightModeList();
        this.findcooperativeList();

        // console.log(baseUrl)

        // this.musicListlyricsFile()
        // this.musicListDemo()
      });
    }
  },
  methods: {
    onChangeMode(val) {
      this.collaborateMode = val;
    },
    onChangeRightMode(val) {
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
    //查询合作模式
    querystyleList() {
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
    //查找用户列表
    findUserInfo() {
      const param = {
        token: this.token,
        pageSize: 10,
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

    // param是自带参数。 this.$refs.upload.submit() 会自动调用 httpRequest方法.在里面取得file
   
    // param是自带参数。 this.$refs.upload.submit() 会自动调用 httpRequest方法.在里面取得file
    httpRequest(param) {
      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("files", fileObj); // 文件对象
      fd.append("token", this.token);
      fd.append("category", "lyric");

      // let url = process.env.CMS1_BASE_API + 'cdnDel/uploadExcel'
      // let config = {
      //   headers: {
      //    'Content-Type': 'multipart/form-data'
      //   }
      // }
      uploadFile(fd).then(res => {
        if (res.status == 0) {
          this.lyricsCode = res.data;
          this.$message({
            type: "success",
            message: "上传歌词成功！"
          });
          //this.submitForm();//提交表单
        } else {
          this.lyricsCode = "";

          this.$message({
            type: "error",
            message: "上传歌词失败！"
          });
        }
      });
    },
  

    refresh() {
      this.reload();
    },

    confirm() {
      let templyricsCode=''
      if(this.lyricsCode==''){
        templyricsCode=this.userInfo.lyricsCode
      }else{
        templyricsCode=this.lyricsCode
      }
     const param= {
    //     token: this.token,
    // songID:this.userInfo.id,
    // updateFiled: {
    //     songName:this.userInfo.songName,
    //     lyricist: this.userInfo.lyricist,
    //     lyricsCode:templyricsCode ,
    //     composer:this.userInfo.composer,
    //     tag: this.userInfo.tagActive,
    //     publisher: this.userInfo.publisher,
    //     collaborateMode: this.userInfo.collaborate,
    //     copyright: this.userInfo.copyright
    // }

        token: this.token,
    id: this.userInfo.id,
    demo: {
        lyricist:  this.userInfo.lyricist,
        composer: this.userInfo.composer,
        lyricsCode:templyricsCode ,
        demoCode: this.userInfo.demoCode,
        tag: this.userInfo.tagActive
    }
}
  
      console.log(param);
      updateDemo(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.lyricsCode = res.data;
          this.$message({
            type: "success",
            message: "更新歌曲基本信息成功！"
          });
          //this.submitForm();//提交表单
        } else {

          this.$message({
            type: "error",
            message: "更新歌曲基本信息失败！"
          });
        }
      });
    },
    confirmActive(){

     const param= {
    //     token: this.token,
    // songID:this.userInfo.id,
    // updateFiled: {
    //     songName:this.userInfo.songName,
    //     lyricist: this.userInfo.lyricist,
    //     lyricsCode:templyricsCode ,
    //     composer:this.userInfo.composer,
    //     tag: this.userInfo.tagActive,
    //     publisher: this.userInfo.publisher,
    //     collaborateMode: this.userInfo.collaborate,
    //     copyright: this.userInfo.copyright
    // }

      token: this.token,
    
    songIDs:this.userInfo.id,
    updateItem:{
        sellAccount:this.userInfo.account,
        publisher:this.userInfo.publisher,
        collaborateMode:this.userInfo.collaborate,
        copyrightMode:this.userInfo.copyright,
        // "lockTime":0,
        // "contractTime":0,
        // "cashDepositTime":0,
        // "publishTime":0
    }
}
  
      console.log(param);
      updatePublishData(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.lyricsCode = res.data;
          this.$message({
            type: "success",
            message: "更新歌曲发布信息成功！"
          });
          //this.submitForm();//提交表单
        } else {

          this.$message({
            type: "error",
            message: "更新歌曲发布信息失败！"
          });
        }
      });

    },
    //取消更新
    closeModal(){
                this.$emit("editUpdateInfo");

    }
  }
};
</script>

<style scoped>

.customWidth-addSong {
  width: 500px;
}
</style>
