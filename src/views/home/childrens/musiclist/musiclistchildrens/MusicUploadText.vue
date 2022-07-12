<template>
  <div id="add">
      <el-form :model="music">
        <el-form-item label="歌曲名称1:" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="userInfo.songName" autocomplete="off" placeholder="请输入歌曲名称"></el-input>
        </el-form-item>
    
        <el-form-item label="上传编曲:" prop="file" :label-width="formLabelWidth">
          <el-upload
            action
            multiple
            ref="upload_img"
             accept=""
            :http-request="httpRequest"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">请选择.word歌词上传</span>
          </el-upload>
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer" style="display: flex;justify-content: center;">
        <el-button @click="close()" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm()" size="small" :disabled="saveType">确 定</el-button>
      </div>
  </div>
</template>



<script>
import { uploadFile, aboutMusicTag, commitDemo,commitArrangement,reCommitLyric } from "network/home.js";

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
          fileCodeActive:'',
    projectCode: "",
    daoChangCode: "",
    saveType:false
    };
  },

  created() {
    this.param = new FormData();
  },
  mounted() {
    this.queryInfo();
    console.log(this.userInfo)
  },
   watch: {
    userInfo(val) {
      console.log(val)
      // this.keyArr = [];
      // this.keyArr = val.funcGroup;
      this.$nextTick(() => {
        console.log(val)
        this.saveType=false
        this.queryInfo()
       // console.log(baseUrl)
       
        // this.musicListlyricsFile()
        // this.musicListDemo()
      });
    }
   },
  methods: {
    //选择制作人
    onChange(val){
      console.log(val)
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
    httpRequest(param) {
            console.log(param)

      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("files", fileObj); // 文件对象
      fd.append("token", this.token);
      fd.append("category", "lyric");
               this.fileCodeActive=fileObj
      console.log(this.fileCodeActive)
      // uploadFile(fd).then(res => {
      //   if (res.status == 0) {
      //     this.fileCode = res.data;
      //     this.$message({
      //       type: "success",
      //       message: "上传歌词成功！"
      //     });
      //     //this.submitForm();//提交表单
      //   } else {
      //     this.fileCode = "";
      //     this.$message({
      //       type: "error",
      //       message: `上传歌词失败！错误码：${res.status}--错误原因：${res.des}`
      //     });
      //   }
      // });
    },
    refresh() {
      this.reload();
    },
    confirm() {
       
      this.saveType=true
      const param = {
        token: this.token,
    songID: this.userInfo.id,
    fileCode: this.fileCode,
      };
           let fd = new FormData()
            fd.append("fileCode",  this.fileCodeActive); // 文件对象
      // fd.append("auditionFileCode", this.demoCodeActive);
     fd.append('REQ',JSON.stringify(param) );
      console.log(fd);
         this.saveType = true;  
      console.log(param)
      console.log(param)
      reCommitLyric(fd).then(res => {
        console.log(res);
        if (res.status == 0) {
           this.saveType=true
          this.$message({
            type: "success",
            message: "重新上传歌词成功！"
          });
          this.dialogFormVisible=false
          //this.submitForm();//提交表单
          this.$emit('editDistributeText')
        } else {
          this.lyricsCode = "";

          this.$message({
            type: "error",
            message: `重新上传歌词失败！错误码：${res.status}--错误原因：${res.des}`
          });
           this.saveType=false
        }
      });
    },
    close(){
        this.$emit('editDistributeText')
    }
  }
};
</script>

<style>
.customWidth-addSong {
  width: 500px;
}
</style>
