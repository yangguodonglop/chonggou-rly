<template>
  <div id="add1" style="width:100%;overflow:hidden;">
    <el-tree :data="data" show-checkbox node-key="id" ref="tree" :default-checked-keys="keyArr"></el-tree>
    <div style="display: flex;justify-content: center;margin-top:30px">
      <el-button size="small" @click="closeDialog()">取消</el-button>
      <el-button type="primary" size="small" @click="getCheckedKeys">确定</el-button>
    </div>
  </div>
</template>

<script>
import { authorization } from "network/home.js";
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
      dialogFormVisible: false,
      data: [
        {
          id: 100,
          label: "超级管理员"
        },
        {
          id: 150,
          label: "总监制"
        },
        {
          id: 200,
          label: "制作人"
        },
        {
          id: 251,
          label: "词曲作者"
        },
        {
          id: 300,
          label: "编曲组长"
        },
        {
          id: 351,
          label: "编曲师"
        },
        {
          id: 400,
          label: "录音组长"
        },
        {
          id: 451,
          label: "录音师"
        },
        {
          id: 500,
          label: "混音组长"
        },
        {
          id: 551,
          label: "混音师"
        },
        {
          id: 600,
          label: "发行组长"
        },
        {
          id: 651,
          label: "发行专员"
        },
        {
          id: 700,
          label: "法务"
        },
        {
          id: 751,
          label: "财务"
        },
        {
          id: 1000,
          label: "客户"
        },
         {
          id: 1500,
          label: "超级客户"
        }
      ],
      keyArr: []
    };
  },
  created() {
    // this.$nextTick(() => {
    //   this.$refs.ipt.focus();
    // });
  },
  mounted() {
    console.log(this.userInfo);
    this.keyArr = this.userInfo.funcGroup;
  },
  watch: {
    userInfo(val) {
      this.keyArr = [];
      this.keyArr = val.funcGroup;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.keyArr);
      });
    }
  },
  methods: {
    //关闭授权

    closeDialog() {
      this.$emit("authorizationInfo");
    },
    //确认授权
    getCheckedKeys() {
      const param = {
        token: JSON.parse(localStorage.getItem("userInfo")).token,
        userName: this.userInfo.account,
        funcGroup: this.$refs.tree.getCheckedKeys()
      };
      //发送请求更新用户
      authorization(param).then(res => {
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "授权成功！"
          });
          this.$emit("authorizationInfo");
        } else {
          this.$message({
            type: "error",
            message: `添加失败！错误码：${res.status}--错误原因：${res.des}`
          });
        }
      });
    },
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
            this.dialogFormVisible = false;
            this.$emit("quryInfo");
          } else {
            this.$message({
              type: "error",
              message: `添加失败！错误码：${res.status}--错误原因：${res.des}`
            });
          }
        })
    }
  }
};
</script>

<style>
.add1 {
  width: 400px;
}
.customWidth4 {
  width: 300px;
}
</style>
