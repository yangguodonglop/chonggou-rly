<template>
  <div id="login">
    <!-- 背景图 -->
    <div class="background"></div>
    <div class="front">
      <h2>绕梁音后台管理系统</h2>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="form.username" placeholder="请输入用户名" autofocus="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" v-on:keyup.13.native="submit" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { adminLogin } from "network/login.js";
export default {
  name: "Login",
  data() {
    return {
      // 表单要提交的数据
      form: {
        username: "",
        password: ""
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 5 到 20个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
		//    this.setLogin();
		  //按回车键响应
			var _this = this;
			document.onkeydown = function(e) {
			let key = window.event.keyCode;
			if (key == 13) {
				_this.onSubmit();
			}
			};
	   },
  methods: {
    onSubmit() {
      //表单验证
      //用axios向后端发送ajax请求
      this.$refs.form.validate(valid => {
        if (valid) {
          const param = {
            user: this.form.username,
            pwd: this.form.password
          };
          //post请求
          adminLogin(param).then(res => {
            console.log(res);
            //后端验证用户名和密码是否正确
            //登陆成功则跳转到首页
            //     this.$router.push({
            //   path: "/MusicList"
            // });
            //               this.$store.commit("saveUserName", this.form.username);

            // return false
            if (res.status == "0") {
               ;
              this.$message({
                message: "登录成功!",
                type: "success"
              });
              localStorage.setItem("userInfo", JSON.stringify(res.data));
              // console.log(this.$store.state)
              // console.log(routerList.admin)
              // console.log(VueRouter)
              this.$store.commit("saveUserName", this.form.username);
              // this.$store.commit("saveRouterList", routerList.admin);
              console.log(this.$store.state)
              console.log(res.data);
              let funGroup = res.data.account.funcGroup;
              console.log(funGroup);
              if (funGroup.includes(1500)) {
                this.$router.push({
                  path: "/SingerkhList"
                });
              }
            else if (funGroup.includes(100) ||funGroup.includes(150)||funGroup.includes(200)||
                funGroup.includes(251)||funGroup.includes(300)||funGroup.includes(351)||
                funGroup.includes(400)||funGroup.includes(451)|| funGroup.includes(500)||funGroup.includes(551)) {
                this.$router.push({
                  path: "/MusicList"
                });
              }
              else {
                this.$router.push({
                  path: "/singerlist"
                });
              }
            } else {
              this.$message.error("用户名或密码不正确");
            }
          });
        } else {
          this.$message.error("用户名或密码格式不正确");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
#login {
  position: relative;
  /* 设置login的高度为100vh，即屏幕高度*/
  height: 100vh;
}

#login .el-button {
  width: 200px;
  padding: 15px 0;
  margin-right: 80px;
  margin-top: 20px;
}

#login .front {
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

#login .background {
  position: absolute;
  z-index: -1;
  /* 要给背景图片设置宽高 */
  width: 100%;
  height: 100%;
  background-image: url("../../assets/login.webp");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
