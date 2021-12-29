<template>
  <div id="content">
    <div class="left border"></div>
    <div class="center">
      <div class="cleft">
        <div class="random-music">
          <div class="title">
            <div class="circle"></div>
            <span>每日推荐</span>
            <div class="btn">
              <el-button
                type="text"
                style="color: #777; marginRight: 10px; marginLeft:20px"
                @click="navClick('华语')"
                >华语</el-button
              >
              <div class="shu"></div>
              <el-button
                type="text"
                style="color: #777;marginRight: 10px"
                @click="navClick('流行')"
                >流行</el-button
              >
              <div class="shu"></div>
              <el-button
                type="text"
                style="color: #777;marginRight: 10px"
                @click="navClick('摇滚')"
                >摇滚</el-button
              >
              <div class="shu"></div>
              <el-button
                type="text"
                style="color: #777;marginRight: 10px"
                @click="navClick('电子')"
                >电子</el-button
              >
              <div class="shu"></div>
              <el-button
                type="text"
                style="color: #777"
                @click="navClick('民谣')"
                >民谣</el-button
              >
            </div>
          </div>
          <music-list
            :music-info="musicInfo"
            @play="onlyPlay"
            @click.native="isAction(0)"
          ></music-list>
        </div>
        <!-- <div class="hot-music">
          <div class="title">
            <div class="circle"></div>
            <span>热门推荐</span>
          </div>
          <music-list
            :music-info="musicHotInfo"
            @play="onlyPlay"
            @click.native="isAction(1)"
          ></music-list>
        </div> -->
        <!-- <div class="video">
          <div class="title">
            <div class="circle"></div>
            <span>推荐视频</span>
          </div>
          <el-carousel trigger="click" height="200px" indicator-position="none">
            <el-carousel-item
              v-for="(item, index) in videoList"
              :key="index"
              style="display: flex;justifyContent: space-evenly;alignItems: center"
            >
              <div class="imgs" v-for="(item1, index1) in item" :key="index1">
                <a
                  href="javascript:void(0);"
                  @click="videoClick(item1.videoid)"
                >
                  <img :src="item1.videophoto" alt="" />
                </a>
                <span>{{ item1.videoname }}</span>
                <span style="color: #666">{{ item1.videoauthor }}</span>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div> -->
      </div>
      <div class="cright">
        <div class="music-rank">
          <div class="title">
            <img
              src="../../../../../assets/音乐排行榜.png"
              alt=""
              style="width: 20px;height : 20px;marginRight:10px;"
            />
            <h4>音乐排行榜</h4>
          </div>
          <rank :info="musicHotInfo" @play="onlyPlay"></rank>
        </div>
        <div class="singer-rank">
          <div class="title">
            <img
              src="../../../../../assets/音乐排行榜.png"
              alt=""
              style="width: 20px;height : 20px;marginRight:10px;"
            />
            <h4>歌手排行榜</h4>
          </div>
          <s-rank :info="singerHotInfo"></s-rank>
        </div>
      </div>
    </div>
    <div class="right border"></div>
    <el-backtop :bottom="100" :visibility-height="topHeight" :right="topRight">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #eee;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #333;
      }"
      >
        <i class="el-icon-top"></i>
      </div>
    </el-backtop>
    <!-- <div class="wrap">
      <div class="btn">
        <a class="prev" ref="prev" href="javascript:void(0)" @click="prev()">
          <img src="../../../../../assets/上一首.png" alt="" />
        </a>
        <a class="play" ref="play" href="javascript:void(0)" @click="play()">
          <img src="../../../../../assets/播放.png" alt="" />
        </a>
        <a class="stop" ref="stop" href="javascript:void(0)" @click="play()">
          <img src="../../../../../assets/暂停.png" alt=""
        /></a>
        <a class="next" ref="next" href="javascript:void(0)" @click="next()">
          <img src="../../../../../assets/下一首.png" alt="" />
        </a>
      </div>
      <div class="sing-img">
        <img
          ref="mimg"
          :src="musicPhotoUrl"
          alt=""
          style="display: none;width: 100%;height: 35px;margin: 0px 15px 0px 0px;"
        />
      </div>
      <div class="plays">
        <div class="info">
          <span>{{ music.musicname }}</span>
          <span>{{ singerName }}</span>
        </div>
        <div class="play-bar">
          <div class="grey" ref="grey">
            <div class="red" ref="red">
              <div class="circle" ref="circle"></div>
            </div>
          </div>
          <div class="time">{{ musicCurrentTime + " / " + musicTime }}</div>
          <div class="sound">
            <a href="javascript:void(0)" @click="sound"
              ><img
                src="../../../../../assets/声音放大.png"
                alt=""
                style="width:20px;height:20px;"
            /></a>
            <div class="sound-bar" ref="sound">
              <el-slider
                v-model="value"
                vertical
                height="100px"
                class="slider"
                ref="slider"
                @input="volumeInput"
              >
              </el-slider>
            </div>
          </div>
          <div class="reload">
            <a href="javascript:void(0)" @click="reload"
              ><img
                src="../../../../../assets/重放.png"
                alt=""
                style="width: 20px; height: 20px;"
            /></a>
          </div>
        </div>
      </div>
      <audio id="audio" ref="audio" src="" style="marginLeft:100px"></audio>
    </div> -->
  </div>
