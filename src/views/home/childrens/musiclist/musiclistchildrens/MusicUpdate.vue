<template>
  <div id="music-update">
    <el-form ref="form" :model="form" label-width="80px" style="width: 600px" v-loading="loading"
    element-loading-text="上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form-item label="歌曲编号">
        <el-input v-model="form.musicid" disabled></el-input>
      </el-form-item>
      <el-form-item label="歌曲名称">
        <el-input v-model="form.musicname"></el-input>
      </el-form-item>
      <el-form-item label="歌曲类型">
        <el-select
          v-model="musicType.musictypename"
          placeholder="请选择歌曲类型"
        >
          <el-option
            v-for="(item, index) in musicTypeList"
            :key="index"
            :label="item.musictypename"
            :value="item.musictypename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="歌曲热度">
        <el-input v-model="form.musichot"></el-input>
      </el-form-item>
      <el-form-item label="歌曲歌手">
        <el-input v-model="singer.singername"></el-input>
      </el-form-item>
      <el-form-item label="歌词地址">
        <el-input v-model="form.lyricurl"></el-input>
      </el-form-item>
      <el-form-item label="歌曲图片">
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
      <el-form-item label="歌曲地址">
        <el-upload
          class="upload-demo"
          :auto-upload="false"
          :on-change="handleChange1"
          :on-remove="handleRemove1"
          :limit="1"
          action=""
          :headers="headers"
          :file-list="fileList"
          accept=".mp3"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip">
            只能上传1张mp3文件
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
import { findMusicById, musicTypeList } from "network/home.js";
export default {
  name: "MusicUpdate",
  inject: ["reload"],
  data() {
    return {
      form: {},
      singer: {},
      musicType: {},
      mid: this.$route.query.mid,
      musicTypeList: [],
      headers: {
        "Content-Type": "multipart/form-data"
      },
      fileList: [],
      param: {},
      loading:false
    };
  },
  created() {
    this.param = new FormData();
  },
  mounted() {
    this.getMusiclist(this.mid);
    this.getMusicTypeList(this.mid);
  },
  methods: {
    refresh() {
      this.reload();
    },
    getMusiclist(mid) {
      findMusicById(mid).then(res => {
        console.log(res);
        this.form = res;
        this.singer = res.singer;
        this.musicType = res.musictype;
      });
    },
    getMusicTypeList(mid) {
      musicTypeList(mid).then(res => {
        this.musicTypeList = res;
      });
    },
    //有变化时调用的函数
    handleChange(file, fileList) {
      this.param.append("img", file.raw);
      console.log(this.param.get("img"));
    },
    handleRemove(file, filesList) {
      this.param.delete("file");
    },
    handleChange1(file, fileList) {
      this.param.append("music", file.raw);
      console.log(this.param.get("music"));
    },
    handleRemove1(file, filesList) {
      this.param.delete("music");
    },
    onSubmit() {
      var musicId = this.form.musicid;
      var musicName = this.form.musicname;
      var musicType = this.musicType.musictypename;
      var musicHot = this.form.musichot;
      var musicSinger = this.singer.singername;
      var musicLric = this.form.lyricurl;
      this.param.append("musicid", musicId);
      this.param.append("musicname", musicName);
      this.param.append("musictypename", musicType);
      this.param.append("musichot", musicHot);
      this.param.append("singername", musicSinger);
      this.param.append("lyricurl", musicLric);
      const instance = this.axios.create({
        withCredentials: true
      });
      instance
        .post("http://localhost:8090/music/updateMusic", this.param)
        .then(res => {
          // console.log(res);
          if (res.data === "success") {
            this.$message({
              message: "更新成功！",
              type: "success"
            });
            this.refresh();
          } else {
            this.$message.error("更新失败！已存在歌曲！");
          }
          this.refresh();
        })
        .catch(() => {
          this.$message.error("请输入完整信息！");
        });
    },
    back() {
      this.$confirm("此操作将会退出, 请确认是否保存修改,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.back();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style scoped></style>
