<template>
<div style="display: flex;
    justify-content: center;width:100%;">
<div v-if="permission" style="width:100%;">
  <div id="user" style="width:100%;">
    <!-- 头部 -->
    <search-header>
      <div class="option">
        <div class="user-id option-active">
          <span>用户编号：</span>
          <el-input
            v-model="search.uid"
            size="mini"
            placeholder="请输入用户编号"
            style="width: 150px"
            @focus="inputchange('uid')"
          />
        </div>
        <div class="user-name option-active">
          <span>用户名称：</span>
          <el-input
            v-model="search.userName"
            size="mini"
            placeholder="请输入用户名称"
            style="width: 150px"
            @focus="inputchange('userName')"
          />
        </div>
        <div class="user-adress option-active">
          <span>用户地址：</span>
          <el-input
            v-model="search.address"
            size="mini"
            placeholder="请输入用户地址"
            style="width: 150px"
            @focus="inputchange('address')"
          />
        </div>
        <div class="btn option-active">
          <add @quryInfo="findUserInfo"></add>
          <addMode @quryInfo="findUserInfo"></addMode>
          <add-style @quryInfo="findUserInfo"></add-style>
          <add-song-style @quryInfo="findUserInfo"></add-song-style>

          <!-- <delete :multiple-selection="multipleSelection"></delete> -->
          <div style="margin-left:20px;">
            <el-button type="info" @click="refresh" size="small" icon="el-icon-refresh"></el-button>
          </div>
        </div>
      </div>
    </search-header>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      stripe
      :default-sort="{ prop: 'uid', order: 'ascending' }"
      size="mini"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <template slot="empty">
        <p>{{ dataText }}</p>
      </template>
      <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
      <el-table-column prop="account" label="账户名" width="200" align="center"></el-table-column>
      <el-table-column prop="nick" label="用户名" width="120" align="center" sortable></el-table-column>
      <!-- <el-table-column prop="password" label="密码" width="120" align="center"></el-table-column> -->
      <el-table-column prop="email" label="邮箱" width="150" align="center"></el-table-column>
      <el-table-column prop="telephone" label="手机" width="120" align="center"></el-table-column>
      <el-table-column prop="weiXin" label="微信" width="120" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" width="80" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" align="center" sortable></el-table-column>
      <el-table-column prop="lastLogin" label="更新时间" width="160" align="center" sortable></el-table-column>
      <el-table-column prop="remark" label="备注" width="200" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="updateClick(scope.row)">修改</el-button>
          <el-button @click="toAuthorization(scope.row)" type="text" size="mini">授权</el-button>
          <el-button @click="changePassword(scope.row)" type="text" size="mini">修改密码</el-button>
          <el-button type="text" size="mini" @click="deleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="getTotal"
        style="textAlign: right"
      ></el-pagination>
    </div>
    <el-dialog
      :footer="false"
      title="编辑信息"
      :visible.sync="dialogVisible"
      customClass="customWidth1"
    >
      <update :userInfo="userInfo" @editInfo="editInfo"></update>
    </el-dialog>
    <el-dialog
      :footer="false"
      title="授权"
      :visible.sync="dialogVisibleActive"
      customClass="customWidth4"
    >
      <authorization :userInfo="userInfo" @authorizationInfo="authorizationInfo"></authorization>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="dialogVisiblePassword" customClass="customWidth3">
      <el-form class="userfrom" ref="form" :model="formPassword">
        <el-form-item label="账号" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="formPassword.account" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="email" :label-width="formLabelWidth">
          <el-input v-model="formPassword.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item style=" display: flex;justify-content: center;">
          <el-button type="primary" @click="onSubmitOk">保存</el-button>
          <el-button type="primary" @click="back">退出</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  </div>
  <div v-if="!permission">
  <img class="permission-img" src="@/assets/permission.webp" width="900" height="420">
  <div class="permission-text">对不起，您暂无权限访问该页面，请联系管理员授权！</div>
</div>
</div>
</template>


<script>
import {
  userList,
  deleteUser,
  addUser,
  delAccount,
  adminSetPassword
} from "network/home.js";
import fmtDate from "common/js/Date.js";
import SearchHeader from "components/common/header/SearchHeader.vue";
import Add from "./userchildrens/Add.vue";

import Delete from "./userchildrens/Delete.vue";
import Update from "./userchildrens/Update.vue";
import Authorization from "./userchildrens/Check.vue";
import AddMode from "./userchildrens/AddMode.vue";
import AddStyle from "./userchildrens/AddStyle.vue";
import AddSongStyle from "./userchildrens/AddSongStyle.vue";

