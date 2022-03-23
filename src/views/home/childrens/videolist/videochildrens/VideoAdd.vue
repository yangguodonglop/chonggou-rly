<template>
  <div id="video-add">
    <el-button type="primary" size="small" @click="dialogFormVisible = true"
      >添加</el-button
    >
    <el-dialog :close-on-click-modal='false' title="添加视频" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="视频名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.videoName"
            autocomplete="off"
            placeholder="请输入视频名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="视频作者" :label-width="formLabelWidth">
          <el-input
            v-model="form.videoAuthor"
            autocomplete="off"
            placeholder="请输入视频作者"
          ></el-input>
        </el-form-item>
        <el-form-item label="视频图片" :label-width="formLabelWidth">
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
        <el-form-item label="视频地址" :label-width="formLabelWidth">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="onSubmit" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "VideoAdd",
  inject: ["reload"],
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      fileList: [],
      param: {},
      form: { videoName: "", videoAuthor: "" }
    };
  },
  created() {
    this.param = new FormData();
  },
  methods: {
    refresh() {
      this.reload();
    },
    handleChange(file, fileList) {
      this.param.append("img", file.raw);
    },
    handleRemove(file, filelist) {
      this.param.delete("img");
    },
    handleChange1(file, fileList) {
      this.param.append("video", file.raw);
    },
    handleRemove1(file, filelist) {
      this.param.delete("video");
    },
    onSubmit() {
      var videoName = this.form.videoName;
      var videoAuthor = this.form.videoAuthor;
      this.param.append("videoname", videoName);
      this.param.append("videoauthor", videoAuthor);
      const instance = this.axios.create({
        withCredentials: true
      });
      instance
        .post("http://localhost:8090/video/insertVideo", this.param)
        .then(res => {
          if (res.data === "success") {
            this.$message({
              message: "添加成功！",
              type: "success"
            });
          } else {
            this.$message.error("添加失败！已存在");
          }
          this.dialogFormVisible = false;
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
