<template>
  <div id="video-updae">
    <el-form ref="form" :model="form" label-width="80px" style="width: 600px">
      <el-form-item label="视频编号">
        <el-input v-model="form.videoid" disabled></el-input>
      </el-form-item>
      <el-form-item label="视频名称">
        <el-input v-model="form.videoname"></el-input>
      </el-form-item>
      <el-form-item label="视频作者">
        <el-input v-model="form.videoauthor"></el-input>
      </el-form-item>
      <el-form-item label="视频图片">
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
      <el-form-item label="视频地址">
        <el-upload
          class="upload-demo"
          :auto-upload="false"
          :on-change="handleChange1"
          :on-remove="handleRemove1"
          :limit="1"
          action=""
          :headers="headers"
          :file-list="fileList"
          accept=".m4v"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip">
            只能上传1个m4v文件
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
import { findVideoById } from "network/home.js";
export default {
  name: "VideoUpdate",
  inject: ["reload"],
  data() {
    return {
      form: {},
      headers: {
        "Content-Type": "multipart/form-data"
      },
      fileList: [],
      param: {}
    };
  },
  created() {
    this.findVideoById(this.$route.query.vid);
    this.param = new FormData();
  },
  methods: {
    findVideoById(vid) {
      findVideoById(vid).then(res => {
        console.log(res);
        this.form = res;
      });
    },
    refresh() {
      this.reload();
    },
    back() {
      this.$router.back();
    },
    handleChange(file, fileList) {
      this.param.append("img", file.raw);
    },
    handleRemove(file, fileList) {
      this.param.delete("img");
    },
    handleChange1(file, fileList) {
      this.param.append("video", file.raw);
    },
    handleRemove1(file, fileList) {
      this.param.delete("video");
    },
    onSubmit() {
      var videoId = this.form.videoid;
      var videoName = this.form.videoname;
      var videoAuthor = this.form.videoauthor;
      this.param.append("videoid", videoId);
      this.param.append("videoname", videoName);
      this.param.append("videoauthor", videoAuthor);
      const instance = this.axios.create({
        withCredentials: true
      });
      instance
        .post("http://localhost:8090/video/updateVideo", this.param)
        .then(res => {
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
          this.dialogFormVisible = true;
          this.$message.error("请输入完整信息！");
        });
    }
  }
};
</script>

<style scoped></style>
