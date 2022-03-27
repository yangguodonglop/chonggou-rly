<template>
   <el-dialog
          :close-on-click-modal="false"
           :before-close="handleDialogClose"
          :footer="false"
          title="生成试听列表"
          :visible="true"
          customClass="customWidth-distribute"
        >
  <div id="add">
      <el-form :model="music">
        <el-form-item label="歌单名称:" :label-width="formLabelWidth">
          <el-input v-model="listName" autocomplete="off" placeholder="请输入歌曲名称"></el-input>
        </el-form-item>
        
             <el-form-item label="歌单试听有效天数:" :label-width="formLabelWidth">
          <el-input v-model="validTime" autocomplete="off" placeholder="请输入歌曲名称"></el-input>
        </el-form-item>
             <el-form-item label="歌曲锁定天数:" :label-width="formLabelWidth">
          <el-input  v-model="lockTime" autocomplete="off" placeholder="请输入歌曲名称"></el-input>
        </el-form-item>
        <el-form-item label="合作伙伴:" :label-width="formLabelWidth">
          <el-select style="width:100%;" @change="onChange"  v-model="publisher" placeholder="请选择歌曲风格">
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
        <el-button @click="toBack()" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm()" size="small">确 定</el-button>
      </div>
  </div>
   </el-dialog>
</template>



<script>
import { uploadFile, aboutMusicTag, commitDemo,commitArrangement,userListActive,makeAuditionList } from "network/home.js";

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
    lockTime:7,
    publisher: "",
    publisherList:[],
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
    msg:'111'
    };
  },

  created() {
    this.param = new FormData();
  },
  mounted() {
    this.queryInfo();
            this.findUserInfo()

    console.log(this.userInfo)
  },
   watch: {
     
    userInfo(val) {
      console.log(val)
      // this.keyArr = [];
      // this.keyArr = val.funcGroup;
      this.$nextTick(() => {
        this.findUserInfo()
       // console.log(baseUrl)
       
        // this.musicListlyricsFile()
        // this.musicListDemo()
      });
    }
   },
  methods: {
    handleDialogClose(){
                this.$emit('editToAuditionList')

    },
    toBack(){
                this.$emit('editToAuditionList')

    },
    onChange(val){
      console.log(val)
      this.publisher=val
    },
      //查找用户列表
    findUserInfo() {
      debugger
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
        console.log(this.publisherList)
      });
    },
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
      fd.append("category", "arrPro");

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
            message: "上传编曲成功！"
          });
          //this.submitForm();//提交表单
        } else {
          this.fileCode = "";
          this.$message({
            type: "error",
            message: "上传编曲失败！"
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
      fd.append("category", "arrDC");

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
            message: "上传工程文件成功！"
          });
          //this.submitForm();//提交表单
        } else {
          this.projectCode = "";

          this.$message({
            type: "error",
            message: "上传工程文件失败！"
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
            message: "上传导唱文件失败！"
          });
        }
      });
    },
    
    refresh() {
      this.reload();
    },
   
    confirm() {
      
      const param = {
        token: this.token,
    listName:this.listName,
    validTime:this.validTime,
    lockTime:this.lockTime,
    publisher: this.publisher,
    songID:this.userInfo.songIdArr

    
    // "listName": "测试试听",
    // "validTime": 15,
    // "lockTime":7,
    // "publisher": "test_wangyi",
      };
    
      makeAuditionList(param).then(res => {
        console.log(res);
        console.log(res.data.url)
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "生成试听列表成功！"
          });
         // this.$emit('editToAuditionList')
          this.dialogFormVisible=false
          //this.submitForm();//提交表单
          this.$emit('editToAuditionList',res.data.url)
        } else {
          this.lyricsCode = "";

          this.$message({
            type: "error",
            message: "生成试听列表失败！"
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
