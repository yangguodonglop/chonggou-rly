<template>
  <div id="video">
    <div class="subnav"></div>
    <div class="content">
      <div class="left border"></div>
      <div class="center">
        <div class="cleft">
          <div class="title">
            <h2>{{ videoInfo.videoname }}</h2>
          </div>
          <div class="video">
            <video :src="videoInfo.videourl" controls></video>
          </div>
          <div class="recomment">
            <div class="title">
              <span>评论</span
              ><span class="recomment-count"
                >共{{ comments.length }}条评论</span
              >
            </div>
            <div class="write">
              <div class="left">
                <img src="../../../../assets/recomment-user.jpg" alt="" />
              </div>
              <div class="right">
                <el-form :model="form" :rules="rules" ref="form">
                  <el-form-item prop="desc">
                    <el-input
                      type="textarea"
                      v-model="form.desc"
                      size="medium"
                      resize="none"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submit()" size="mini"
                      >评论</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="comment">
              <div class="title">
                <span>最新评论</span>
              </div>
              <div
                class="comment-info"
                v-for="(item, index) in pageComments"
                :key="index"
              >
                <div class="user-img">
                  <img src="../../../../assets/recomment-user.jpg" alt="" />
                </div>
                <div class="user-info">
                  <span class="user-name">{{ item.user.userName }}</span>
                  <span class="user-message">：{{ item.messagecomment }}</span>
                  <div class="user-time">{{ item.messagetime }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              layout="total, prev, pager, next, jumper"
              background
              :total="comments.length"
              style="textAlign: center"
              @prev-click="prevClick"
              @next-click="nextClick"
            >
            </el-pagination>
          </div>
        </div>
        <div class="cright">
          <div class="title">
            <span>视频简介</span>
          </div>
          <div class="video-info">
            <div class="video-author">
              <span>视频作者：{{ videoInfo.videoauthor }}</span>
            </div>
            <div class="video-time">
              <span>发布时间：{{ videoInfo.videotime }}</span>
            </div>
          </div>
          <div class="video-recomment">
            <div class="title">
              <span>相关推荐</span>
            </div>
            <div class="recomment-info" v-for="(item, index) in videoInfos">
              <div class="img">
                <img :src="item.videophoto" alt="" />
              </div>
              <div class="info">
                <a href="javascript:void(0);" @click="itemClick(item.videoid)">
                  <p class="name">{{ item.videoname }}</p></a
                >
                <p class="author">{{ item.videoauthor }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right border"></div>
    </div>
  </div>
</template>

<script>
import { findVideoById } from "network/home.js";
import {
  randomVideo,
  findMessageByVid,
  insertMessage,
  findUserByName
} from "network/uhome.js";
import fmtDate from "common/js/Date.js";
export default {
  name: "Video",
  inject: ["reload"],
  data() {
    return {
      videoInfo: {},
      videoInfos: [],
      userInfo: {},
      form: {
        desc: ""
      },
      rules: {
        desc: [
          { required: true, message: "请输入评论", trigger: "blur" },
          {
            min: 3,
            max: 140,
            message: "长度在 3 到 140 个字符",
            trigger: "blur"
          }
        ]
      },
      comments: [],
      pageComments: [],
      total: 0,
      //当前页数
      currentPage: 1,
      //1页10个数据
      pagesize: 10
    };
  },
  mounted() {
    this.findVideoById(this.$route.query.vid);
    this.randomVideo();
    this.findMessageByVid(this.$route.query.vid);
    this.findUserByName(this.$store.state.saveUserName);
  },
  methods: {
    findVideoById(vid) {
      findVideoById(vid).then(res => {
        // console.log(res);
        res.videourl = "http://localhost:8090/musicstatic/" + res.videourl;
        res.videotime = this.dateFmt(res.videotime);
        this.videoInfo = res;
      });
    },
    randomVideo() {
      randomVideo().then(res => {
        // console.log(res);
        res.forEach(data => {
          data.videophoto =
            "http://localhost:8090/musicstatic/" + data.videophoto;
        });
        this.videoInfos = res;
      });
    },
    findMessageByVid(vid) {
      findMessageByVid(vid).then(res => {
        console.log(res);
        res.forEach(data => {
          data.messagetime = this.dateFmt(data.messagetime);
        });
        this.comments = res;
        //按照时间降序排
        this.comments.sort((a, b) => {
          let aTime = new Date(a.messagetime).getTime();
          let bTime = new Date(b.messagetime).getTime();
          return bTime - aTime;
        });
        // 只展示10条数据
        this.pageComments = this.comments.slice(
          (this.currentPage - 1) * this.pagesize,
          this.currentPage * this.pagesize
        );
      });
    },
    findUserByName(username) {
      findUserByName(username).then(res => {
        this.userInfo = res;
      });
    },
    dateFmt(date) {
      let d = new Date(date);
      return fmtDate(d, "yyyy-MM-dd");
    },
    itemClick(vid) {
      this.$router.push({
        path: "/video",
        query: {
          vid
        }
      });
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (this.$store.state.saveUserName) {
          if (valid) {
            insertMessage(
              this.form.desc,
              this.videoInfo.videoid,
              this.userInfo.uid
            ).then(res => {
              console.log(res);
              if (res === "success") {
                this.$message({
                  type: "success",
                  message: "评论成功！"
                });
              }
              this.refresh();
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        } else {
          this.$message.error("请先登录！");
        }
      });
    },
    //点击之后的当前页数
    handleCurrentChange(val) {
      // 当前页数
      this.currentPage = val;
      // slice会改变原数组，故将其赋值给一个新数组从而展示这个新数组的数据
      this.pageComments = this.comments.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    refresh() {
      this.reload();
    },
    prevClick() {
      window.scrollTo(40, 400);
    },
    nextClick() {
      window.scrollTo(40, 400);
    }
  }
};
</script>

<style>
#video .subnav {
  background-color: #c20c0c;
  border-bottom: 5px solid #a40011;
}

#video .content {
  display: flex;
}

#video .border {
  flex: 1;
  background-color: #eeeeee;
  height: 1720px;
  border-bottom: 1px solid #999;
}

#video .center {
  display: flex;
  height: 1720px;
  width: 928px;
}

