<template>
  <div id="add1" style="width:700px;overflow:hidden;">
    <el-dialog :close-on-click-modal='false' title="添加账户" :visible="dialogFormVisible"  :before-close="handleDialogClose"  customClass="customWidthaddSong" >
      <el-form class="userfrom">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.user" ref="ipt"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.nick"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item label="微信" :label-width="formLabelWidth">
          <el-input v-model="form.weiXin"></el-input>
        </el-form-item>
        <el-form-item style=" display: flex;justify-content: center;">
          <el-button type="primary" size="small" @click="back()">取消</el-button>

          <el-button type="primary" size="small" :disabled="saveType" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { insertUser, addUser } from "network/home.js";
export default {
  name: "Add",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  // props:{
  //   dialogFormVisible:{
  // type:Boolean,
  //   default:false

  // },
  data() {
    return {
      dialogFormVisible: true,
      formLabelWidth: "100px",
      form: {
        user: "",
        password: "",
        nick: "",
        telephone: "",
        weiXin: ""
      },
      saveType:false
    };
  },
  created() {},
  watch: {
    userInfo(val) {
      this.$nextTick(() => {});
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$emit("addUserInfo");
    },
    handleDialogClose(){
      this.$emit("addUserInfo");

    },
    closeDialog() {
      this.$emit("addUserInfo");
    },
    onSubmit() {
      this.insertUser();

    },
    //刷新
    refresh() {
      this.reload();
    },
  
    insertUser() {
      if(this.form.user==''){
              this.$message({
              type: "error",
              message: "请输入正确的账户名！"
            });
            return  false
      }

        if(this.form.nick==''){
              this.$message({
              type: "error",
              message: "请输入正确的昵称！"
            });
            return  false
      }
              if(this.form.password==''){
              this.$message({
              type: "error",
              message: "请输入正确的密码！"
            });
            return  false
      }
        if(this.form.telephone=='' || this.form.telephone.length!=11){
              this.$message({
              type: "error",
              message: "请输入正确的手机号！"
            });
            return  false
      }
         if(this.form.weiXin==''){
              this.$message({
              type: "error",
              message: "请输入正确的微信号！"
            });
            return  false
      }
      this.saveType=true
      const param = {
        user: this.form.user,
        password: this.form.password,
        nick: this.form.nick,
        telephone: this.form.telephone,
        weiXin: this.form.weiXin
      };
      //发送请求更新用户
      addUser(param)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            this.$message({
              type: "success",
              message: "添加成功！"
            });
            this.$emit("addUserInfo");
          }else{
                  this.saveType=false

                this.$message({
              type: "error",
              message: `添加失败！错误码：${res.status}--错误原因：${res.des}`
            });
          }
        })
    }
  }
};
</script>

<style>
.customWidthaddSong {
  width: 700px;
}
</style>
