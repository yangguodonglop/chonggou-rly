<template>
  <div id="add">
        <p v-for="item in userInfo['remark']" :key="item">
          {{item}}
        </p>
      <div slot="footer" class="dialog-footer" style="display: flex;justify-content: center;">
        <el-button @click="close()" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm()" size="small">确 定</el-button>
      </div>
  </div>
</template>

<script>
import { uploadFile, aboutMusicTag, commitDemo,commitArrangement,commitMix,remarkToSong,remarkToSongActive } from "network/home.js";

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
    daoChangCode: "",
    remarkText:"isfhdshfhdisfhidhfids"
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
        //this.findUserInfo()
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
      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("files", fileObj); // 文件对象
      fd.append("token", this.token);
      fd.append("category", "audition");

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
            message: "上传混音成功！"
          });
          //this.submitForm();//提交表单
        } else {
          this.fileCode = "";
          this.$message({
            type: "error",
            message: `上传混音失败！错误码：${res.status}--错误原因：${res.des}`
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
      fd.append("category", "mixPro");

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
            message: "上传混音工程文件成功！"
          });
          //this.submitForm();//提交表单
        } else {
          this.projectCode = "";

          this.$message({
            type: "error",
            message: `上传混音工程文件失败！错误码：${res.status}--错误原因：${res.des}`
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
          this.$emit('editRemarkActive')
    },
    confirm() {
      
      const param = {
        token: this.token,
    
    songID:this.userInfo.id,
    remark:this.remarkText
}
      
    
      remarkToSongActive(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "添加备注成功！"
          });
          this.dialogFormVisible=false
          //this.submitForm();//提交表单
          this.$emit('editRemarkActive')
        } else {

          this.$message({
            type: "error",
            message: `添加备注失败！错误码：${res.status}--错误原因：${res.des}`
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

  .textarea-con {
  border: 1px solid #d9d9d9;
  width: 100%;
  resize: none;
  height: 200px;
      box-sizing: border-box;
  padding:15px 0px 0px 15px;
  margin-bottom:15px;

}
</style>