</template>

<script>
import {
  randomMusic,
  findMusicByType,
  findMusicOrderByHot,
  randomVideo,
  findSingerOrderByHot
} from "network/uhome.js";
import MusicList from "components/common/musics/MusicList";
import Rank from "components/common/rank/Rank";
import SRank from "components/common/rank/SRank";
export default {
  name: "Contents",
  data() {
    return {
      // 随机音乐
      musicInfo: [],
      // 根据热度排行的音乐
      musicHotInfo: [],
      // 随机视频
      videoList: [],
      // 第一页的随机视频
      videoList1: [],
      // 第二页随机视频
      videoList2: [],
      // 根据热度排行的歌手
      singerHotInfo: [],
      // 回到顶部的高
      topHeight: 260,
      // 回到顶部的右偏移
      topRight: 110,
      // 判断是否播放
      isPlay: false,
      // 要播放的音乐url
      saveMusicUrl: "",
      // 暂停前播放的时间
      currentTime: 0,
      // 存放音乐url的数组
      musicUrls: [],
      // 当前播放的音乐图片url
      musicPhotoUrl: "",
      // 判断是随机还是热度音乐的播放
      action: -1,
      // 当前播放的音乐的信息
      music: {},
      // 当前播放音乐的歌手信息
      singerName: "",
      // 当前播放音乐的总时间
      musicTime: "0:00",
      // 当前播放的音乐时间
      musicCurrentTime: "0:00",
      // 时间步长
      step: 0,
      // 定时器
      time: "",
      // 滑块的值默认100
      value: 100,
      // 是否显示声音条
      isShow: false,
      playWidth: 0
    };
  },
  components: {
    MusicList,
    Rank,
    SRank
  },
  mounted() {
    this.randomMusic();
    this.findMusicOrderByHot();
    this.randomVideo();
    this.findSingerOrderByHot();
  },
  methods: {
    randomMusic() {
      randomMusic().then(res => {
        // console.log(res);
        res.forEach(data => {
          data.musicphotourl =
            "http://localhost:8090/musicstatic/" + data.musicphotourl;
        });
        this.musicInfo = res;
      });
    },
    navClick(type) {
      switch (type) {
        case "华语":
          this.findMusicByType(type);
          break;
        case "流行":
          this.findMusicByType(type);
          break;
        case "摇滚":
          this.findMusicByType(type);
          break;
        case "电子":
          this.findMusicByType(type);
          break;
        case "民谣":
          this.findMusicByType(type);
          break;
      }
    },
    findMusicByType(type) {
      findMusicByType(type).then(res => {
        res.forEach(data => {
          data.musicphotourl =
            "http://localhost:8090/musicstatic/" + data.musicphotourl;
        });
        this.musicInfo = res;
      });
    },
    findMusicOrderByHot() {
      findMusicOrderByHot().then(res => {
        // console.log(res);
        res.forEach(data => {
          data.musicphotourl =
            "http://localhost:8090/musicstatic/" + data.musicphotourl;
        });
        this.musicHotInfo = res;
      });
    },
    randomVideo() {
      randomVideo().then(res => {
        // console.log(res);
        res.forEach(data => {
          data.videophoto =
            "http://localhost:8090/musicstatic/" + data.videophoto;
        });
        for (let i = 0; i < 5; i++) {
          this.videoList1.push(res[i]);
        }
        this.videoList.push(this.videoList1);
        for (let i = 4; i < 9; i++) {
          this.videoList2.push(res[i]);
        }
        this.videoList.push(this.videoList2);
      });
    },
    findSingerOrderByHot() {
      findSingerOrderByHot().then(res => {
        // console.log(res);
        this.singerHotInfo = res;
      });
    },
    getUrl(videoid) {
      return "/video?vid=" + videoid;
    },
    play() {
      // console.log(data);
      // console.log(this.playWidth);
      if (this.$refs.audio.src !== "http://localhost:8080/find") {
        let ctime;
        // 灰条
        var grey = document.getElementsByClassName("grey")[0];
        // 红条
        var red = document.getElementsByClassName("red")[0];
        // 灰条的宽度
        var greyWidth = grey.clientWidth;
        // 获取圆圈的class
        var circle = document.getElementsByClassName("circle")[3];
        // 底部栏的播放
        if (!this.isPlay) {
          // 如果当前的播放时间为0 则给url赋值 否则会重新赋值 音乐从头开始
          // if (this.currentTime === 0) {
          //   let url = "http://localhost:8090/musicstatic/" + data;
          //   this.$refs.audio.src = url;
          // }
          this.$refs.audio.play();
          setTimeout(() => {
            ctime = this.$refs.audio.duration;
            this.musicTime = this.getDuration(ctime);
          }, 200);
          this.time = setInterval(() => {
            // console.log(this.musicCurrentTime);
            // 当前播放时间与完整时间相等就结束
            if (this.$refs.audio.ended || parseInt(ctime) === this.step) {
              clearInterval(this.time);
              this.next();
            }
            // 记录时间步长 在点击播放后继续开始
            this.musicCurrentTime = this.getMusicCurrentTime(this.step);
            this.step++;
            // 计算宽度 总长除以时间
            this.playWidth += greyWidth / ctime;
            // 设置红条的宽度
            red.style.width = this.playWidth + "px";
            // 设置圆圈的左偏移量
            circle.style.left = this.playWidth - 15 + "px";
          }, 1000);
          this.$refs.play.style.display = "none";
          this.$refs.stop.style.display = "inline";
          this.isPlay = true;
        } else {
          this.$refs.audio.pause();
          // 记录暂停后当前的播放时间
          this.currentTime = this.$refs.audio.currentTime;
          this.$refs.stop.style.display = "none";
          this.$refs.play.style.display = "inline";
          // 点击暂停后 清除定时器
          clearInterval(this.time);
          this.isPlay = false;
        }
      }
    },
    onlyPlay(data) {
      // console.log(data);
      // 每点击新的一首歌清除定时器
      clearInterval(this.time);
      // 歌曲的完整时间
      let ctime;
      // 灰条
      var grey = document.getElementsByClassName("grey")[0];
      // 红条
      var red = document.getElementsByClassName("red")[0];
      // 灰条的宽度
      var greyWidth = grey.clientWidth;
      // 初始宽度
      var width = 0;
      // 获取圆圈的class
      var circle = document.getElementsByClassName("circle")[3];
      red.style.width = width + "px";
      // 设置圆圈的左偏移量
      circle.style.left = width - 15 + "px";
      // clearInterval(this.time);
      this.musicCurrentTime = "0:00";
      this.step = 1;
      // 图片上的播放与底部播放栏的播放分开
      // 如果当前的播放时间为0 则给url赋值
      let url = "http://localhost:8090/musicstatic/" + data.songurl;
      this.$refs.audio.src = url;
      this.$refs.audio.play();
      setTimeout(() => {
        ctime = this.$refs.audio.duration;
        this.musicTime = this.getDuration(ctime);
      }, 200);
      this.time = setInterval(() => {
        // 当前播放时间与完整时间相等就结束
        if (parseInt(ctime) === this.step) {
          clearInterval(this.time);
          this.next();
        }
        // 计算当前播放时间
        this.musicCurrentTime = this.getMusicCurrentTime(this.step);
        this.step++;
        // 计算宽度 总长除以时间
        width += greyWidth / ctime;
        this.playWidth = width;
        // 设置红条的宽度
        red.style.width = width + "px";
        // 设置圆圈的左偏移量
        circle.style.left = width - 15 + "px";
      }, 1000);
      // 使播放消失 暂停出现
      this.$refs.play.style.display = "none";
      this.$refs.stop.style.display = "inline";
      this.$refs.mimg.style.display = "inline";
      // 保存播放的歌曲url
      this.music = data;
      this.singerName = data.singer.singername;
      this.saveMusicUrl = data.songurl;
      this.musicPhotoUrl = data.musicphotourl;
      this.isPlay = true;
    },
    prev() {
      var index = -1;
      clearInterval(this.time);
      this.musicCurrentTime = "0:00";
      this.step = 1;
      let ctime;
      // 灰条
      var grey = document.getElementsByClassName("grey")[0];
      // 红条
      var red = document.getElementsByClassName("red")[0];
      // 灰条的宽度
      var greyWidth = grey.clientWidth;
      // 初始宽度
      var width = 0;
      // 获取圆圈的class
      var circle = document.getElementsByClassName("circle")[3];
      red.style.width = width + "px";
      // 设置圆圈的左偏移量
      circle.style.left = width - 15 + "px";
      // 将获取的随机音乐的url全部存入一个数组里
      // 并且判断是否和目标url相等，相等则保存index
      if (this.action === 0) {
        for (var i = 0; i < this.musicInfo.length; i++) {
          this.musicUrls.push(this.musicInfo[i].songurl);
          if (this.saveMusicUrl === this.musicInfo[i].songurl) {
            index = i;
          }
        }
        // 从最后开始
        if (index === 0) {
          index = this.musicInfo.length;
        }
        this.music = this.musicInfo[index - 1];
        // 给src赋值前一条音乐的url 并且播放
        this.saveMusicUrl = this.musicInfo[index - 1].songurl;
        this.musicPhotoUrl = this.musicInfo[index - 1].musicphotourl;
        this.$refs.audio.src =
          "http://localhost:8090/musicstatic/" + this.musicUrls[index - 1];
        this.$refs.audio.play();
        setTimeout(() => {
          ctime = this.$refs.audio.duration;
          this.musicTime = this.getDuration(ctime);
        }, 200);
        this.time = setInterval(() => {
          // 当前播放时间与完整时间相等就结束
          if (this.$refs.audio.ended || parseInt(ctime) === this.step) {
            clearInterval(this.time);
          }
          // 计算当前播放时间
          this.musicCurrentTime = this.getMusicCurrentTime(this.step);
          this.step++;
          // 计算宽度 总长除以时间
          width += greyWidth / ctime;
          // 设置红条的宽度
          red.style.width = width + "px";
          // 设置圆圈的左偏移量
          circle.style.left = width - 15 + "px";
        }, 1000);
        // 重置数组，否则长度会增加
        this.musicUrls = [];
      } else {
        for (var i = 0; i < this.musicHotInfo.length; i++) {
          this.musicUrls.push(this.musicHotInfo[i].songurl);
          if (this.saveMusicUrl === this.musicHotInfo[i].songurl) {
            index = i;
          }
        }
        // 从最后开始
        if (index === 0) {
          index = this.musicHotInfo.length;
        }
        this.music = this.musicHotInfo[index - 1];
        // 给src赋值前一条音乐的url 并且播放
        this.saveMusicUrl = this.musicHotInfo[index - 1].songurl;
        this.musicPhotoUrl = this.musicHotInfo[index - 1].musicphotourl;
        this.$refs.audio.src =
          "http://localhost:8090/musicstatic/" + this.musicUrls[index - 1];
        this.$refs.audio.play();
        setTimeout(() => {
          ctime = this.$refs.audio.duration;
          this.musicTime = this.getDuration(ctime);
        }, 200);
        this.time = setInterval(() => {
          // 当前播放时间与完整时间相等就结束
          if (this.$refs.audio.ended || parseInt(ctime) === this.step) {
            clearInterval(this.time);
          }
          // 计算当前播放时间
          this.musicCurrentTime = this.getMusicCurrentTime(this.step);
          this.step++;
          // 计算宽度 总长除以时间
          width += greyWidth / ctime;
          // 设置红条的宽度
          red.style.width = width + "px";
          // 设置圆圈的左偏移量
          circle.style.left = width - 15 + "px";
        }, 1000);
        // 重置数组，否则长度会增加
        this.musicUrls = [];
      }
    },
    next() {
      var index = -2;
      clearInterval(this.time);
      this.step = 1;
      let ctime;
      // 灰条
      var grey = document.getElementsByClassName("grey")[0];
      // 红条
      var red = document.getElementsByClassName("red")[0];
      // 灰条的宽度
      var greyWidth = grey.clientWidth;
      // 初始宽度
      var width = 0;
      // 获取圆圈的class
      var circle = document.getElementsByClassName("circle")[3];
      red.style.width = width + "px";
      // 设置圆圈的左偏移量
      circle.style.left = width - 15 + "px";
      // 将获取的随机音乐的url全部存入一个数组里
      // 并且判断是否和目标url相等，相等则保存index
      if (this.action == 0) {
        for (var i = 0; i < this.musicInfo.length; i++) {
          this.musicUrls.push(this.musicInfo[i].songurl);
          if (this.saveMusicUrl === this.musicInfo[i].songurl) {
            index = i;
          }
        }
        // 从前面开始
        if (index === this.musicInfo.length - 1) {
          index = -1;
        }
        this.music = this.musicInfo[index + 1];
        // 给src赋值前一条音乐的url 并且播放
        this.saveMusicUrl = this.musicInfo[index + 1].songurl;
        this.musicPhotoUrl = this.musicInfo[index + 1].musicphotourl;
        this.$refs.audio.src =
          "http://localhost:8090/musicstatic/" + this.musicUrls[index + 1];
        this.musicCurrentTime = "0:00";
        setTimeout(() => {
          this.$refs.audio.play();
          ctime = this.$refs.audio.duration;
          this.musicTime = this.getDuration(ctime);
        }, 200);
        this.time = setInterval(() => {
          // 当前播放时间与完整时间相等就结束
          if (this.$refs.audio.ended || parseInt(ctime) === this.step) {
            clearInterval(this.time);
            this.next();
          }
          // 计算当前播放时间
          this.musicCurrentTime = this.getMusicCurrentTime(this.step);
          this.step++;
          // 计算宽度 总长除以时间
          width += greyWidth / ctime;
          // 设置红条的宽度
          red.style.width = width + "px";
          // 设置圆圈的左偏移量
          circle.style.left = width - 15 + "px";
        }, 1000);
        // 重置数组，否则长度会增加
        this.musicUrls = [];
      } else {
        for (var i = 0; i < this.musicHotInfo.length; i++) {
          this.musicUrls.push(this.musicHotInfo[i].songurl);
          if (this.saveMusicUrl === this.musicHotInfo[i].songurl) {
            index = i;
          }
        }
        // 从前面开始
        if (index === this.musicHotInfo.length - 1) {
          index = -1;
        }
        this.music = this.musicHotInfo[index + 1];
        // 给src赋值前一条音乐的url 并且播放
        this.saveMusicUrl = this.musicHotInfo[index + 1].songurl;
        this.musicPhotoUrl = this.musicHotInfo[index + 1].musicphotourl;
        this.$refs.audio.src =
          "http://localhost:8090/musicstatic/" + this.musicUrls[index + 1];
        this.$refs.audio.play();
        setTimeout(() => {
          ctime = this.$refs.audio.duration;
          this.musicTime = this.getDuration(ctime);
        }, 200);
        this.time = setInterval(() => {
          // 当前播放时间与完整时间相等就结束
          if (this.$refs.audio.ended || parseInt(ctime) === this.step) {
            clearInterval(this.time);
          }
          // 计算当前播放时间
          this.musicCurrentTime = this.getMusicCurrentTime(this.step);
          this.step++;
          // 计算宽度 总长除以时间
          width += greyWidth / ctime;
          // 设置红条的宽度
          red.style.width = width + "px";
          // 设置圆圈的左偏移量
          circle.style.left = width - 15 + "px";
        }, 1000);
        // 重置数组，否则长度会增加
        this.musicUrls = [];
      }
    },
    isAction(param) {
      // 给组件绑定原生事件，否则无法生效
      if (param === 0) {
        this.action = 0;
      } else {
        this.action = 1;
      }
    },
    getDuration(data) {
      // 将时间秒转换为0:00格式
      if (data > 60) {
        var minuter = data / 60;
        var second = data % 60;
      }
      if (second >= 10) {
        data = parseInt(minuter) + ":" + parseInt(second);
      } else {
        data = parseInt(minuter) + ":0" + parseInt(second);
      }
      return data;
    },
    getMusicCurrentTime(data) {
      // 将当前播放时间转换为0:00格式
      var minuter = data / 60;
      var second = data % 60;
      if (second >= 10) {
        data = parseInt(minuter) + ":" + parseInt(second);
      } else {
        data = parseInt(minuter) + ":0" + parseInt(second);
      }
      return data;
    },
    sound() {
      if (!this.isShow) {
        this.$refs.sound.style.display = "block";
        this.isShow = true;
      } else {
        this.$refs.sound.style.display = "none";
        this.isShow = false;
      }
    },
    volumeInput() {
      // 滑块的数据改变时触发（使用鼠标拖曳时，活动过程实时触发）
      this.$refs.audio.volume = this.value / 100;
    },
    reload() {
      clearInterval(this.time);
      this.musicCurrentTime = "0:00";
      this.step = 1;
      let ctime;
      // 灰条
      var grey = document.getElementsByClassName("grey")[0];
      // 红条
      var red = document.getElementsByClassName("red")[0];
      // 灰条的宽度
      var greyWidth = grey.clientWidth;
      // 初始宽度
      var width = 0;
      // 获取圆圈的class
      var circle = document.getElementsByClassName("circle")[3];
      this.$refs.audio.load();
      this.$refs.audio.play();

      setTimeout(() => {
        ctime = this.$refs.audio.duration;
        this.musicTime = this.getDuration(ctime);
      }, 200);
      this.time = setInterval(() => {
        // console.log(this.musicCurrentTime);
        // 当前播放时间与完整时间相等就结束
        if (this.$refs.audio.ended || parseInt(ctime) === this.step) {
          clearInterval(this.time);
          this.next();
        }
        // 记录时间步长 在点击播放后继续开始
        this.musicCurrentTime = this.getMusicCurrentTime(this.step);
        this.step++;
        // 计算宽度 总长除以时间
        width += greyWidth / ctime;
        // 设置红条的宽度
        red.style.width = width + "px";
        // 设置圆圈的左偏移量
        circle.style.left = width - 15 + "px";
      }, 1000);
    },
    videoClick(vid) {
      this.$router.push({
        path: "/video",
        query: {
          vid
        }
      });
    }
  }
};
</script>

