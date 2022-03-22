<template>
  <div id="add">
    <el-button type="primary" size="small" @click="dialogFormVisible = true"
      >添加</el-button
    >
    <el-dialog title="添加歌手" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="歌手名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.singerName"
            autocomplete="off"
            placeholder="请输入歌手名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="歌手类型" :label-width="formLabelWidth">
          <el-select v-model="form.singerType" placeholder="请选择歌手类型">
            <el-option
              v-for="(item, index) in singerType"
              :key="index"
              :label="item.typename"
              :value="item.typename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="歌手热度" :label-width="formLabelWidth">
          <el-input
            v-model="form.singerHot"
            autocomplete="off"
            placeholder="请输入歌手热度"
          ></el-input>
        </el-form-item>
        <el-form-item label="歌手所属" :label-width="formLabelWidth">
          <el-select v-model="form.singerAddress" placeholder="请选择歌手类型">
            <el-option
              v-for="(item, index) in singerAddress"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="歌手图片" :label-width="formLabelWidth">
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
  name: "SingerAdd",
  inject: ["reload"],
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        singerName: "",
        singerType: "",
        singerHot: "",
        singerAddress: ""
      },
      headers: {
        "Content-Type": "multipart/form-data"
      },
      fileList: [],
      param: {}
    };
  },
  props: {
    singerType: {
      type: Array,
      default() {
        return [];
      }
    },
    singerAddress: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
    this.param = new FormData();
  },
  methods: {
    refresh() {
      this.reload();
    },
    onSubmit() {
      var singerName = this.form.singerName;
      var singerType = this.form.singerType;
      var singerHot = this.form.singerHot;
      var singerAddress = this.form.singerAddress;
      this.param.append("singername", singerName);
      this.param.append("singertype", singerType);
      this.param.append("singerhot", singerHot);
      this.param.append("singeraddress", singerAddress);
      const instance = this.axios.create({
        withCredentials: true
      });
      instance
        .post("http://localhost:8090/singer/insertSinger", this.param)
        .then(res => {
          // console.log(res);
          if (res.data === "success") {
            this.$message({
              message: "添加成功！",
              type: "success"
            });
          } else {
            this.$message.error("添加失败！已存在！");
          }
          this.dialogFormVisible = false;
          this.refresh();
        })
        .catch(() => {
          this.dialogFormVisible = true;
          this.$message.error("请输入完整信息！");
        });
    },
    handleChange(file, fileList) {
      // console.log(file);
      this.param.append("img", file.raw);
    },
    handleRemove(file, fileList) {
      // console.log(file);
      this.param.delete("img");
    }
  }
};
</script>

<style scoped></style>