#video .center .cleft {
  display: flex;
  flex-direction: column;
  width: 728px;
  height: 1633px;
  margin: 0 auto;
  border-bottom: 1px solid #999;
  padding: 47px 30px 40px 39px;
  border-right: 1px solid #999;
}

#video .center .cleft .title h2 {
  font-weight: normal;
}

#video .center .cleft .video video {
  width: 640px;
  height: 360px;
}

#video .center .cleft .video {
  margin-bottom: 45px;
}

#video .center .cleft .recomment {
  margin-bottom: 20px;
}

#video .center .cleft .recomment .write {
  display: flex;
  margin-top: 20px;
}

#video .center .cleft .recomment .write img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

#video .center .cleft .recomment .title {
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 2px solid #a40011;
}

#video .center .cleft .recomment .title span {
  font-size: 20px;
  margin-right: 20px;
}

#video .center .cleft .recomment .title .recomment-count {
  font-size: 12px;
  color: #999;
}

#video .center .cleft .comment-info {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px dotted #ccc;
}

#video .center .cleft .comment-info .user-info .user-name {
  color: #0c73c2;
  font-size: 12px;
}

#video .center .cleft .comment-info .user-info .user-message {
  font-size: 12px;
  color: #333;
}

#video .center .cleft .comment-info .user-info .user-time {
  font-size: 12px;
  margin-top: 10px;
  color: #999;
}

#video .center .cleft .comment img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

#video .center .cright {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 1680px;
  border-bottom: 1px solid #999;
  padding: 20px 20px 20px 20px;
}

#video .center .cright .title {
  color: #333;
  font-size: 12px;
  font-weight: bold;
  padding: 0 0 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
}

#video .center .cright .video-info {
  margin-bottom: 20px;
  padding: 0 0 10px 0;
}

#video .center .cright .video-info span {
  font-size: 12px;
  color: #999;
}

#video .center .cright .video-recomment .recomment-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

#video .center .cright .video-recomment .recomment-info .info {
  width: 100px;
}

#video .center .cright .video-recomment .recomment-info .info a {
  text-decoration: none;
  color: #333;
}

#video .center .cright .video-recomment .recomment-info .info a:hover {
  text-decoration: underline;
}

#video .center .cright .video-recomment .recomment-info .info .name {
  color: #333;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#video .center .cright .video-recomment .recomment-info .info .author {
  color: #999;
  font-size: 12px;
}

#video .center .cright .video-recomment img {
  margin-right: 10px;
  width: 80px;
  height: 50px;
}

#video .el-form {
  width: 580px;
}

#video .recomment button {
  float: right;
}

#video .el-form-item {
  margin-bottom: 10px;
}

#video .block {
  margin-top: 15px;
}
</style>