<style>
#content {
  display: flex;
}

#content .center {
  display: flex;
  width: 928px;
  margin: 0 auto;
}

#content .center .cleft {
  display: flex;
  flex-direction: column;
  width: 700px;
  padding: 20px 20px 30px 20px;
  border-bottom: 1px solid #999;
  border-right: 1px solid #999;
}

#content .center .cright {
  display: flex;
  flex-direction: column;
  padding: 20px 10px 30px 10px;
  width: 200px;
  border-bottom: 1px solid #999;
}

#content .border {
  flex: 1;
  background-color: #eeeeee;
  height: 1325px;
  border-bottom: 1px solid #999;
}

#content .left {
  border-right: 1px solid #999;
}

#content .right {
  border-left: 1px solid #999;
}

#content .circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 5px solid #f00;
  margin: 10px 10px;
}

#content .random-music {
  display: flex;
  flex-direction: column;
  height: 479px;
  margin-bottom: 20px;
}

#content .random-music .title {
  display: flex;
  height: 33px;
  align-items: center;
  padding: 0 10px 0 34px;
  border-bottom: 2px solid #c10d0c;
}

#content .random-music .title span {
  font-size: 20px;
}

#content .random-music .title .btn span {
  font-size: 12px;
  margin-bottom: 4px;
}

