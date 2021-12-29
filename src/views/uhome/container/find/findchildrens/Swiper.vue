<template>
  <div class="swiper">
    <el-carousel :interval="3000" arrow="always" trigger="click">
      <el-carousel-item v-for="(item, index) in images" :key="index" :style="getStyle(index)">
        <a :href="item.url">
          <img :src="item.imageUrl" alt />
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { banner } from "network/music.js";
export default {
  name: "Swiper",
  data() {
    return { 
      images: [
        {
          url:"https://www.baidu.com/",
          imageUrl:require('@/assets/testbg.png')
        },
          {
          url:"https://www.baidu.com/",
          imageUrl:require('@/assets/testebg_01.png')
        }
      ] };
  },
  mounted() {
   // this.banner();
  },
  methods: {
    banner() {
      banner().then(res => {
        // console.log(res);
        this.images = res.banners;
      });
    },
    getStyle(index) {
      // 给轮播图设置背景图 动态绑定样式 设置背景大小和背景位置从而显示一部分背景
      // 达到背景的颜色与图片的颜色一致
      // backgroundImage: url('http://p1.music.126.net/3E16Ow9vmR-W8JTAcBYfoQ==/109951166627510380.jpg?imageView&blur=40x20');
      // backgroundSize: 6000px;
      // backgroundPosition:center center
      return {
        textAlign: "center",
        backgroundImage:
          "url(" + this.images[index].imageUrl + "?imageView&blur=40x20)",
        backgroundSize: 6000 + "px",
        backgroundPosition: "center"
      };
    }
  },
  computed: {}
};
</script>

<style scoped>
.el-carousel {
  background-color: #aeaeae;
}

.el-carousel__item.is-animating {
  transition: all 0.7s ease-in-out;
}

.swiper img {
  width: 930px;
  height: 300px;
}
</style>
