<template>
  <div id="add1" style="width:700px;overflow:hidden;">
    <el-dialog title="添加账户" :visible="dialogFormVisible" @close="closeDialog"   customClass="customWidthaddSong" >
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
          <el-button type="primary" @click="back">取消</el-button>

          <el-button type="primary" @click="onSubmit">保存</el-button>
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
      }
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
    closeDialog() {
      this.$emit("addUserInfo");
    },
    onSubmit() {
      this.insertUser();

      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //     this.insertUser();
      //   } else {
      //     this.$message.error("请输入完整的用户信息!");
      //   }
      // });
    },
    //刷新
    refresh() {
      this.reload();
    },
    insertUser() {
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
          }
        })
        .catch(() => {
          this.$message.error("添加失败！");
        });
    }
  }
};
</script>

<style>
.customWidthaddSong {
  width: 700px;
}
</style>