#content .shu {
  width: 0;
  height: 15px;
  border-left: 1px solid #787878;
  margin-right: 10px;
}

#content .btn {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 10px;
  margin-right: 10px;
}

#content .hot-music {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  height: 479px;
}

#content .hot-music .title {
  display: flex;
  height: 33px;
  align-items: center;
  padding: 0 10px 0 34px;
  border-bottom: 2px solid #c10d0c;
}

#content .hot-music .title span {
  font-size: 20px;
  margin-bottom: 4px;
}

#content .video {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  height: 257px;
}

#content .video .title {
  display: flex;
  height: 33px;
  align-items: center;
  padding: 0 10px 0 34px;
  border-bottom: 2px solid #c10d0c;
  margin-bottom: 20px;
}

#content .video .title span {
  font-size: 20px;
  margin-bottom: 4px;
}

#content .el-carousel__item {
  background-color: #f5f5f5;
}

#content .video .imgs {
  display: flex;
  flex-direction: column;
}

#content .video img {
  width: 100px;
  height: 100px;
}

#content .video .imgs span {
  width: 100px;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

#content .el-carousel--horizontal {
  overflow: hidden;
  border: 1px solid #d5d5d5;
}

#content .music-rank .title {
  display: flex;
  height: 33px;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

#content .singer-rank .title {
  display: flex;
  height: 33px;
  align-items: center;
  margin-top: 42px;
  border-bottom: 1px solid #ccc;
}

