<template>
  <div id="singer">
    <div class="subnav"></div>
    <div class="content">
      <div class="left border"></div>
      <div class="center">
        <div class="cleft">
          <h3>{{ singerInfo.singername }}</h3>
          <div class="simg">
            <img :src="singerInfo.singerphotourl" alt="" />
          </div>
          <h4>热门作品</h4>
          <table class="music">
            <tr v-for="(item, index) in musicInfo">
              <td style="width: 74px;">
                <span class="index">{{ index + 1 }}</span>
              </td>
              <td>
                <span class="name">{{ item.musicname }}</span>
              </td>
              <td>
                <span class="play">
                  <a href="javascript:void(0);" @click="onlyPlay(item)"
                    ><img
                      src="../../../../assets/播放(black).png"
                      alt=""
                      style="width: 15px;height: 15px;"
                  /></a>
                </span>
              </td>
            </tr>
          </table>
        </div>
        <div class="cright">
          <div class="singer-rank">
            <div class="title">
              <img
                src="../../../../assets/音乐排行榜.png"
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
    </div>
    <div class="wrap">
      <div class="btn">
        <a class="prev" ref="prev" href="javascript:void(0)" @click="prev()">
          <img src="../../../../assets/上一首.png" alt="" />
        </a>
        <a class="play" ref="play" href="javascript:void(0)" @click="play()">
          <img src="../../../../assets/播放.png" alt="" />
        </a>
        <a class="stop" ref="stop" href="javascript:void(0)" @click="play()">
          <img src="../../../../assets/暂停.png" alt=""
        /></a>
        <a class="next" ref="next" href="javascript:void(0)" @click="next()">
          <img src="../../../../assets/下一首.png" alt="" />
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
                src="../../../../assets/声音放大.png"
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
                src="../../../../assets/重放.png"
                alt=""
                style="width: 20px; height: 20px;"
            /></a>
          </div>
        </div>
      </div>
      <audio id="audio" ref="audio" src="" style="marginLeft:100px"></audio>
    </div>
  </div>
</template>

<script>
import { findSingerById } from "network/home.js";
import { findMusicBySingerid, findSingerOrderByHot } from "network/uhome.js";
import SRank from "components/common/rank/SRank";
export default {
  name: "Singer",
  data() {
    return {
      singerInfo: {},
      singerHotInfo: [],
      musicInfo: [], // 当前播放音乐的总时间
      singer: {},
      musicTime: "0:00",
      // 当前播放的音乐时间
      musicCurrentTime: "0:00",
      // 时间步长
      step: 1,
      // 定时器
      time: "",
      // 滑块的值默认100
      value: 100,
      // 是否显示声音条
      isShow: false,
      playWidth: 0,
      music: {},
      musicPhotoUrl: "",
      singerName: "",
      // 要播放的音乐url
      saveMusicUrl: "",
      // 暂停前播放的时间
      currentTime: 0,
      // 存放音乐url的数组
      musicUrls: []
    };
  },
  components: {
    SRank
  },
  mounted() {
    this.findSingerById(this.$route.query.sid);
    this.findMusicBySingerid(this.$route.query.sid);
    this.findSingerOrderByHot();
  },
  methods: {
    findSingerById(singerid) {
      findSingerById(singerid).then(res => {
        // console.log(res);
        res.singerphotourl =
          "http://localhost:8090/musicstatic/" + res.singerphotourl;
        this.singerInfo = res;
      });
    },
    findMusicBySingerid(singerid) {
      findMusicBySingerid(singerid).then(res => {
        // console.log(res);
        res.forEach(data => {
          data.musicphotourl =
            "http://localhost:8090/musicstatic/" + data.musicphotourl;
          data.songurl = "http://localhost:8090/musicstatic/" + data.songurl;
        });
        this.musicInfo = res;
      });
    },
    findSingerOrderByHot() {
      findSingerOrderByHot().then(res => {
        this.singerHotInfo = res;
      });
    },
    play() {
      if (
        this.$refs.audio.src !==
        "http://localhost:8080/singer?sid=" + this.singerInfo.singerid
      ) {
        let ctime;
        // 灰条
        var grey = document.getElementsByClassName("grey")[0];
        // 红条
        var red = document.getElementsByClassName("red")[0];
        // 灰条的宽度
        var greyWidth = grey.clientWidth;
        // 获取圆圈的class
        var circle = document.getElementsByClassName("circle")[0];

        // 底部栏的播放
        if (!this.isPlay) {
          this.$refs.audio.play();
          setTimeout(() => {
            ctime = this.$refs.audio.duration;
            this.musicTime = this.getDuration(ctime);
          }, 200);
          this.time = setInterval(() => {
            // console.log(this.musicCurrentTime);
            // 当前播放时间与完整时间相等就结束
            if (parseInt(ctime) === this.step) {
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
      var circle = document.getElementsByClassName("circle")[0];
      red.style.width = width + "px";
      // 设置圆圈的左偏移量
      circle.style.left = width - 15 + "px";
      // clearInterval(this.time);
      this.musicCurrentTime = "0:00";
      this.step = 1;
      // 图片上的播放与底部播放栏的播放分开
      // 如果当前的播放时间为0 则给url赋值
      this.$refs.audio.src = data.songurl;
      this.$refs.audio.play();
      setTimeout(() => {
        ctime = this.$refs.audio.duration;
        this.musicTime = this.getDuration(ctime);
      }, 200);
      this.time = setInterval(() => {
        // 当前播放时间与完整时间相等就结束
        if (parseInt(ctime) === this.step) {
          clearInterval(this.time);
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
      var circle = document.getElementsByClassName("circle")[0];
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
      var circle = document.getElementsByClassName("circle")[0];
      red.style.width = width + "px";
      // 设置圆圈的左偏移量
      circle.style.left = width - 15 + "px";
      // 将获取的随机音乐的url全部存入一个数组里
      // 并且判断是否和目标url相等，相等则保存index
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
      this.$refs.audio.src = this.musicUrls[index - 1];
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
      var circle = document.getElementsByClassName("circle")[0];
      red.style.width = width + "px";
      // 设置圆圈的左偏移量
      circle.style.left = width - 15 + "px";
      // 将获取的随机音乐的url全部存入一个数组里
      // 并且判断是否和目标url相等，相等则保存index

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
      this.$refs.audio.src = this.musicUrls[index + 1];
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
    }
  }
};
</script>

<style>
#singer .subnav {
  background-color: #c20c0c;
  border-bottom: 5px solid #a40011;
}

#singer .content {
  display: flex;
}

#singer .border {
  flex: 1;
  background-color: #eeeeee;
  height: 1000px;
  border-bottom: 1px solid #999;
}

#singer .center {
  display: flex;
  height: 1000px;
  width: 928px;
}

#singer .center .cleft {
  display: flex;
  flex-direction: column;
  width: 656px;
  height: 913px;
  margin: 0 auto;
  border-bottom: 1px solid #999;
  padding: 47px 30px 40px 39px;
  border-right: 1px solid #999;
}

#singer .center .cleft h3,
h4 {
  font-weight: normal;
}

#singer .center .cleft .simg img {
  width: 100%;
  height: 350.945px;
}

#singer .center .cleft table {
  border-collapse: collapse;
  border-spacing: 0;
}

#singer .center .cleft table td {
  height: 18px;
  padding: 6px 10px;
}

