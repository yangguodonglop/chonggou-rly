<template>
  <div id="add">
    <el-form class="userfrom" ref="form" :model="form">
      <el-form-item label="账号" prop="userName" :label-width="formLabelWidth">
        <el-input v-model="form.account" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.nick"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input v-model="password" type="password" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="address" :label-width="formLabelWidth">
        <el-input v-model="form.weiXin"></el-input>
      </el-form-item>
      <el-form-item style="    display: flex;justify-content: center;">
        <el-button size="small" type="primary" @click="back">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { insertUser, addUser, rewriteInfo } from "network/home.js";
export default {
  name: "Add",
  inject: ["reload"],
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      token: JSON.parse(localStorage.getItem("userInfo")).token,

      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {
        user: "",
        password: "",
        nick: "",
        telephone: "",
        weiXin: ""
      },
      password:"******",
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
  mounted() {
    console.log(this.userInfo);
    this.form = { ...this.userInfo };
  },
  watch: {
    userInfo(val) {
      this.$nextTick(() => {
        console.log(val);
        this.form = { ...val };
      });
    }
  },
  created() {
    // this.$nextTick(() => {
    //   this.$refs.ipt.focus();
    // });
  },
  methods: {
    back() {
      this.$emit("editInfo");


    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.rewriteInfo();
        } else {
          this.$message.error("请输入完整的用户信息!");
        }
      });
    },
    //刷新
    refresh() {
      this.reload();
    },
    rewriteInfo() {
      const param = {
        token: this.token,
        account: this.form.account,

        item: {
          nick: this.form.nick,
          telephone: this.form.telephone,
          weiXin: this.form.weiXin
        }
        // user: this.form.user,
        // password: this.form.password,
        // nick: this.form.nick,
        // telephone: this.form.telephone,
        // weiXin: this.form.weiXin
      };
      //发送请求更新用户
      rewriteInfo(param)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            this.$message({
              type: "success",
              message: "修改成功！"
            });
                      this.dialogFormVisible = false;
          this.$emit("editInfo");
          } else {
            this.$message({
              type: "error",
              message: `操作失败！错误码：${res.status}--错误原因：${res.des}`
            });
          }

        })

    }
  }
};
</script>

<style>
.customWidth {
  width: 700px;
}
</style>
