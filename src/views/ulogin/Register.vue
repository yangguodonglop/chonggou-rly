<template>
  <div id="register">
    <!-- 背景图 -->
    <div class="background"></div>
    <div class="front">
      <h2>用户注册</h2>
      <el-form
        ref="form"
        status-icon
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="form.username"
            placeholder="请输入用户名"
            autofocus="true"
          ></el-input>
        </el-form-item>
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
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="text"
            v-model="form.email"
            placeholder="请输入邮箱"
            autofocus="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input
            type="text"
            v-model="form.phone"
            placeholder="请输入手机"
            autofocus="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input
            type="text"
            v-model="form.address"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn">
            <el-button type="primary" @click="onSubmit">立即注册</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from "network/ulogin.js";
export default {
  name: "Register",
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
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      if (value === "") {
        callback(new Error("请输入手机"));
      } else if (!reg.test(this.form.phone)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!reg.test(this.form.email)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        email: "",
        phone: "",
        address: "",
        checkPass: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          register(
            this.form.username,
            this.form.password,
            this.form.address,
            this.form.phone,
            this.form.email
          ).then(res => {
            console.log(res);
            if (res === "error1") {
              this.$message.error("用户名重复！");
            } else if (res === "error2") {
              this.$message.error("邮箱重复！");
            } else if (res === "error3") {
              this.$message.error("手机重复！");
            } else {
              this.$message({
                message: "注册成功!",
                type: "success"
              });
              this.$router.push({
                path: "/find"
              });
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
    }
  }
};
</script>

<style scoped>
#register {
  position: relative;
  /* 设置login的高度为100vh，即屏幕高度*/
  height: 100vh;
}

#register .btn {
  display: flex;
  justify-content: space-around;
}

#register .el-button {
  width: 200px;
  padding: 15px 0;
  margin-right: 80px;
  margin-top: 20px;
}

#register .front {
  position: absolute;
  z-index: 1;
  width: 450px;
  height: 505.83px;
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

#register .background {
  position: absolute;
  z-index: -1;
  /* 要给背景图片设置宽高 */
  width: 100%;
  height: 100%;
  background-image: url("../../assets/ulogin.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
