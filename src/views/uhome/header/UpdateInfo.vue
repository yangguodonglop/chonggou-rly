<template>
  <div id="update-info">
    <div class="background"></div>
    <div class="front">
      <h2>修改信息</h2>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="form.address"></el-input>
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
import { findUserByName } from "network/uhome.js";
import { updateUserList } from "network/home.js";
export default {
  name: "Updateinfo",
  data() {
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
      form: {},
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
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
  mounted() {
    this.findUserByName(this.$store.state.saveUserName);
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          updateUserList(
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
            // console.log(res);
            if (res === "success") {
              this.$message({
                type: "success",
                message: "修改成功！"
              });
              this.$router.push({
                path: "/ulogin"
              });
            } else {
              this.$message.error("用户名已存在！");
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
      });
    }
  }
};
</script>

<style scoped>
#update-info {
  position: relative;
  /* 设置login的高度为100vh，即屏幕高度*/
  height: 100vh;
}

#update-info .btn {
  display: flex;
  justify-content: space-around;
}

#update-info .el-button {
  width: 200px;
  padding: 15px 0;
  margin-right: 80px;
  margin-top: 20px;
}

#update-info .front {
  position: absolute;
  z-index: 1;
  width: 450px;
  height: 385.83px;
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

#update-info .background {
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