#content .wrap {
  display: flex;
  position: fixed;
  width: 980px;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 0;
  z-index: 3;
}

#content audio {
  height: 43px;
}

#content .wrap .btn .prev,
#content .wrap .btn .next {
  display: inline-block;
  width: 24px;
  height: 24px;
}

#content .wrap .btn .stop {
  display: none;
  margin-left: 10px;
  margin-right: 10px;
}

#content .wrap .btn .play {
  margin-left: 10px;
  margin-right: 10px;
}

#content .wrap .btn .play img {
  display: inline-block;
  width: 34px;
  height: 34px;
}

#content .wrap .btn .stop img {
  display: inline-block;
  width: 34px;
  height: 34px;
}

#content .wrap .btn a img {
  width: 24px;
  height: 24px;
}

#content .wrap .sing-img {
  width: 35px;
  height: 35px;
  margin: 0px 15px 0px 0px;
}

#content .wrap .plays {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 466px;
}

#content .wrap .plays .info {
  position: relative;
  top: -5px;
  height: 17px;
  padding-bottom: 5px;
}

#content .wrap .plays span:nth-child(1) {
  color: #fff;
  font-size: 12px;
  margin-right: 20px;
}

#content .wrap .plays span:nth-child(2) {
  color: #888;
  font-size: 12px;
  margin-right: 20px;
}

