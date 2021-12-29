<template>
  <div id="update-password">
    <div class="background"></div>
    <div class="front">
      <h2>修改密码</h2>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="form.checkPass"
            autocomplete="off"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn">
            <el-button type="primary" @click="onSubmit">确定修改</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { findUserByName, updatePassword } from "network/uhome.js";

export default {
  name: "UpdatePassword",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        userName: "",
        password: "",
        email: "",
        phone: "",
        address: "",
        checkPass: ""
      },
      rules: {
        password: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.findUserByName(this.$store.state.saveUserName);
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          updatePassword(
            this.form.uid,
            this.form.userName,
            this.form.email,
            this.form.password,
            this.form.phone,
            this.form.address,
            this.form.createTime,
            this.form.status,
            this.form.remark
          ).then(res => {
            console.log(res);
            if (res === "success") {
              this.$message({
                type: "success",
                message: "修改成功！"
              });
              this.$router.push({
                path: "/ulogin"
              });
            } else {
              this.$message.error("修改失败！");
            }
          });
        } else {
          console.log("请输入完整信息！");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    findUserByName(userName) {
      findUserByName(userName).then(res => {
        console.log(res);
        this.form = res;
        this.form.password = "";
      });
    }
  }
};
</script>

<style scoped>
#update-password {
  position: relative;
  /* 设置login的高度为100vh，即屏幕高度*/
  height: 100vh;
}

#update-password .btn {
  display: flex;
  justify-content: space-around;
}

#update-password .el-button {
  width: 200px;
  padding: 15px 0;
  margin-right: 80px;
  margin-top: 20px;
}

#update-password .front {
  position: absolute;
  z-index: 1;
  width: 450px;
  height: 285.83px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
  padding: 50px 30px 30px;
  border: 1px solid #999;
  text-align: center;
  border-radius: 30px;
  box-shadow: 0 0 10px 0 #999;
}

#update-password .background {
  position: absolute;
  z-index: -1;
  /* 要给背景图片设置宽高 */
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/music.webp");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
