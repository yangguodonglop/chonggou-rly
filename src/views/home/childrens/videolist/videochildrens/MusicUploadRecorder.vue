<template>
  <div id="add">
      <el-form :model="music">
        <el-form-item label="歌曲名称:" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="userInfo.songName" autocomplete="off" placeholder="请输入歌曲名称"></el-input>
        </el-form-item>
    
        <el-form-item label="上传录音:" prop="file" :label-width="formLabelWidth">
          <el-upload
            action
            multiple
            ref="upload_img1"
             accept=""
            :http-request="httpRequest"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">请选择录音文件上传</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传工程文件:" prop="file" :label-width="formLabelWidth">
          <el-upload
            action
            multiple
            ref="upload_img2"
             accept=""
            :http-request="httpRequestPro"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">请选择工程文件文件上传</span>
          </el-upload>
        </el-form-item>
         <!-- <el-form-item label="上传导唱文件:" prop="file" :label-width="formLabelWidth">
          <el-upload
            action
            multiple
            ref="upload_img"
             accept=""
            :http-request="httpRequestDchang"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">请选择.歌词文件上传</span>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer" style="display: flex;justify-content: center;">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="confirm()" size="small">确 定</el-button>
      </div>
  </div>
</template>

<script>
import { uploadFile, aboutMusicTag, commitDemo,commitArrangement,commitRecord } from "network/home.js";

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
    projectCode: "",
    daoChangCode: ""
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
        this.findUserInfo()
          this.saveType=false,
        console.log(this.fileList)
        this.$refs.upload_img1.clearFiles()
        this.$refs.upload_img2.clearFiles()
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
      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("files", fileObj); // 文件对象
      fd.append("token", this.token);
      fd.append("category", "rec");

      // let url = process.env.CMS1_BASE_API + 'cdnDel/uploadExcel'
      // let config = {
      //   headers: {
      //    'Content-Type': 'multipart/form-data'
      //   }
      // }
      uploadFile(fd).then(res => {
        if (res.status == 0) {
          this.fileCode = res.data;
          this.$message({
            type: "success",
            message: "上传录音成功！"
          });
          //this.submitForm();//提交表单
        } else {
          this.fileCode = "";
          this.$message({
            type: "error",
                                                            message: `上传录音失败！错误码：${res.status}--错误原因：${res.des}`

          });
        }
        //  if(res.code===0){
        //    this.submitForm();//提交表单
        //  }
      });
    },
    // param是自带参数。 this.$refs.upload.submit() 会自动调用 httpRequest方法.在里面取得file
    httpRequestPro(param) {
      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("files", fileObj); // 文件对象
      fd.append("token", this.token);
      fd.append("category", "recPro");

      // let url = process.env.CMS1_BASE_API + 'cdnDel/uploadExcel'
      // let config = {
      //   headers: {
      //    'Content-Type': 'multipart/form-data'
      //   }
      // }
      uploadFile(fd).then(res => {
        if (res.status == 0) {
          this.projectCode = res.data;
          this.$message({
            type: "success",
            message: "上传录音工程文件成功！"
          });
          //this.submitForm();//提交表单
        } else {
          this.projectCode = "";

          this.$message({
            type: "error",
                                                message: `上传录音工程文件失败！错误码：${res.status}--错误原因：${res.des}`

          });
        }
      });
    },
      httpRequestDchang(param) {
      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("files", fileObj); // 文件对象
      fd.append("token", this.token);
      fd.append("category", "rec");

      // let url = process.env.CMS1_BASE_API + 'cdnDel/uploadExcel'
      // let config = {
      //   headers: {
      //    'Content-Type': 'multipart/form-data'
      //   }
      // }
      uploadFile(fd).then(res => {
        if (res.status == 0) {
          this.daoChangCode = res.data;
          this.$message({
            type: "success",
            message: "上传导唱文件成功！"
          });
          //this.submitForm();//提交表单
        } else {
          this.daoChangCode = "";

          this.$message({
            type: "error",
                                                message: `上传导唱文件失败！错误码：${res.status}--错误原因：${res.des}`
          });
        }
      });
    },
    
    refresh() {
      this.reload();
    },
   
    close(){
          this.$emit('editDistributeRecorder')
    },
    confirm() {
      
      const param = {
        token: this.token,
    id: this.userInfo.id,
    
    fileCode: this.fileCode,
    projectCode: this.projectCode,
      };
      console.log(param)
      commitRecord(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.lyricsCode = res.data;
          this.$message({
            type: "success",
            message: "上传录音成功！"
          });
          this.dialogFormVisible=false
          //this.submitForm();//提交表单
          this.$emit('editDistributeRecorder')
        } else {
          this.lyricsCode = "";

          this.$message({
            type: "error",
                                                            message: `上传录音失败！错误码：${res.status}--错误原因：${res.des}`

          });
        }
      });
    }
  }
};
</script>

<style>
.customWidth-addSong {
  width: 500px;
}
</style>
