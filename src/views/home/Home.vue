<template>
  <div id="home">
    <div class="header">
      <div style="display: flex;justify-content: flex-start;align-items: center;">
        <i class="el-icon-monitor"></i>
      <h3>云音乐后台管理系统</h3>
      </div>
      <div>
         <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link" style="font-size:16px;">
        欢迎你！{{ this.$store.state.saveUserName }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
         <el-dropdown-item command="a">修改密码</el-dropdown-item>
    <el-dropdown-item command="b">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      </div>

      <!-- <span class="user">欢迎你！{{ this.$store.state.saveUserName }}</span>
      <el-button type="text" class="out" @click="out">退出系统</el-button> -->
    </div>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              router
              :unique-opened="true"
              ref="menu"
            >
              <el-submenu index="1" v-if="funcGroupArr.includes(100) ||funcGroupArr.includes(150)||funcGroupArr.includes(200)||
                funcGroupArr.includes(251)||funcGroupArr.includes(300)||funcGroupArr.includes(351)||
                funcGroupArr.includes(400)||funcGroupArr.includes(451)|| funcGroupArr.includes(500)||funcGroupArr.includes(551)">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  <span>制作管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/musiclist">歌曲列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2" v-if="funcGroupArr.includes(100) || funcGroupArr.includes(600) || funcGroupArr.includes(651) || funcGroupArr.includes(150)">
                <template slot="title">
                  <i class="el-icon-headset"></i>
                  <span slot="title">歌单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/singerlist">生成试听歌单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3" v-if="funcGroupArr.includes(100) || funcGroupArr.includes(600) || funcGroupArr.includes(651)|| funcGroupArr.includes(150)">
                <template slot="title">
                  <i class="el-icon-shopping-cart-1"></i>
                  <span slot="title">发布管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/videolist">发布列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
                <el-submenu index="4" v-if="funcGroupArr.includes(100) || funcGroupArr.includes(1500) || funcGroupArr.includes(150)">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">客户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/singerkhList">试听列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5" v-if="funcGroupArr.includes(100) || funcGroupArr.includes(150)">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/user">用户列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-container>
        <el-main>
          <keep-alive
            exclude="User,Check,Add,Update,MusicList,MusicAdd,MusicCheck,SingerType,SingerAdd,SingerList,SingerCheck,VideoList,VideoAdd"
          >
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :close-on-click-modal='false'
  title="修改密码"
  :visible.sync="dialogVisible"
  customClass="customWidth3"
 >
      <el-form class="userfrom" ref="form" :model="form">
        <el-form-item label="原始密码" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="form.oldPassword" ref="ipt"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item  style=" display: flex;justify-content: center;" >
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button type="primary" @click="back">退出</el-button>
        </el-form-item>
      </el-form>
</el-dialog>

  </div>
</template>

<script>
import { updatePassword } from "network/home.js";

export default {
  name: "Home",
  data() {
    return {
      dialogVisible:false,
       formLabelWidth: "80px",
       form: {
         oldPassword: "",
    newPassword: ""
      },
    };
  },
  created() {
    this.funcGroupArr = JSON.parse(
      localStorage.getItem("userInfo")
    ).account.funcGroup;
    console.log(this.funcGroupArr);
  },
  methods: {
    //下拉菜单
      handleCommand(command) {
        if(command=='a'){
          this.dialogVisible=true
        }else{
          this.out()
        }
      },
       back() {
      this.$confirm("此操作将会退出, 请确认是否保存,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消"
          // });
        });
    },
     onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.updatePassword();
        } else {
          this.$message.error("请输入完整的用户信息!");
        }
      });
    },
     updatePassword() {
      const param = {
        token:JSON.parse(localStorage.getItem("userInfo")).token,
        oldPassword: this.form.oldPassword,
        newPassword: this.form.newPassword,
      };
      //确认修改密码
      updatePassword(param)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            this.$message({
              type: "success",
              message: "修改密码成功,请重新登陆！"
            });
             this.dialogVisible = false;
           this.$router.push("/login");
          }

        })
        .catch(() => {
          this.$message.error("修改密码失败！");
        });
    },
    out() {
      this.$confirm("是否退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style>
html{
  height: 100%;
}
body{
  height: 100%;
}
#home{
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.header {
  display: flex;
  position: relative;
  align-items: center;
  height: 80px;
  background-color: #eaeaea;
  background-image: url("../../assets/ulogin.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  justify-content: space-between;
}

.header i {
  margin: 0 20px;
}

.header .user {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 13px;
}

.out {
  position: absolute;
  right: 20px;
  bottom: 0px;
}

.el-col-12 {
  width: 100%;
}
.customWidth3{
  width: 400px;
}
.el-submenu span{
  font-size: 14px;
  color: rgb(255, 165, 0);

}
.el-submenu.is-active .el-submenu__title span{
}
.el-menu-item-group__title{
  padding: 0px;
}
</style>
