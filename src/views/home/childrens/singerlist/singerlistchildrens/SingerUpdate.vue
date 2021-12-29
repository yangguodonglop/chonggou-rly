<template>
  <div id="singer-update">
    <el-form ref="form" :model="form" label-width="80px" style="width: 600px">
      <el-form-item label="歌手编号">
        <el-input v-model="form.singerid" disabled></el-input>
      </el-form-item>
      <el-form-item label="歌手名称">
        <el-input v-model="form.singername"></el-input>
      </el-form-item>
      <el-form-item label="歌手类型">
        <el-select v-model="singerType.typename" placeholder="请选择歌手类型">
          <el-option
            v-for="(item, index) in singerTypeLists"
            :key="index"
            :label="item.typename"
            :value="item.typename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="歌手所属">
        <el-select v-model="form.address" placeholder="请选择歌手所属">
          <el-option
            v-for="(item, index) in singerAddress"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="歌手热度">
        <el-input v-model="form.singerhot"></el-input>
      </el-form-item>
      <el-form-item label="歌手图片">
        <el-upload
          class="upload-demo"
          :auto-upload="false"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :limit="1"
          action=""
          :headers="headers"
          :file-list="fileList"
          accept=".jpg,.png"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip">
            只能上传1张jpg/png文件，且不超过500kb
          </span>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button type="primary" @click="back">退出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findSingerById, singerTypeList } from "network/home.js";
export default {
  name: "SingerUpdate",
  inject: ["reload"],
  data() {
    return {
      form: {},
      headers: {
        "Content-Type": "multipart/form-data"
      },
      fileList: [],
      param: {},
      sid: this.$route.query.sid,
      singerAddress: ["内地", "港台", "韩国", "日本", "欧美", "其他"],
      singerTypeLists: [],
      singerType: {}
    };
  },
  created() {
    this.findSingerById(this.sid);
    this.singerTypeList();
    this.param = new FormData();
  },
  mounted() {},
  methods: {
    refresh() {
      this.reload();
    },
    back() {
      this.$router.back();
    },
    handleChange(file, fileList) {
      console.log(file);
      this.param.append("img", file.raw);
    },
    handleRemove(file, fileList) {
      this.param.delete("img");
    },
    onSubmit() {
      var singerId = this.form.singerid;
      var singerName = this.form.singername;
      var singerType = this.singerType.typename;
      var singerHot = this.form.singerhot;
      var singerAddress = this.form.address;
      this.param.append("singerid", singerId);
      this.param.append("singername", singerName);
      this.param.append("singertype", singerType);
      this.param.append("singerhot", singerHot);
      this.param.append("singeraddress", singerAddress);
      const instance = this.axios.create({
        withCredentials: true
      });
      instance
        .post("http://localhost:8090/singer/updateSinger", this.param)
        .then(res => {
          // console.log(res);
          if (res.data === "success") {
            this.$message({
              message: "更新成功！",
              type: "success"
            });
            this.refresh();
          } else {
            this.$message.error("更新失败！已存在！");
          }
          this.refresh();
        })
        .catch(() => {
          this.$message.error("请输入完整信息！");
        });
    },
    findSingerById(sid) {
      findSingerById(sid).then(res => {
        // console.log(res);
        this.form = res;
        this.singerType = res.singertype;
      });
    },
    singerTypeList() {
      singerTypeList().then(res => {
        // console.log(res);
        this.singerTypeLists = res;
      });
    }
  }
};
</script>

<style scoped></style>
