<template>
  <div id="singers">
    <div class="subnav"></div>
    <div class="content">
      <div class="left border"></div>
      <div class="center">
        <div class="cleft">
          <div class="blk">
            <h2>华语</h2>
            <ul class="type">
              <li>
                <a href="javascript:void(0);" @click="typeClick('华语男歌手')"
                  ><span>华语男歌手</span></a
                >
              </li>
              <li>
                <a href="javascript:void(0);" @click="typeClick('华语女歌手')"
                  ><span>华语女歌手</span></a
                >
              </li>
              <li>
                <a href="javascript:void(0);" @click="typeClick('华语组合')"
                  ><span>华语组合</span></a
                >
              </li>
            </ul>
          </div>
          <div class="blk">
            <h2>欧美</h2>
            <ul class="type">
              <li>
                <a href="javascript:void(0);" @click="typeClick('欧美男歌手')"
                  ><span>欧美男歌手</span></a
                >
              </li>
              <li>
                <a href="javascript:void(0);" @click="typeClick('欧美女歌手')"
                  ><span>欧美女歌手</span></a
                >
              </li>
              <li>
                <a href="javascript:void(0);" @click="typeClick('欧美组合')"
                  ><span>欧美组合</span></a
                >
              </li>
            </ul>
          </div>
          <div class="blk">
            <h2>韩国</h2>
            <ul class="type">
              <li>
                <a href="javascript:void(0);" @click="typeClick('韩国男歌手')"
                  ><span>韩国男歌手</span></a
                >
              </li>
              <li>
                <a href="javascript:void(0);" @click="typeClick('韩国女歌手')"
                  ><span>韩国女歌手</span></a
                >
              </li>
              <li>
                <a href="javascript:void(0);" @click="typeClick('韩国组合')"
                  ><span>韩国组合</span></a
                >
              </li>
            </ul>
          </div>
          <div class="blk">
            <h2>日本</h2>
            <ul class="type">
              <li>
                <a href="javascript:void(0);" @click="typeClick('日本男歌手')"
                  ><span>日本男歌手</span></a
                >
              </li>
              <li>
                <a href="javascript:void(0);" @click="typeClick('日本女歌手')"
                  ><span>日本女歌手</span></a
                >
              </li>
              <li>
                <a href="javascript:void(0);" @click="typeClick('日本组合')"
                  ><span>日本组合</span></a
                >
              </li>
            </ul>
          </div>
          <div class="blk">
            <h2>其他</h2>
            <ul class="type">
              <li>
                <a href="javascript:void(0);" @click="typeClick('其他男歌手')"
                  ><span>其他男歌手</span></a
                >
              </li>
              <li>
                <a href="javascript:void(0);" @click="typeClick('其他女歌手')"
                  ><span>其他女歌手</span></a
                >
              </li>
              <li>
                <a href="javascript:void(0);" @click="typeClick('其他组合')"
                  ><span>其他组合</span></a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="cright">
          <r-singers :title="title" :singer-info="singerInfo"></r-singers>
        </div>
      </div>
      <div class="right border"></div>
    </div>
  </div>
</template>

<script>
import RSingers from "./childrens/RSingers.vue";
import { findSingerByTypename } from "network/uhome.js";
export default {
  name: "Singers",
  data() {
    return { singerInfo: [], title: "华语男歌手" };
  },
  components: {
    RSingers
  },
  mounted() {
    this.findSingerByTypename("华语男歌手");
  },
  methods: {
    typeClick(data) {
      this.title = data;
      this.findSingerByTypename(data);
    },
    findSingerByTypename(typename) {
      findSingerByTypename(typename).then(res => {
        // console.log(res);
        res.forEach(data => {
          data.singerphotourl =
            "http://localhost:8090/musicstatic/" + data.singerphotourl;
        });
        this.singerInfo = res;
      });
    }
  }
};
</script>

<style scoped>
#singers .subnav {
  background-color: #c20c0c;
  border-bottom: 5px solid #a40011;
}

#singers .content {
  display: flex;
}

#singers .center {
  display: flex;
  width: 1028px;
  margin: 0 auto;
}

#singers .center .cleft {
  display: flex;
  flex-direction: column;
  width: 180px;
  padding: 20px 20px 30px 20px;
  border-bottom: 1px solid #999;
  border-right: 1px solid #999;
  background-color: #eeeeee;
}

#singers .center .cleft .blk {
  margin: 5px 0 0;
  padding-top: 16px;
  border-bottom: 1px solid #d3d3d3;
}

#singers .center .cleft .blk h2 {
  padding: 0;
  margin: 0;
  font-size: 16px;
}

#singers .center .cleft .blk ul {
  padding: 0;
  margin: 15px 0 15px 0;
}

#singers .center .cleft .blk ul li {
  display: inline-block;
  width: 133px;
  list-style: none;
  margin-bottom: 10px;
  vertical-align: middle;
}

#singers .center .cleft .blk ul a:hover {
  text-decoration: underline;
}

#singers .center .cleft .blk ul li a {
  display: inline-block;
  width: 133px;
  text-decoration: none;
  color: #333;
  padding-top: 2px;
  padding-left: 27px;
  background-image: url("https://s2.music.126.net/style/web2/img/singer.png?bf0a453043a55ee7e5d5da3db7febb8c");
  background-position: 0 -30px;
}

#singers .center .cleft .blk ul li a span {
  font-size: 14px;
}

#singers .center .cright {
  display: flex;
  flex-direction: column;
  width: 848px;
  padding: 40px;
  border-bottom: 1px solid #999;
}

#singers .border {
  flex: 1;
  background-color: #eeeeee;
  height: 1000px;
  border-bottom: 1px solid #999;
}

#singers .left {
  border-right: 1px solid #999;
}

#singers .right {
  border-left: 1px solid #999;
}
</style>