export default {
  name: "User",
  inject: ["reload"],
  data() {
    return {
      formLabelWidth: "80px",

      userInfo: {},
      formPassword: {
        account: "",
        newPassword: ""
      },
      dialogVisiblePassword: false,
      dialogVisible: false,
      dialogVisibleActive: false,
      // 表格数据
      tableData: [],
      // 搜索框
      search: { uid: "", userName: "", status: "", address: "", type: "" },
      // 表格数据的总个数
      total: 0,
      //当前页数
      currentPage: 1,
      //1页10个数据
      pagesize: 10,
      dataText: "",
      multipleSelection: [],
      token: JSON.parse(localStorage.getItem("userInfo")).token,
      loading: true,
      getTotal: 0,
      permission:false
    };
  },
  components: {
    SearchHeader,
    Delete,
    Add,
    Update,
    Authorization,
    AddMode,
    AddStyle,
    AddSongStyle
  },
  created() {
    //加载用户列表
    this.findUserInfo();
  },
  mounted(){
         this.funcGroupArr = JSON.parse(localStorage.getItem("userInfo")).account.funcGroup
     console.log(this.funcGroupArr)
      if (this.funcGroupArr.includes(100)){
this.permission=true
      } else{
      this.permission= false;
    }

  },
  methods: {
    //编辑用户回调
    editInfo() {
      this.dialogVisible = false;
      this.findUserInfo();
    },
    //修改密码
    changePassword(row) {
      this.formPassword = { ...row };
      this.dialogVisiblePassword = true;
    },
    back() {
      this.$confirm("此操作将会退出, 请确认是否保存,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dialogVisiblePassword = false;
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消"
          // });
        });
    },
    //确认密码
    onSubmitOk() {
      const param = {
        token: this.token,
        account: this.formPassword.account,
        newPassword: this.formPassword.newPassword
      };
      adminSetPassword(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              type: "success",
              message: "修改成功！"
            });
            this.dialogVisiblePassword = false;
            this.$emit("quryInfo");
          } else {
            this.$message.error("修改失败！");
          }
        })
        .catch(() => {
          this.$message.error("修改失败！");
        });
    },
    //授权用户回调
    authorizationInfo() {
      this.dialogVisibleActive = false;
      this.findUserInfo();
    },
    //查找用户列表
    findUserInfo() {
            console.log(JSON.parse(localStorage.getItem("userInfo")).account.funcGroup)

      const param = {
        token: this.token,
        pageSize: 10,
        curPage: this.currentPage - 1,
        // fFuncGroup: JSON.parse(localStorage.getItem("userInfo")).account.funcGroup
        fFuncGroup: []
      };
      this.loading = true;
      //向后端发送请求并接受数据库中的用户列表
      userList(param).then(res => {
        if (res.status == 0) {
          this.loading = false;
          res.data.item.forEach(item => {
            //改变时间日期的格式
            item.createTime = this.dateFmt(item.createTime);
            item.lastLogin = this.dateFmt(item.lastLogin);
            // 将用户状态和类型做转换
            // if (item.status === 1) {
            //   item.status = "正常";
            // } else {
            //   item.status = "封禁";
            // }
          });
          this.tableData = res.data.item;
          this.getTotal = res.data.count;
        } else {
          this.tableData = [];
          this.getTotal = 0;
        }
      });
    },
    //查看
    checkClick(row) {
      //row是一个对象，里面保存所选行的所有信息
      //使用路由传参，参数为对象时，需要先将其转化为JSON字符串
      this.$router.push({
        path: "/usercheck",
        query: {
          // row: JSON.stringify(row)
          uid: row.uid
        }
      });
    },
    //更新
    updateClick(row) {
      // this.userInfo="999999"
      this.userInfo = { ...row };
      this.dialogVisible = true;
      // this.$router.push({
      //   path: "/userUpdate",
      //   query: {
      //     // row: JSON.stringify(row)
      //     uid: row.uid
      // //   }
      // });
    },
    toAuthorization(row) {
      this.userInfo = { ...row };
      this.dialogVisibleActive = true;
    },
    deleteClick(row) {
      const param = {
        token: this.token,
        userName: [row.account]
      };
      this.$confirm("完成信息核对, 确认提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delAccount(param).then(res => {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.findUserInfo();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {});
    },
    //添加
    insertUser() {
      this.$router.push("/userinsert");
    },
    //查询的结果
    handleSearch() {
      //利用正则表达式的构造方法去判断是否为一个单词
      var reg = new RegExp("^\\b" + this.form.name + "\\b$");
      //利用数组的filter方法，过滤该数组里每个对象的userName是否和查询表单里的name对应，如果对应
      // 最后返回的是一个数组
      return this.tableData.filter(item => {
        if (reg.test(item.userName)) {
          // 字符串索引有关键字值,返回true
          return item;
        }
      });
    },
    //刷新
    refresh() {
      this.reload();
    },
    //时间转化
    dateFmt(date) {
      let d = new Date(date);
      return fmtDate(d, "yyyy-MM-dd hh:mm:ss");
    },
    //点击之后的当前页数
    handleCurrentChange(val) {
      // 当前页数
      this.currentPage = val;
      this.findUserInfo();
    },
    //当表单下拉框有值时，消除其余的表单下拉框的值
    Change(param, val) {
      if (param === "status" && val != "") {
        this.search.type = "";
        this.search.uid = "";
        this.search.userName = "";
        this.search.address = "";
      }
      if (param === "type" && val != "") {
        this.search.status = "";
        this.search.uid = "";
        this.search.userName = "";
        this.search.address = "";
      }
    },
    //当表单搜索框有值时，消除其余的表单搜索框的值
    inputchange(param) {
      if (param === "uid") {
        this.search.userName = "";
        this.search.address = "";
        this.search.status = "";
        this.search.type = "";
      } else if (param === "userName") {
        this.search.uid = "";
        this.search.address = "";
        this.search.status = "";
        this.search.type = "";
      } else if (param === "address") {
        this.search.uid = "";
        this.search.userName = "";
        this.search.status = "";
        this.search.type = "";
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  computed: {
   
  }
};
</script>

<style >
.customWidth1 {
  width: 700px;
  margin: 0 auto;
}
.customWidth4 {
  width: 300px;
  margin: 0 auto;
}
.customWidth3 {
  width: 400px;
}
.option {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.option .option-active {
  display: flex;
  height: 40px;
  margin-left: 20px;
}

.option .btn {
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
}

span {
  font-size: 12px;
}

.block {
  margin-top: 15px;
}
.permission-img{
  width: 900px;
  height: 420px;
}
.permission-text{
  display: flex;
    justify-content: center;
    font-size: 30px;
    color: #9abee3;
}
</style>
