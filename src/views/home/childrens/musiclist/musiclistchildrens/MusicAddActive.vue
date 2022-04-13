<template>
  <div id="add">
    <el-dialog :close-on-click-modal='false' title="上传成品" customClass="customWidth-addSong" :visible.sync="dialogFormVisible">
      <el-form :model="music" v-loading="loading"
    element-loading-text="上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-form-item label="歌曲名称:" :label-width="formLabelWidth">
          <el-input v-model="music.musicName" autocomplete="off" placeholder="请输入歌曲名称"></el-input>
        </el-form-item>
        <el-form-item label="作词者:" :label-width="formLabelWidth">
          <el-input v-model="music.musicLric" autocomplete="off" placeholder="请输入作词者"></el-input>
        </el-form-item>
        <el-form-item label="作曲者:" :label-width="formLabelWidth">
          <el-input v-model="music.musicSinger" autocomplete="off" placeholder="请输入作曲者"></el-input>
        </el-form-item>
        <el-form-item label="歌曲风格:" :label-width="formLabelWidth">
          <el-select style="width:100%;" multiple v-model="music.musicType" placeholder="请选择歌曲风格">
            <el-option
              v-for="(item, index) in musicTypeList"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传歌曲:" prop="file" :label-width="formLabelWidth">
          <el-upload
            action
            multiple
            ref="upload_img"
             accept=""
            :http-request="httpRequest"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">请选择歌曲文件上传</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传歌词:" prop="file" :label-width="formLabelWidth">
          <el-upload
            action
            multiple
            ref="upload_img"
             accept=""
            :http-request="httpRequestLyric"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">请选择.歌词文件上传</span>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="back()" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm()" size="small" :disabled="saveType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>



<script>
import { uploadFile, aboutMusicTag, commitDemo,commitFinishedProduct } from "network/home.js";

export default {
  name: "MusicAdd",
  inject: ["reload"],
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
      dialogFormVisible: true,
      formLabelWidth: "120px",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      fileList: [],
      param: {},
      musicTypeList: [],
      lyricsCode: "",
         lyricsCodeActive: "",
      demoCode: "",
      demoCodeActive: "",
      loading:false,
      saveType:false
    };
  },
  props: {
    // musicTypeList: {
    //   type: Array,
    //   default() {
    //     return [];
    //   }
    // }
  },
  created() {
    this.param = new FormData();
  },
  mounted() {
    this.queryInfo();
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
      fd.append("category", "demo");
         this.demoCodeActive=fileObj
      console.log(this.demoCodeActive)

      // let url = process.env.CMS1_BASE_API + 'cdnDel/uploadExcel'
      // let config = {
      //   headers: {
      //    'Content-Type': 'multipart/form-data'
      //   }
      // }
      // uploadFile(fd).then(res => {
      //   if (res.status == 0) {
      //           this.loading=false;

      //     this.demoCode = res.data;
      //     this.$message({
      //       type: "success",
      //       message: "上传歌曲成功！"
      //     });
      //     //this.submitForm();//提交表单
      //   } else {
      //                     this.loading=false;

      //     this.demoCode = "";
      //     this.$message({
      //       type: "error",
      //                   message: `上传歌曲失败！错误码：${res.status}--错误原因：${res.des}`
      //     });
      //   }
      //   //  if(res.code===0){
      //   //    this.submitForm();//提交表单
      //   //  }
      // });
    },
    // param是自带参数。 this.$refs.upload.submit() 会自动调用 httpRequest方法.在里面取得file
    httpRequestLyric(param) {

      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("files", fileObj); // 文件对象
      fd.append("token", this.token);
      fd.append("category", "lyric");
       this.lyricsCodeActive=fileObj
      console.log(this.lyricsCodeActive)
      // let url = process.env.CMS1_BASE_API + 'cdnDel/uploadExcel'
      // let config = {
      //   headers: {
      //    'Content-Type': 'multipart/form-data'
      //   }
      // }
      // uploadFile(fd).then(res => {
      //   if (res.status == 0) {
      //                     this.loading=false;

      //     this.lyricsCode = res.data;
      //     this.$message({
      //       type: "success",
      //       message: "上传歌词成功！"
      //     });
      //     //this.submitForm();//提交表单
      //   } else {
      //                     this.loading=false;

      //     this.lyricsCode = "";

      //     this.$message({
      //       type: "error",
      //                   message: `上传歌词失败！错误码：${res.status}--错误原因：${res.des}`
      //     });
      //   }
      // });
    },
    refresh() {
      this.reload();
    },
    back(){
          this.$emit('addMusicCp')

    },
    confirm() {
        if (this.music.musicName == "") {
        this.$message({
          type: "error",
          message: "请输入正确歌曲名！"
        });
        return false;
      }
      if (this.music.musicLric == "") {
        this.$message({
          type: "error",
          message: "请输入正确作词者！"
        });
        return false;
      }
      if (this.music.musicSinger == "") {
        this.$message({
          type: "error",
          message: "请输入正确作曲者！"
        });
        return false;
      }
      if (this.music.musicType == "") {
        this.$message({
          type: "error",
          message: "请选择歌曲风格！"
        });
        return false;
      }

      if (this.demoCodeActive == "") {
        this.$message({
          type: "error",
          message: "请上传正确歌曲文件"
        });
        return false;
      }
      if (this.lyricsCodeActive == "") {
        this.$message({
          type: "error",
          message: "请上传正确歌词文件！"
        });
        return false;
      }
      const param = {
        token: this.token,
        songName: this.music.musicName,
        item: {
           songName: this.music.musicName,
          lyricist: this.music.musicLric,
          composer: this.music.musicSinger,
          tag: this.music.musicType,
          mixProjectCode:''
        }
      };
             let fd = new FormData()
            fd.append("lyricsFile",  this.lyricsCodeActive); // 文件对象
      fd.append("auditionFileCode", this.demoCodeActive);
     fd.append('REQ',JSON.stringify(param) );
      console.log(fd);
         this.saveType = true;  
      console.log(param)
      commitFinishedProduct(fd).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.lyricsCode = res.data;
          this.$message({
            type: "success",
            message: "上传成品成功！"
          });
          this.dialogFormVisible=false
          //this.submitForm();//提交表单
          this.$emit('addMusicCp')
        } else {
          this.lyricsCode = "";
      this.saveType=false

          this.$message({
            type: "error",
                        message: `上传成品失败！错误码：${res.status}--错误原因：${res.des}`
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
