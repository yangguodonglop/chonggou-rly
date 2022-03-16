<template>
  <div id="add1" style="width:100%;overflow:hidden;">
    <el-button type="primary" size="small" @click="dialogFormVisible = true">添加</el-button>
    <el-dialog title="添加账户" customClass="customWidth" :visible.sync="dialogFormVisible">
      <el-form class="userfrom" ref="form" :model="form">
        <el-form-item label="账号" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="form.user" ref="ipt"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.nick"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="address" :label-width="formLabelWidth">
          <el-input v-model="form.weiXin"></el-input>
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
import { insertUser, addUser } from "network/home.js";
export default {
  name: "Add",
  inject: ["reload"],
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {
        user: "",
        password: "",
        nick: "",
        telephone: "",
        weiXin: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        status: [{ required: true, message: "请输入状态", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        createTime: [
          { required: true, message: "请输入创建时间", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "请输入更新时间", trigger: "blur" }
        ]
      }
    };
  },
  created() {
     Object.assign(this.$data, this.$options.data.call(this))
    this.$nextTick(() => {
     console.log("*********")
    });
  },
  mounted(){
     console.log("999999")
  },
  methods: {
    back() {
      this.$confirm("此操作将会退出, 请确认是否保存,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dialogFormVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.insertUser();
        } else {
          this.$message.error("请输入完整的用户信息!");
        }
      });
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
          }
          this.dialogFormVisible = false;
          this.$emit("quryInfo");
        })
        .catch(() => {
          this.$message.error("添加失败！");
        });
    }
  }
};
</script>

<style>
.customWidth {
  width: 700px;
}
</style>