#content .wrap .plays .play-bar {
  display: flex;
  align-items: center;
}

#content .wrap .plays .play-bar .grey {
  position: relative;
  width: 100%;
  height: 9px;
  border-radius: 30px;
  background-color: #777;
  margin-right: 10px;
}

#content .wrap .plays .play-bar .red {
  position: absolute;
  width: 0px;
  top: 0px;
  height: 9px;
  border-radius: 30px;
  background-color: #f00;
}

#content .wrap .plays .play-bar .time {
  position: absolute;
  right: -60px;
  top: 17px;
  height: 14px;
  font-size: 12px;
  color: #777;
}

#content .wrap .plays .play-bar .sound {
  position: absolute;
  top: 14px;
  right: -100px;
  width: 24px;
  height: 24px;
  text-align: center;
}

#content .wrap .plays .play-bar .sound .sound-bar {
  display: none;
  position: relative;
  top: -170px;
  text-align: center;
  background-color: #333;
  padding: 15px 0 10px 0;
}

#content .wrap .plays .play-bar .reload {
  position: absolute;
  top: 15px;
  right: -130px;
  width: 24px;
  height: 24px;
}

#content .wrap .plays .play-bar .circle {
  position: absolute;
  top: -13px;
  left: -15px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 5px solid #fff;
  background-color: #f00;
}

#content .el-slider__button {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #f00;
  border: 3px solid #fff;
}

#content .el-slider__bar {
  background-color: #f00;
}

#content .el-slider.is-vertical {
  position: relative;
  left: -7px;
}
</style>
