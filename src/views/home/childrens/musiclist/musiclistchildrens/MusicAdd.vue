<template>
  <div id="add">
    <el-button type="primary" size="small" @click="dialogFormVisible = true">上传小样</el-button>
    <el-dialog title="上传成品" customClass="customWidth-addSong" :visible.sync="dialogFormVisible">
      <el-form :model="music">
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
            accept=".jpg, .jpeg, .png"
            :http-request="httpRequest"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">请选择.MP3格式的文件上传</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传歌词:" prop="file" :label-width="formLabelWidth">
          <el-upload
            action
            multiple
            ref="upload_img"
            accept=".jpg, .jpeg, .png"
            :http-request="httpRequestLyric"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">请选择.歌词文件上传</span>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>



<script>
import { uploadFile, aboutMusicTag, commitDemo } from "network/home.js";

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
      dialogFormVisible: false,
      formLabelWidth: "120px",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      fileList: [],
      param: {},
      musicTypeList: [],
      lyricsCode: "",
      demoCode: ""
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

      // let url = process.env.CMS1_BASE_API + 'cdnDel/uploadExcel'
      // let config = {
      //   headers: {
      //    'Content-Type': 'multipart/form-data'
      //   }
      // }
      uploadFile(fd).then(res => {
        if (res.status == 0) {
          this.demoCode = res.data;
          this.$message({
            type: "success",
            message: "上传歌曲成功！"
          });
          //this.submitForm();//提交表单
        } else {
          this.demoCode = "";
          this.$message({
            type: "error",
            message: "上传歌曲失败！"
          });
        }
        //  if(res.code===0){
        //    this.submitForm();//提交表单
        //  }
      });
    },
    // param是自带参数。 this.$refs.upload.submit() 会自动调用 httpRequest方法.在里面取得file
    httpRequestLyric(param) {
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
    //有变化时调用的函数
    // handleChange(file, fileList) {
    //   this.param.append("img", file.raw);
    // },
    // handleRemove(file, filesList) {
    //   this.param.delete("img");
    // },
    // handleChange1(file, fileList) {
    //   this.param.append("music", file.raw);
    //   console.log(this.param.get("music"));
    // },
    // handleRemove1(file, filesList) {
    //   this.param.delete("music");
    // },
    confirm() {
      //利用表单数据传值，后端用RequestParam接收表单的值
      // 注意 headers: {
      //   "Content-Type": "multipart/form-data"
      // }
      //下面append的东西就会到form表单数据的fields中；
      //然后通过下面的方式把内容通过axios来传到后台
      // let musicName = this.music.musicName;
      // var musicType = this.music.musicType;
      // var musicHot = this.music.musicHot;
      // var musicSinger = this.music.musicSinger;
      // var musicLric = this.music.musicLric;
      // this.param.append("musicname", musicName);
      // this.param.append("musictypename", musicType);
      // this.param.append("musichot", musicHot);
      // this.param.append("singername", musicSinger);
      // this.param.append("lyricurl", musicLric);
      // const instance = this.axios.create({
      //   withCredentials: true
      // });
      const param = {
        token: this.token,
        songName: this.music.musicName,
        demo: {
          lyricist: this.music.musicLric,
          composer: this.music.musicSinger,
          lyricsCode: this.lyricsCode,
          demoCode: this.demoCode,
          tag: this.music.musicType
        }
      };
      console.log(param)
      commitDemo(param).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.lyricsCode = res.data;
          this.$message({
            type: "success",
            message: "上传小样成功！"
          });
          this.dialogFormVisible=false
          //this.submitForm();//提交表单
          this.$emit('addMusic')
        } else {
          this.lyricsCode = "";

          this.$message({
            type: "error",
            message: "上传小样失败！"
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
