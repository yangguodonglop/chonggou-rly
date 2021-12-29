<template>
  <div id="headers">
    <div class="logo">
      <div class="img">
        <img src="../../../assets/音乐.png" alt="" />
      </div>
      <span>绕梁音</span>
    </div>
    <!-- <div class="menu">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#242424"
        text-color="#787878"
        router
        active-text-color="#fff"
      >
        <el-menu-item index="/find">发现音乐</el-menu-item>
        <el-menu-item index="/singers">歌手</el-menu-item>
      </el-menu>
    </div> -->
    <!-- <div class="search">
      <img src="../../../assets/搜索.png" alt="" />
      <input
        type="text"
        name="search"
        placeholder="音乐/视频/歌手"
        @keyup.enter="search"
      />
    </div> -->
    <div class="btn" v-if="this.$store.state.isShow">
      <el-button type="text" @click="userLogin" class="login">登录</el-button>
      <div class="shu"></div>
      <el-button type="text" @click="adminLogin" class="login"
        >管理员登录</el-button
      >
    </div>
    <div class="info" v-else>
      <el-button type="text" class="user-name" @click="drawer = true">{{
        this.$store.state.saveUserName
      }}</el-button>
      <el-drawer title="用户信息" :visible.sync="drawer" :direction="direction">
        <div class="user-info">
          <div class="user-img">
            <img src="../../../assets/用户头像.png" alt="" />
          </div>
          <div class="user-message">
            <span>uid：{{ userInfo.uid }}</span>
            <span>用户名：{{ userInfo.userName }}</span>
          </div>
        </div>
        <div class="user-infos">
          <div class="infos">
            <span>手机号：{{ userInfo.phone }}</span>
            <span>住址：{{ userInfo.address }}</span>
            <span>邮箱：{{ userInfo.email }}</span>
            <span> 注册时间：{{ userInfo.createTime }}</span>
          </div>
        </div>
        <div class="user-options">
          <div class="option">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="updatePassword"
              >修改密码</el-button
            >
            <el-button type="primary" icon="el-icon-edit" @click="updateInfo"
              >修改信息</el-button
            >
          </div>
        </div>
        <el-button type="text" class="out1" @click="out">退出</el-button>
      </el-drawer>
      <div class="shu"></div>
      <el-button type="text" class="out" @click="out">退出</el-button>
    </div>
  </div>
</template>

<script>
import fmtDate from "common/js/Date.js";
import {
  findUserByName,
  searchMusic,
  searchSinger,
  searchVideo
} from "network/uhome.js";
export default {
  name: "Headers",
  data() {
    return {
      isShow: true,
      drawer: false,
      direction: "rtl",
      userInfo: {}
    };
  },
  mounted() {
   // this.findUserByName(this.$store.state.saveUserName);
  },
  methods: {
    userLogin() {
      this.$router.push({
        path: "/ulogin"
      });
    },
    adminLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    out() {
      this.$store.commit("saveIsShow", this.isShow);
      this.$store.commit("saveUserName", "");
    },
    findUserByName(userName) {
      findUserByName(userName).then(res => {
        // console.log(res);
        this.userInfo = res;
      });
    },
    dateFmt(date) {
      let d = new Date(date);
      return fmtDate(d, "yyyy-MM-dd hh:mm:ss");
    },
    updatePassword() {
      this.$router.push({
        path: "/upassword"
      });
    },
    updateInfo() {
      this.$router.push({
        path: "/uinfo"
      });
    },
    search() {
      var search = document.getElementsByName("search")[0].value;
      searchMusic(search).then(res => {
        if (res.musicid) {
          var musicid = res.musicid;
          this.$router.push({
            path: "/song",
            query: { musicid }
          });
        }
      });
      searchSinger(search).then(res => {
        if (res.singerid) {
          var sid = res.singerid;
          this.$router.push({
            path: "/singer",
            query: { sid }
          });
        }
      });
      searchVideo(search).then(res => {
        if (res.videoid) {
          var vid = res.videoid;
          this.$router.push({
            path: "/video",
            query: { vid }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
#headers {
  display: flex;
  align-items: center;
      justify-content: space-between;
}

#headers .logo {
  display: flex;
  align-items: center;
  height: 60px;
  margin-left: 80px;
  margin-right: 10px;
}

#headers .logo .img {
  position: relative;
  width: 30px;
  height: 30px;
  background-color: #c20c0c;
  border-radius: 50%;
  margin-right: 10px;
}

#headers .logo img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
  width: 20px;
  height: 20px;
}

#headers .logo span {
  color: #fff;
  font-size: 20px;
}

#headers .btn {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 10px;
  margin-right: 20px;
}

#headers .btn .login {
  color: #787878;
  margin-right: 10px;
}

#headers .btn .login:hover {
  color: #fff;
}

#headers .shu {
  width: 0;
  height: 15px;
  border-left: 1px solid #787878;
  margin-right: 10px;
}

#headers .search {
  position: relative;
  width: 200px;
  margin-left: 430px;
  margin-right: 20px;
  border-radius: 30px;
  background-color: #fff;
}

#headers .search input {
  position: relative;
  bottom: 2px;
  border: none;
  outline: none;
  width: 150px;
  height: 22px;
  line-height: 22px;
  border-radius: 30px;
}

#headers .search img {
  position: relative;
  top: 4px;
  left: 5px;
  margin-right: 3px;
  width: 22px;
  height: 22px;
}

#headers .info {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: auto;
  margin-right: 70px;
}

#headers .info .user-name {
  color: #aca9a9;
  margin-right: 10px;
}

#headers .info .user-name:hover {
  color: #fff;
}

#headers .info .out {
  color: #787878;
}

#headers .info .out:hover {
  color: #fff;
}

#headers .info .user-info {
  display: flex;
  margin-bottom: 10px;
}

#headers .info .user-info .user-img {
  flex: 1;
}

#headers .info .user-info img {
  position: relative;
  left: 30px;
  width: 100px;
  height: 100px;
}

#headers .info .user-info .user-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

#headers .info .user-info .user-message span {
  margin-bottom: 10px;
}

#headers .info .user-infos {
  flex-direction: column;
  border-top: 1px solid #999;
  margin-bottom: 20px;
}

#headers .info .user-infos .infos {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

#headers .info .user-infos .infos span {
  margin-top: 20px;
}

.out1 {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  color: #787878;
  background-color: #eee;
}

.el-drawer rtl {
  position: relative;
}

.user-options {
  border-top: 1px solid #999;
}

.option {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