#singer .center .cleft table .index {
  display: inline-block;
  font-size: 12px;
  margin-left: 5px;
  height: 18px;
  line-height: 18px;
  color: #999;
}

#singer .center .cleft table .name {
  display: inline-block;
  font-size: 12px;
  margin-left: 5px;
  height: 18px;
  line-height: 18px;
}

#singer .center .cleft table .play {
  display: inline-block;
  height: 18px;
  vertical-align: middle;
}

#singer .center .cleft table tr:nth-child(2n + 1) {
  background-color: #f7f7f7;
}

#singer .center .cleft table tr:nth-child(2n) {
  background-color: #fff;
}

#singer .center .cright {
  display: flex;
  flex-direction: column;
  width: 203px;
  height: 960px;
  border-bottom: 1px solid #999;
  padding: 20px 20px 20px 20px;
}

#singer .singer-rank .title {
  display: flex;
  height: 33px;
  align-items: center;
  margin-top: 42px;
  border-bottom: 1px solid #ccc;
}

#singer .wrap {
  display: flex;
  position: fixed;
  width: 980px;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 0;
  z-index: 3;
}

#singer audio {
  height: 43px;
}

#singer .wrap .btn .prev,
#singer .wrap .btn .next {
  display: inline-block;
  width: 24px;
  height: 24px;
}

#singer .wrap .btn .stop {
  display: none;
  margin-left: 10px;
  margin-right: 10px;
}

#singer .wrap .btn .play {
  margin-left: 10px;
  margin-right: 10px;
}

#singer .wrap .btn .play img {
  display: inline-block;
  width: 34px;
  height: 34px;
}

#singer .wrap .btn .stop img {
  display: inline-block;
  width: 34px;
  height: 34px;
}

#singer .wrap .btn a img {
  width: 24px;
  height: 24px;
}

#singer .wrap .sing-img {
  width: 35px;
  height: 35px;
  margin: 0px 15px 0px 0px;
}

#singer .wrap .plays {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 466px;
}

#singer .btn {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 10px;
  margin-right: 10px;
}

#singer .wrap .plays .info {
  position: relative;
  top: -5px;
  height: 17px;
  padding-bottom: 5px;
}

#singer .wrap .plays span:nth-child(1) {
  color: #fff;
  font-size: 12px;
  margin-right: 20px;
}

#singer .wrap .plays span:nth-child(2) {
  color: #888;
  font-size: 12px;
  margin-right: 20px;
}

#singer .wrap .plays .play-bar {
  display: flex;
  align-items: center;
}

#singer .wrap .plays .play-bar .grey {
  position: relative;
  width: 100%;
  height: 9px;
  border-radius: 30px;
  background-color: #777;
  margin-right: 10px;
}

#singer .wrap .plays .play-bar .red {
  position: absolute;
  width: 0px;
  top: 0px;
  height: 9px;
  border-radius: 30px;
  background-color: #f00;
}

#singer .wrap .plays .play-bar .time {
  position: absolute;
  right: -60px;
  top: 17px;
  height: 14px;
  font-size: 12px;
  color: #777;
}

#singer .wrap .plays .play-bar .sound {
  position: absolute;
  top: 14px;
  right: -100px;
  width: 24px;
  height: 24px;
  text-align: center;
}

#singer .wrap .plays .play-bar .sound .sound-bar {
  display: none;
  position: relative;
  top: -170px;
  text-align: center;
  background-color: #333;
  padding: 15px 0 10px 0;
}

#singer .wrap .plays .play-bar .reload {
  position: absolute;
  top: 15px;
  right: -130px;
  width: 24px;
  height: 24px;
}

#singer .wrap .plays .play-bar .circle {
  position: absolute;
  top: -13px;
  left: -15px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 5px solid #fff;
  background-color: #f00;
  margin: 10px 10px;
}

#singer .el-slider__button {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #f00;
  border: 3px solid #fff;
}

#singer .el-slider__bar {
  background-color: #f00;
}

#singer .el-slider.is-vertical {
  position: relative;
  left: -7px;
}
</style>
